import { FC } from "react";
import { Form } from "../../model/types/refund.types";

interface Props {
  form: Form;
}

export const RefundForm: FC<Props> = ({ form }) => {
  return (
    <div style={{ display: "flex", placeContent: "center" }}>
      <div>{form.name}</div>
    </div>
  );
};
