import React from 'react';
import { Table } from '@/shared/ui';
import { WayDetails } from "@/app/@types";
import { ColumnDef } from '@tanstack/react-table';

interface WayInformationProps {
    item: WayDetails;
  }
export const WayInformationTable: React.FC<WayInformationProps> = (item) => {

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'Место',
      cell: ({ row }) => <div>{`Место ${row.original.id}`}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Статус',
      cell: ({ row }) => <div>{row.original.status}</div>,
    },
  ];

  const data = item.item.seats || [];

  return (
    <div>
      <h2>Информация о местах</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};
