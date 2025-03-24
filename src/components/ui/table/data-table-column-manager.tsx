import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";

interface ColumnManagerProps<TData> {
  table: Table<TData>;
}

export const ColumnManager = <TData,>({ table }: ColumnManagerProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex items-center justify-end pt-1.5 pr-1.5 cursor-pointer absolute top-0.5 right-0.5"
      >
        <Columns3 size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
