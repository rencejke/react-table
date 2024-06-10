import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { defaultData } from './data';
import { DebouncedInputSearch, Filter } from './functions';


const Pagination = () => {

//... = spread operator (all)
//
  const [data, setData] = React.useState(() => [...defaultData]);
  const columnHelper = createColumnHelper();

//   for chain(multiple) filtering 
  const [columnFilters, setColumnFilters] = React.useState([]);
  
  //for searching keywords 
  const [globalFilter, setGlobalFilter] = React.useState("");

//initial settings for pagination
  const [pagination, setPagination] = React.useState({
    //how many pages
    pageIndex: 0,
    
    //how many row per page
    pageSize: 10
  })

  const columns = [
    columnHelper.accessor("firstName", {
      header: "Firstname",
      footer: (props) => props.column.columnDef.header,
    }),
    columnHelper.accessor('lastName', {
      header:  "Lastname",
      footer: (props) => props.column.columnDef.header,
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => info.renderValue(),
      footer: (props) => props.column.columnDef.header,
    }),
    columnHelper.accessor("visits", {
      header: "Visit",
      footer: (props) => props.column.columnDef.header,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      footer: (props) => props.column.columnDef.header,
    }),
    columnHelper.accessor("progress", {
      header: "Profile Progress",
      footer: (props) => props.column.columnDef.header,
    }),
  ]

//searching---filtering table
  const table = useReactTable({
    data,
    columns,
    state: {
        globalFilter,
        columnFilters,
        pagination,
      },
      onPaginationChange: setPagination,
      getPaginationRowModel: getPaginationRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
  });

  return (
  <>
  <div className="search">
         
         {/* delay the search */}
        <DebouncedInputSearch
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="text-sm shadow-sm border border-block"
          placeholder="Type your keyword"
        />
      </div>
    <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() &&
                    header.column.id !== "action" && (
                      <Filter column={header.column} table={table} />
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {table.getRowCount().toLocaleString()} Rows
      </div>
  </>
  )
}

export default Pagination
