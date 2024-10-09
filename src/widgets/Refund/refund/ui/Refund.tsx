import { FormPrinting } from "@/features/refund";
import { RefundInformation } from "@/entities/refund";
import { Button, Stacks } from "@/shared/ui";

export const Refund = () => {
  const handleClick = () => {
    console.log("refund");
  };

  return (
    <>
      <RefundInformation action={<FormPrinting />} />
      <Stacks justifyContent="flex-end">
        <Button label="Возврат" onClick={handleClick} disabled />
      </Stacks>
    </>
  );
};
