import { Box, Stacks } from "@/shared/ui";
import { WayMainItem } from "../wayMainItem/WayMainItem";
import { useMainStore, WayDetails } from "../../../MainPanel.store";

export const WayMainList = ({ data }: { data: WayDetails[] }) => {
  const { activeWay, setActiveWay, setWayDetails } = useMainStore((state) => ({
    activeWay: state.saleTicket.activeWay,
    setActiveWay: state.saleTicket.setActiveWay,
    setWayDetails: state.saleTicket.setWayDetails,
  }));

  const handleItemClick = (item: WayDetails) => {
    setActiveWay(item);
    setWayDetails(
      data.map((detail) => ({
        ...detail,
        isSelected: detail.id === item.id,
      })),
    );
  };

  return (
    <Box
      style={{
        overflow: "auto",
      }}
    >
      <Stacks fullwidth direction="column" gap={12}>
        {data?.map((item: any) => (
          <WayMainItem
            key={item.id}
            item={item}
            isSelected={activeWay ? activeWay.id === item.id : false}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </Stacks>
    </Box>
  );
};
