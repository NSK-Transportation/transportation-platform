import { Box, Stacks } from "@/shared/ui";
import { WayManagementItem } from "../wayManagementItem/WayManagementItem";

export const ManagementTable = () => {


  return (
    <Box
      style={{
        overflow: "auto",
      }}
    >
      <Stacks fullwidth direction="column" gap={12}>
        <WayManagementItem />
      </Stacks>
    </Box>
  );
};
