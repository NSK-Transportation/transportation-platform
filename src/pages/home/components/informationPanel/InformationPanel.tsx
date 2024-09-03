import { Box } from "@/shared/ui";
import { SeatInfoItem } from "./child/seatInfoItem/SeatInfoItem";
import styles from "./InformationPanel.module.scss";
import { useSaleTicket } from "../mainPanel";

export const InformationPanel = () => {
  const { activeWay } = useSaleTicket();

  if (!activeWay.there) {
    return <Box direction="center" className={styles.informationPanel} text="Данных нет" />;
  } else {
    return <SeatInfoItem />;
  }
};
