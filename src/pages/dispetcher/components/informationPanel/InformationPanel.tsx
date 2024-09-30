import { Box } from "@/shared/ui";
import { SeatInfoItem } from "./child/seatInfoItem/SeatInfoItem";
import styles from "./InformationPanel.module.scss";
import { useInformationStore } from "./InformationPanel.store";
import '../../styleDispetcer.css'
export const InformationPanel = () => {
  const { activeWay } = useInformationStore();

  if (!activeWay.there ?? !activeWay.return) {
    return <Box direction="center" className={styles.informationPanel} text="Данных нет" />;
  }

  return (
    <div className="component1">
    <div className={styles.informationPanel}>
      <SeatInfoItem />
    </div>
      </div>
  );
};
