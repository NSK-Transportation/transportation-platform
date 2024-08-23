import { useState } from "react";

import { logoWithText, EyeOpenIcon, EyeCloseIcon } from "@/shared/assets";
import { Stacks, Time, Image, Label, Input, Button, Typography } from "@/shared/ui";
import { useAuthStore } from "./Auth.store";

export const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuth, setAuth, setPassword, setUserID } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Stacks fullwidth style={{ width: "100vw" }} direction="column" alignItems="center">
      <Time style={{ marginTop: "86px", marginBottom: "189px", color: "#52A5F2" }} />
      <Image src={logoWithText} alt="logoWithText" style={{ width: "236px" }} objectFit="cover" />
      <Stacks direction="column">
        <Label
          text="ID Сотрудника"
          direction="left"
          style={{ justifyContent: "space-between", marginBottom: "12px" }}
        >
          <Input style={{ width: "180px" }} onChange={(event) => setUserID(event.target.value)} />
        </Label>
        <Label
          text="Пароль"
          direction="left"
          style={{ justifyContent: "space-between", marginBottom: "20px" }}
        >
          <Input
            type={showPassword ? "text" : "password"}
            style={{ width: "162px" }}
            onChange={(event) => setPassword(event.target.value)}
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
          <Button variant="primary" label="Войти" onClick={() => setAuth(true)}></Button>
        </Stacks>
      </Stacks>
    </Stacks>
  );
};
