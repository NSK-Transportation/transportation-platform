import React from "react";
import { Chip, Label, Table, Typography } from "@/shared/ui";
import { WayDetails } from "@/app/@types";
import { ColumnDef } from "@tanstack/react-table";

interface WayInformationProps {
  item: WayDetails;
}
export const WayInformationTable: React.FC<WayInformationProps> = (item) => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "Место",
      cell: ({ row }) => (
        <Typography variant="h3" weight={700} color="table-info">
          {`Место ${row.original.id}`}
        </Typography>
      ),
    },
    // {
    //   accessorKey: "status",
    //   header: "серия",
    //   cell: ({ row }) => <Chip variant="success" label={row.original.status}></Chip>,

    // },
    {
      accessorKey: "documentSeria",
      header: "Серия",
      cell: ({ row }) => <Chip variant="success" label={row.original.documentSeria}></Chip>,
    },
    {
      accessorKey: "documentNumber",
      header: "Номер",
      cell: ({ row }) => <Chip variant="success" label={row.original.documentNumber}></Chip>,
    },
    {
      accessorKey: "price",
      header: "Цена",
      cell: ({ row }) => (
        <Typography variant="h3" weight={600} color="default-black">
          {row.original.price}
        </Typography>
      ),
    },
    {
      accessorKey: "tariff",
      header: "Тариф",
      cell: ({ row }) => (
        <Typography variant="h3" weight={600} color="default-black">
          {row.original.tariff}
        </Typography>
      ),
    },
    {
      accessorKey: "duty",
      header: "Надбавка",
      cell: ({ row }) => (
        <Typography variant="h3" weight={600} color="default-black">
          {row.original.duty}
        </Typography>
      ),
    },
    {
      accessorKey: "dateSale",
      header: "Дата продажи",
      cell: ({ row }) => (
        <Typography variant="h3" weight={400} color="default-black">
          {row.original.dateSale}
        </Typography>
      ),
    },
    {
      accessorKey: "whoSold",
      header: "Кто продал",
      cell: ({ row }) => (
        <Typography variant="h3" weight={400} color="default-black">
          {row.original.whoSold}
        </Typography>
      ),
    },
  ];

  const data = item.item.seats || [];

  return (
    <div>
      <h2>Информация о местах</h2>
      <Table columns={columns} data={data}  pageSize ={100} />
    </div>
  );
};
