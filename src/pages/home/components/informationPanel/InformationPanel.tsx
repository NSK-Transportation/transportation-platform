import { Box, Label, Typography } from "@/shared/ui";
import styles from "./InformationPanel.module.scss";

export const InformationPanel = () => {
  return (
    <Box className={styles.informationPanel}>
      <Typography variant="body" color="secondary" className={styles.asidePanel__roleName}>
        <div className={styles.informationPanel__text}>Данных пока нет</div>
      </Typography>
    </Box>
  );
};
