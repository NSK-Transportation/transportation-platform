import { logoNoText } from "@/shared/assets";
import styles from "./AsidePanel.module.scss";

import { NavLink } from "react-router-dom";
import { useAsideStore } from "./AsidePanel.store";

export const AsidePanel = () => {
  const { links, linksNames, selectLink } = useAsideStore();

  return (
    <Box className={styles.asidePanel}>
      <Stacks direction="column" gap={16}>
        <Image alignSelf="center" size="50%" alt={"logoNoText"} src={logoNoText} />
        <Divider />
        {Object.keys(links).map((name, index) => (
          <div className={styles.asidePanel__link} key={index}>
            <Typography variant="caption" color="secondary"  className={styles.asidePanel__roleName}>
              {linksNames[name]}
            </Typography>
            {links[name].map((link, linkIndex) => (
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                key={linkIndex}
                to={link.to}
                onClick={() => selectLink(link.text)}
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
