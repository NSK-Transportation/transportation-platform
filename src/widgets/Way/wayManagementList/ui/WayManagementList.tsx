import { FC } from "react";
import { SelectWayCheckbox, WayManagementItem } from "@/features/way";
import { useWayDetailStore, WayDetailStatus } from "@/entities/wayDetails";
import { Box, Chip } from "@/shared/ui";

export const WayManagementList: FC = () => {
  const { wayDetails } = useWayDetailStore();
  const handleItemClick = (item: WayDetailStatus) => {
    console.log(item);
  };

  const combinedWayDetails = [...(wayDetails.there || []), ...(wayDetails.return || [])];

  return (
    <Box text={!wayDetails ? "" : "Нет маршрутов"}>
      {combinedWayDetails.map((way) => (
        <WayManagementItem
          key={way.id}
          data={way}
          isSelected={false}
          onClick={() => handleItemClick(way)}
          checkbox={<SelectWayCheckbox isSelected={false} />}
          chip={<Chip label={way.status} variant="info" />}
        />
      ))}
    </Box>
  );
};
