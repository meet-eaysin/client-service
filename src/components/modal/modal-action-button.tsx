import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  isPending: boolean;
  closeModal: () => void;
  buttonText: string;
  modalType: "create" | "edit" | "view";
}

const ActionButtons = ({
  isPending,
  closeModal,
  buttonText,
  modalType,
}: ActionButtonsProps) => {
  const getButtonContent = () => {
    if (modalType === "view") return "Close";

    return isPending ? "Saving..." : buttonText;
  };

  return (
    <div className="pt-4 w-full flex justify-end gap-5">
      {modalType !== "view" && (
        <Button onClick={closeModal} variant="outline">
          Cancel
        </Button>
      )}

      <Button disabled={isPending} type="submit">
        {getButtonContent()}
      </Button>
    </div>
  );
};

export default ActionButtons;
