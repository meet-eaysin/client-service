import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../button";

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

const SortableHeader = <TData, TValue>({
  column,
  title,
}: SortableHeaderProps<TData, TValue>) => {
  return (
    <Button
      className="p-0 hover:bg-transparent capitalize"
      variant={"ghost"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default SortableHeader;
