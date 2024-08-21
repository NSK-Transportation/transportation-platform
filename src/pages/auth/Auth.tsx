import { useState } from "react";

import { logoWithText, EyeOpenIcon, EyeCloseIcon } from "@/shared/assets";
import { Stacks, Time, Image, Label, Input, Button, Typography } from "@/shared/ui";

export const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <Stacks fullwidth style={{ width: "100vw" }} direction="column" alignItems="center">
      <Time style={{ marginTop: "86px", marginBottom: "189px", color: "#52A5F2" }} />
      <Image
        src={logoWithText}
        alt="logoWithText"
        style={{ marginBottom: "62px", width: "236.3px", height: "26px" }}
        objectFit="cover"
      />
      <Stacks style={{ width: "351px", height: "158px" }} direction="column">
        <Label
          text="ID Сотрудника"
          direction="left"
          style={{ justifyContent: "space-between", marginBottom: "12px" }}
        >
          <Input style={{ width: "180px" }} />
        </Label>
        <Label
          text="Пароль"
          direction="left"
          style={{ justifyContent: "space-between", marginBottom: "20px" }}
        >
          <Input
            type={showPassword ? "text" : "password"}
            style={{ width: "162px" }}
            slots={
              showPassword ? (
                <EyeOpenIcon cursor={"pointer"} onClick={togglePasswordVisibility} />
              ) : (
                <EyeCloseIcon cursor={"pointer"} onClick={togglePasswordVisibility} />
              )
            }
          />
        </Label>
        <Stacks justifyContent="space-between">
          <Typography
            /* onClick={""} */ style={{ alignContent: "center", cursor: "pointer" }}
            color="secondary"
          >
            Обратиться в поддержку
          </Typography>
          <Button variant="primary" label="Войти"></Button>
        </Stacks>
      </Stacks>
    </Stacks>
  );
};
