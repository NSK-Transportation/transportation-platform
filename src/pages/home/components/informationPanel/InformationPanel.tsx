import { Box } from "@/shared/ui";
import { SeatInfoItem } from "./child/seatInfoItem/SeatInfoItem";
import styles from "./InformationPanel.module.scss";
import { useInformationStore } from "./InformationPanel.store";

export const InformationPanel = () => {
  const { activeWay } = useInformationStore();

  if (!activeWay.there ?? !activeWay.return) {
    return <Box direction="center" className={styles.informationPanel} text="Данных нет" />;
  }

  return (
    <div className={styles.informationPanel}>
      <SeatInfoItem />
    </div>
  );
};
