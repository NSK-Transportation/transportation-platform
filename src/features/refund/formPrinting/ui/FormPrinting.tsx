import { FC } from "react";
import { RefundForm, type Form } from "@/entities/refund";
import { usePrint } from "@/shared/hooks";
import { Status } from "@/shared/types";
import { Divider, Stacks, Typography } from "@/shared/ui";
import { getStatusIcon } from "../lib/utils/getStatusIcon";

interface Props {
  status: Status;
  form: Form | undefined;
}

export const FormPrinting: FC<Props> = ({ status, form }) => {
  const statusIcon = getStatusIcon(status);
  const print = usePrint();

  const handlePrint = () => {
    if (!form) return;
    print(<RefundForm form={form!} />, "", "Бланк на возврат билета");
  };

  return (
    <Stacks gap={16}>
      <Divider color="blue" orientation="vertical" />
      <Stacks alignItems="center" gap={4} onClick={handlePrint}>
        <Typography cursor="pointer" variant="h3" color={!form ? "secondary" : "primary"}>
          Печать бланка на возврат билета
        </Typography>
        <Typography cursor="pointer" variant="h3" color={!form ? "secondary" : "primary"}>
          {statusIcon}
        </Typography>
      </Stacks>
    </Stacks>
  );
};
