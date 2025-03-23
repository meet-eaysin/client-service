import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Heading } from "./heading";

interface PageHeaderProps {
  title: string;
  description: string;
  onAction: () => void;
  actionLabel: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  onAction,
  actionLabel,
  Icon = Plus,
}) => {
  return (
    <div className="flex items-start justify-between">
      <Heading title={title} description={description} />
      <Button onClick={onAction}>
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {actionLabel}
      </Button>
    </div>
  );
};

export default PageHeader;
