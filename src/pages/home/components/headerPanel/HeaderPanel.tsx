import { Time } from "@/shared/ui/time/Time";
import { RxExit } from "react-icons/rx";
import styles from "./HeaderPanel.module.scss";
import { useHeaderStore } from "./HeaderPanel.store";
import { Avatar, Button, Stacks, Typography } from "@/shared/ui";

export const HeaderPanel = () => {
  const { text } = useHeaderStore();

  return (
    <div className={styles.headerPanel}>
      <Time className={styles.headerPanel__time}/>
      {text.user.map(({ user, id_user }) => (
        <div className={styles.headerPanel__userInfo} key={id_user}>
          <Avatar className={styles.headerPanel__avatar} />
          {/* <div className={styles.headerPanel__userInfo__text}> */}
          <Stacks direction="column" className={styles.headerPanel__userInfo__text}>
            <Typography color="secondary" className="">
              <div className={styles.headerPanel__user}>{user}</div>
            </Typography>
            <div className={styles.headerPanel__idUser}>{id_user}</div>
          </Stacks>
          {/* </div> */}
        </div>
      ))}
      <Button
        justifyContent="center"
        label={<RxExit />}
        size="icon"
        variant="secondary"
      />
    </div>
  );
};
