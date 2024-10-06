import { FC } from "react";
import { useWayDetailStore, WayDetail, WayDetailStatus } from "@/entities/wayDetails";
import { Box, Button, Stacks } from "@/shared/ui";

export const SelectWayStatus: FC = () => {
  const {
    selectedWayDetails,
    options: { statuses },
  } = useWayDetailStore();

  const handleChangeStatus = (status: WayDetailStatus) => {
    selectedWayDetails.map((id) => id);
  };

  return (
    <Box>
      <Stacks justifyContent="space-between">
        {statuses.map((status, index) => (
          <Button
            key={index}
            fullWidth
            variant="tertiary"
            label={status.rus}
            onClick={() => handleChangeStatus(status)}
          />
        ))}
      </Stacks>
    </Box>
  );
};
