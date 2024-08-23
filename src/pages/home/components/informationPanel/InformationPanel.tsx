import { Box } from "@/shared/ui";
import { useMainStore } from "../mainPanel/MainPanel.store";
import { SeatInfoItem } from "./child/seatInfoItem/SeatInfoItem";
import styles from "./InformationPanel.module.scss";

export const InformationPanel = () => {
  const { activeWay } = useMainStore((state) => state.saleTicket);

  if (!activeWay) {
    return <Box direction="center" className={styles.informationPanel} text="Данных нет" />;
  } else {
    return <SeatInfoItem />;
  }
};
