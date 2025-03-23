import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title?: string;
  opened: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  description?: string;
}

const DefaultModal = ({
  children,
  title,
  opened,
  onClose,
  size = "md",
  description,
}: ModalProps) => {
  const sizeClass = {
    sm: "max-w-[320px]",
    md: "max-w-[480px]",
    lg: "max-w-[640px]",
    xl: "max-w-[800px]",
    xxl: "max-w-[960px]",
  }[size];

  return (
    <Dialog open={opened} onOpenChange={(isOpen) => !isOpen && onClose()} modal>
      <DialogContent className={`${sizeClass}`}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DefaultModal;
