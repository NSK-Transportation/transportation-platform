import { Box, Stacks } from "@/shared/ui";
import { WayDetails } from "@/app/@types";
import { useWayManagement } from "../WayManagement.store";
import { FC } from "react"; 
import { WayManagementItem } from "../wayManagementItem/WayManagementItem";

export const WayManagementList: FC = () => {
  const { wayDetails } = useWayManagement(); // Получаем массив WayDetails из store
  return (
    <Box
      style={{
        overflow: "auto",
      }}
    >
      <Stacks fullwidth direction="column" gap={12}>
      {wayDetails.map((item: WayDetails, index: number) => (
                <WayManagementItem
                    key={index}
                    item={item}
                    isSelected={false}  // Например, для выбора элемента
                    onClick={() => console.log("Clicked", item)} // Обработчик клика
                />
            ))}
      </Stacks>
    </Box>
  );
};
