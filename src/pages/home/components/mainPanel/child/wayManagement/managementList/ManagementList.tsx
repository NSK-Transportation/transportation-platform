import { FC } from "react";
import { WayDetails } from "@/app/@types";
import { useWayManagement } from "../WayManagement.store";
import { WayManagementItem } from "../wayManagementItem/WayManagementItem";

export const WayManagementList: FC = () => {
  const { wayDetails, selectedWays, toggleSelectWay } = useWayManagement();

  const handleItemClick = (item: WayDetails) => {
    toggleSelectWay(item);
  };

  return (
    <>
      {wayDetails.map((item) => (
        <WayManagementItem
          key={item.id}
          item={item}
          isSelected={selectedWays.some((selectedItem) => selectedItem.id === item.id)}
          onClick={() => handleItemClick(item)}
        />
      ))}
    </>
  );
};
