import { logoNoText } from "@/shared/assets";
import styles from "./AsidePanel.module.scss";

import { NavLink, useLocation } from "react-router-dom";
import { useAsideStore } from "./AsidePanel.store";
import { Box, Button, Divider, Image, Stacks, Typography } from "@/shared/ui";
import { useEffect } from "react";

export const AsidePanel = () => {
  const { links, linksNames, activeLink, selectLink } = useAsideStore();
  const location = useLocation();

  useEffect(() => {
    const foundLink = Object.values(links)
      .flat()
      .find((link) => link);
    if (foundLink) {
      selectLink(foundLink.text);
    }
  }, [location.pathname]);

  return (
    <Box className={styles.asidePanel}>
      <Stacks direction="column" gap={16}>
        <Image alignSelf="center" size="50%" alt={"logoNoText"} src={logoNoText} />
        <Divider />
        {Object.keys(links).map((name, index) => (
          <div className={styles.asidePanel__link} key={index}>
            <Typography variant="caption" color="secondary" className={styles.asidePanel__roleName}>
              {linksNames[name]}
            </Typography>
            {links[name].map((link, linkIndex) => (
              <NavLink
                className={({ isActive }) =>
                  isActive || link.to === activeLink ? styles.active : ""
                }
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
