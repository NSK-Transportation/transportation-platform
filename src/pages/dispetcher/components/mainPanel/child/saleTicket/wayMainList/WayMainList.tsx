import { Box, Stacks, Typography } from "@/shared/ui";
import { WayMainItem } from "../wayMainItem/WayMainItem";
import { Direction, WayDetail } from "@/app/@types";
import { useSaleTicket } from "../SaleTicket.store";

interface WayMainListProps {
  direction: Direction;
}

export const WayMainList = ({ direction }: WayMainListProps) => {
  const { way, activeWay, wayDetail, setActiveWay } = useSaleTicket();

  const handleItemClick = (item: WayDetail) => {
    setActiveWay(item, direction);
  };

  if (!wayDetail[direction] || wayDetail[direction].length === 0) {
    return null;
  }

  return (
    <Box overflow="hidden" padding={8}>
      <Stacks gap={8}>
        <Typography variant="h4" color="secondary">
          {way.remoteSale ? "Удалённая продажа" : "Прямая продажа"}
        </Typography>
        <Typography variant="h4" color="secondary">
          {wayDetail[direction].length} результатов
        </Typography>
      </Stacks>
      <Box overflow="auto" padding={8} variant="withoutShadow">
        <Stacks direction="column" gap={4}>
          <Stacks fullwidth direction="column" gap={12}>
            {wayDetail[direction].map((wayDetail: WayDetail, index) => (
              <WayMainItem
                key={index}
                wayDetail={wayDetail}
                isSelected={activeWay ? activeWay?.[direction]?.id === wayDetail.id : false}
                onClick={() => handleItemClick(wayDetail)}
              />
            ))}
          </Stacks>
        </Stacks>
      </Box>
    </Box>
  );
};
