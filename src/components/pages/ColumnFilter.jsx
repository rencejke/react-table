import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { defaultData } from './data';
import { DebouncedInputSearch, Filter } from './functions';


const ColumnFilter = () => {

//... = spread operator (all)
//
  const [data, setData] = React.useState(() => [...defaultData]);
  const columnHelper = createColumnHelper();

//   for chain(multiple) filtering 
  const [columnFilters, setColumnFilters] = React.useState([]);
  
  //for searching keywords 
  const [globalFilter, setGlobalFilter] = React.useState("");

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
      },
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
  </>
  )
}

export default ColumnFilter