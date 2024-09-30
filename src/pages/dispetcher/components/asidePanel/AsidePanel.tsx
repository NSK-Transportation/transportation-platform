import { logoNoText } from "@/shared/assets";
import styles from "./AsidePanel.module.scss";

import { NavLink } from "react-router-dom";
import { useAsideStore } from "./AsidePanel.store";
import { Box, Button, Divider, Image, Stacks, Typography } from "@/shared/ui";

export const AsidePanel = () => {
  const { links, linksNames, activeLink, selectLink, appVersion } = useAsideStore();

  return (
    <Box className={styles.asidePanel} padding={[28, 8, 28, 8]}>
      <Stacks direction="column" justifyContent="space-between" alignItems="center" fullheight>
        <Stacks direction="column" gap={16}>
          <Image alignSelf="center" size="50%" alt={"logoNoText"} src={logoNoText} />
          <Divider />
          {Object.keys(links).map((name, index) => (
            <div className={styles.asidePanel__link} key={index}>
              <Typography
                variant="caption"
                color="secondary"
                className={styles.asidePanel__roleName}
              >
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
                  <Button
                    slotsLeft={link.slotsLeft}
                    slotsRight={link.slotsRight}
                    label={link.text}
                    fullWidth
                    justifyContent="start"
                    variant="tertiary"
                  />
                </NavLink>
              ))}
            </div>
          ))}
        </Stacks>
        <Typography variant="h5" color="secondary">
          Version {appVersion}
        </Typography>
      </Stacks>
    </Box>
  );
};
