import { Box, Stacks, Typography } from "@/shared/ui";
import { WayMainItem } from "../wayMainItem/WayMainItem";
import { useMainStore } from "../../../MainPanel.store";
import { WayDetails } from "@/app/@types";

interface WayMainListProps {
  data: WayDetails[];
  direction: "to" | "return";
}

export const WayMainList = ({ data, direction }: WayMainListProps) => {
  const { way, activeWay, setActiveWay } = useMainStore((state) => state.saleTicket);

  const handleItemClick = (item: WayDetails) => {
    setActiveWay(item, direction);
  };

  return (
    <Box style={{ overflow: "auto" }}>
      <Stacks direction="column" gap={4}>
        <Typography variant="h4" color="secondary">
          {way.remoteSale ? "Удалённая продажа" : "Прямая продажа"}
        </Typography>

        <Stacks fullwidth direction="column" gap={12}>
          {data.map((item: WayDetails, index) => (
            <WayMainItem
              key={index}
              item={item}
              isSelected={activeWay ? activeWay?.[direction]?.id === item.id : false}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </Stacks>
      </Stacks>
    </Box>
  );
};
