import { Time } from "@/shared/ui/time/Time";
import styles from "./HeaderPanel.module.scss";
import { useHeaderStore } from "./HeaderPanel.store";
import { Avatar, Button, Typography } from "@/shared/ui";

export const HeaderPanel = () => {
  const { Text } = useHeaderStore();

  return (
    <div className={styles.headerPanel}>
      <Time className={styles.headerPanel__time} />
      {Text.user.map(({ user, id_user }) => (
        <div className={styles.headerPanel__userInfo} key={id_user}>
          <Avatar className={styles.headerPanel__avatar} />
          <div className={styles.headerPanel__userInfo__text}>
            <Typography color="secondary" className="">
              <div className={styles.headerPanel__user}>{user}</div>
            </Typography>
            <div className={styles.headerPanel__idUser}>{id_user}</div>
          </div>
        </div>
      ))}
      <Button
        className={styles.headerPanel__button}
        justifyContent="center"
        label={
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.744568 2.66607C0.744568 1.19973 1.9443 0 3.41064 0H14.0749V2.66607H3.41064V21.3286H14.0749V23.9947H3.41064C1.9443 23.9947 0.744568 22.7949 0.744568 21.3286V2.66607ZM19.6417 10.6643L16.2611 7.28371L18.146 5.3988L24.7446 11.9973L18.146 18.5959L16.2611 16.711L19.6417 13.3304H10.8623V10.6643H19.6417Z"
              fill="#BFBFBF"
            />
          </svg>
        }
        size="icon"
        variant="secondary"
      />
    </div>
  );
};
