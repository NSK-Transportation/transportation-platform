import { useQuery } from "react-query";
import { getRefund } from "@/entities/refund";
import { DownloadIcon, ErrorIcon, SuccessIcon } from "@/shared/assets";
import { Divider, Stacks, Typography } from "@/shared/ui";

export const FormPrinting = () => {
  const { status, refetch } = useQuery([], () => getRefund(), {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const getStatusIcon = () => {
    switch (status) {
      case "error":
        return <ErrorIcon />;
      case "success":
        return <SuccessIcon />;
      case "loading":
        return <DownloadIcon />;
      case "idle":
        return null;
    }
  };

  const handlePrint = async () => {
    console.log("Печать бланка");
    await refetch();
  };

  return (
    <Stacks gap={16} onClick={handlePrint}>
      <Divider color="blue" orientation="vertical" />
      <Stacks alignItems="center" gap={4}>
        <Typography cursor="pointer" variant="h3" color="primary">
          Печать бланка на возврат билета
        </Typography>
        <Typography cursor="pointer" variant="h3" color="primary">
          {getStatusIcon()}
        </Typography>
      </Stacks>
    </Stacks>
  );
};
