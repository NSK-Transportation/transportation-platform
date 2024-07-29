import { Button, Divider, Stacks, Typography } from "@/shared/ui";
import styles from "./AsidePanel.module.scss";
import { LinkData, roleNames } from "./LinkData";
import { NavLink } from "react-router-dom";
import { logoNoText } from "@/shared/assets";

export const AsidePanel = () => {
  const linksData: { [key: string]: { text: string; to: string }[] } = LinkData();
  // TODO: Сделать UI компонент для изображений
  return (
    <div className={styles.asidePanel}>
      <Stacks direction="column" gap={16}>
        <img className={styles.asidePanel__image} src={logoNoText} alt="logoNoText" />
        <Divider />
        {Object.keys(linksData).map((role, index) => (
          <div className={styles.asidePanel__link} key={index}>
            <Typography variant="caption" color="secondary">
              {roleNames[role]}
            </Typography>
            {linksData[role].map((link, linkIndex) => (
              <NavLink key={linkIndex} to={link.to}>
                <Button label={link.text} fullWidth justifyContent="start" variant="tertiary" />
              </NavLink>
            ))}
          </div>
        ))}
      </Stacks>
    </div>
  );
};
