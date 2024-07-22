import { forwardRef, TableHTMLAttributes } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";
import styles from "./Table.module.scss";

export interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: ColumnDef<T, any>[];
  data: T[];
  pagination?: boolean;
  className?: string;
}

const Table = forwardRef<HTMLTableElement, TableProps<any>>(
  ({ columns, data, pagination = true, className, ...props }, ref) => {
    const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: false,
    });

    return (
      <div className={clsx(styles.table__container, className)}>
        <table ref={ref} className={styles.table__wrapper} {...props}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.table__header}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={clsx(styles.table__cell, {
                      [styles.checkboxCell]: header.column.id === "actions",
                    })}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? styles.sortableHeader : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.table__row}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={clsx(styles.table__cell, {
                      [styles.checkboxCell]: cell.column.id === "actions",
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {pagination && (
          <div className={styles.table__pagination}>
            <button
              className={styles.paginationButton}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              className={styles.paginationButton}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  },
);

Table.displayName = "Table";

export { Table };
