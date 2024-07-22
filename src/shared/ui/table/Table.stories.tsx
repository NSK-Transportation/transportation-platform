import { Meta, StoryFn } from "@storybook/react";
import { useEffect, useState } from "react";
import { Table, TableProps } from "./Table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../checkbox/Checkbox";

interface Data {
  id: number;
  name: string;
  phone: number;
  address: {
    suite: string;
  };
}

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  argTypes: {
    data: { control: "object" },
    columns: { control: "object" },
    pagination: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    data: [],
    columns: [],
    pagination: true,
    className: "",
  },
};

export default meta;

export const Default: StoryFn<TableProps<Data>> = (args) => {
  const columns: ColumnDef<Data>[] = [
    {
      id: "actions",
      header: ({ table }) => (
        <Checkbox
          label=""
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          label=""
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: "id",
      header: "Место",
    },
    {
      accessorKey: "status",
      header: "Статус",
      cell: () => <div>-</div>,
    },
    {
      accessorKey: "seria",
      header: "Серия",
      cell: () => <div>-</div>,
    },
    {
      accessorKey: "number",
      header: "Номер",
      cell: () => <div>-</div>,
    },
    {
      accessorKey: "stationIn",
      header: "Станция назначения",
      cell: () => <div>-</div>,
    },
    {
      accessorKey: "stationOut",
      header: "Станция отправления",
      cell: () => <div>-</div>,
    },
    {
      accessorKey: "type",
      header: "Тип билета",
      cell: () => <div>-</div>,
    },
    {
      accessorKey: "name",
      header: "Пассажир",
    },
  ];

  const [users, setUsers] = useState<Data[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return <Table {...args} columns={columns} data={users} />;
};
