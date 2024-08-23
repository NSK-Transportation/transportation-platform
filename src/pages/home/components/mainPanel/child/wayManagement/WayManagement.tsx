import { Box, Button, Grid, Popup, Stacks, Typography } from "@/shared/ui";

export const WayManagement = () => {
    return (
  <Box direction="center" border="down" color="blue">
    <Stacks direction="row" gap={3}>
      <Typography variant="caption" color="default-white" size={20}>
        1000
      </Typography>
      <Typography variant="caption" color="default-white" size={20}>
        руб
      </Typography>
    </Stacks>
  </Box>
    );
};
