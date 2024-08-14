import { Box, Stacks } from "@/shared/ui";
import { WayMainItem } from "../wayMainItem/WayMainItem";
import { useMainStore } from "../../../MainPanel.store";
import { WayDetails } from "@/app/@types";

interface WayMainListProps {
  data: WayDetails[];
}

export const WayMainList = ({ data }: WayMainListProps) => {
  const { activeWay, setActiveWay } = useMainStore((state) => state.saleTicket);

  console.log(data);
  const handleItemClick = (item: WayDetails) => {
    setActiveWay(item);
  };

  return (
    <Box
      style={{
        overflow: "auto",
      }}
    >
      <Stacks fullwidth direction="column" gap={12}>
        {data.map((item: WayDetails, index) => (
            <WayMainItem
              key={index}
              item={item}
              isSelected={activeWay ? activeWay.id === item.id : false}
              onClick={() => handleItemClick(item)}
            />
        ))}
      </Stacks>
    </Box>
  );
};
