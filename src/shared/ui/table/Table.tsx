import { forwardRef, ReactNode, TableHTMLAttributes, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import styles from "./Table.module.scss";
import { Button } from "../button/Button";

export interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: ColumnDef<T, any>[];
  data: T[];
  paginationActions?: boolean;
  pageIndex?: number;
  pageSize?: number;
  loading?: boolean | ReactNode;
  onRowClick?: (row: T) => void;
  onCellClick?: (cell: T) => void;
  className?: string;
  emptyMessage?: string;
  tableName?: string;
}

const Table = forwardRef<HTMLTableElement, TableProps<any>>(
  (
    {
      columns,
      data,
      paginationActions = true,
      pageIndex = 0,
      pageSize = 100,
      loading = false,
      onRowClick,
      onCellClick,
      className,
      emptyMessage = "Нет данных",
      tableName,
      ...props
    },
    ref,
  ) => {
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: pageIndex,
      pageSize: pageSize,
    });

    const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onPaginationChange: setPagination,
      state: {
        pagination,
      },
      autoResetPageIndex: false,
      debugTable: false,
    });

    const renderPagination = () => (
      <div className={styles.table__pagination}>
        <Button
          size="icon"
          sizeIcon={32}
          label="<"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        />
        <div className={styles.table__pageInfo}>
          <span>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
        </div>
        <Button
          size="icon"
          sizeIcon={32}
          label=">"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        />
      </div>
    );

    return (
      <div className={clsx(styles.table__container, className)}>
        {loading ? (
          <div className={styles.table__loading}>{loading}</div>
        ) : (
          <>
            <table ref={ref} className={styles.table__wrapper} {...props}>
              <thead>
                <span className={styles.table__name}>{tableName}</span>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className={styles.table__header}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={clsx(styles.table__cell, {
                          [styles.checkboxCell]: header.column.id === "actions",
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={styles.table__row}
                      onClick={() => onRowClick && onRowClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={clsx(styles.table__cell, {
                            [styles.checkboxCell]: cell.column.id === "actions",
                          })}
                          onClick={() => onCellClick && onCellClick(cell.getValue())}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className={styles.table__empty}>
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {paginationActions && renderPagination()}
          </>
        )}
      </div>
    );
  },
);

Table.displayName = "Table";

export { Table };
