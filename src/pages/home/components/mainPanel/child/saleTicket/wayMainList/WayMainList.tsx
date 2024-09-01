import { Box, Stacks, Typography } from "@/shared/ui";
import { WayMainItem } from "../wayMainItem/WayMainItem";
import { useMainStore } from "../../../MainPanel.store";
import { Direction, WayDetails } from "@/app/@types";

interface WayMainListProps {
  direction: Direction;
}

export const WayMainList = ({ direction }: WayMainListProps) => {
  const { way, activeWay, wayDetails, setActiveWay } = useMainStore((state) => state.saleTicket);

  const handleItemClick = (item: WayDetails) => {
    setActiveWay(item, direction);
  };

  if (!wayDetails[direction] || wayDetails[direction].length === 0) {
    return null;
  }

  return (
    <Box style={{ overflow: "auto" }}>
      <Stacks direction="column" gap={4}>
        <Typography variant="h4" color="secondary">
          {way.remoteSale ? "Удалённая продажа" : "Прямая продажа"}
        </Typography>
        <Stacks fullwidth direction="column" gap={12}>
          {wayDetails[direction].map((item: WayDetails, index) => (
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
