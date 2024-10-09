import { FC } from "react";
import { Checkbox } from "@/shared/ui";

interface Props {
  isSelected: boolean;
}

export const SelectWayCheckbox: FC<Props> = ({ isSelected }) => {
  // const { checkWay, wayDetails, setWayDetails } = useWayDetailStore();

  const handleClick = () => {};

  return <Checkbox checked={isSelected} onChange={handleClick} />;
};
