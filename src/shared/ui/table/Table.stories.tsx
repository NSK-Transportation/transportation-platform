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

  return (
    <Table
      style={{ minWidth: "760px" }}
      {...args}
      columns={columns}
      data={users}
    />
  );
};
