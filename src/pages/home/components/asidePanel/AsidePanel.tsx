import { Box, Button, Divider, Image, Stacks, Typography } from "@/shared/ui";
import styles from "./AsidePanel.module.scss";
import { LinkData as links, roleNames } from "./LinkData";
import { NavLink } from "react-router-dom";
import { logoNoText } from "@/shared/assets";

export const AsidePanel = () => {
  return (
    <Box className={styles.asidePanel}>
      <Stacks direction="column" gap={16}>
        <Image alignSelf="center" size="50%" alt={"logoNoText"} src={logoNoText} />
        <Divider />
        {Object.keys(links).map((role, index) => (
          <div className={styles.asidePanel__link} key={index}>
            <Typography variant="caption" color="secondary" className={styles.asidePanel__roleName}>
              {roleNames[role]}
            </Typography>
            {links[role].map((link, linkIndex) => (
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                key={linkIndex}
                to={link.to}
              >
                <Button label={link.text} fullWidth justifyContent="start" variant="tertiary" />
              </NavLink>
            ))}
          </div>
        ))}
      </Stacks>
    </Box>
  );
};
