import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultData } from './data';


const Home = () => {

//... = spread operator (all)
//
  const [data, setData] = React.useState(() => [...defaultData]);
  const columnHelper = createColumnHelper();
  

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
  <>
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

export default Home
