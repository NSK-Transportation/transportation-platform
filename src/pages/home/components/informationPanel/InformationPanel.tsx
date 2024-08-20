import { Box } from "@/shared/ui";
import styles from "./InformationPanel.module.scss";
// import { useMainStore } from "../mainPanel/MainPanel.store";
import { useSearchParams } from "react-router-dom";
import { SeatInfoItem } from "./child/seatInfoItem/SeatInfoItem";

export const InformationPanel = () => {
  // const { activeWay } = useMainStore((state) => state.saleTicket);
  
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";
  if (step == "0") {
    return (
      <Box
        direction="center"
        className={styles.informationPanel}
        text="Данных нет"
      ></Box>
    );
  }else{
    return(
      <SeatInfoItem/>
    )
  }


};
