import { useWayStore } from "@/entities/way";
import { useWayDetailStore, WayDetail, WayDetailsItem } from "@/entities/wayDetails";
import { Direction } from "@/shared/types";
import { Box, Stacks, Typography } from "@/shared/ui";

interface WayMainListProps {
  direction: Direction;
}

export const WayDetailList = ({ direction }: WayMainListProps) => {
  const { wayDetails, activeWay, setActiveWay } = useWayDetailStore();
  const { remoteSale } = useWayStore();

  const handleItemClick = (item: WayDetail) => {
    setActiveWay(item, direction);
  };

  if (!wayDetails[direction] || wayDetails[direction].length === 0) {
    return null;
  }

  return (
    <Box overflow="hidden" padding={8}>
      <Stacks gap={8}>
        <Typography variant="h4" color="secondary">
          {remoteSale ? "Удалённая продажа" : "Прямая продажа"}
        </Typography>
        <Typography variant="h4" color="secondary">
          {wayDetails[direction].length} результатов
        </Typography>
      </Stacks>
      <Box overflow="auto" padding={8} variant="withoutShadow">
        <Stacks direction="column" gap={4}>
          <Stacks fullwidth direction="column" gap={12}>
            {wayDetails[direction].map((wayDetail: WayDetail, index) => (
              <WayDetailsItem
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
