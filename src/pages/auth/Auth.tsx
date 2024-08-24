import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { Controller } from "react-hook-form";

import { logoWithText, EyeOpenIcon, EyeCloseIcon } from "@/shared/assets";
import { Stacks, Time, Image, Label, Input, Button, Typography, Form } from "@/shared/ui";

import { useAuthStore } from "./Auth.store";
import { Authorization } from "@/app/@types";

export const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setAuth } = useAuthStore();

  const { mutateAsync, isLoading } = useMutation(
    (data: Authorization) => {
      return axios.post("/todos", { data });
    },
    {
      onSuccess: (data) => {
        setAuth({ isAuth: true });
        console.log("Успешный вход в систему", data);
      },
      onError: (error) => {
        console.error("Ошибка при входе в систему", error);
      },
    },
  );

  const onSubmit = (data: Authorization) => {
    setAuth(data);
    mutateAsync(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div style={{ backgroundColor: "#ffffff", width: "100vw", height: "100vh" }}>
      <Stacks fullwidth fullheight direction="column" alignItems="center" justifyContent="center">
        <Time style={{ color: "#52A5F2" }} />
        <Image src={logoWithText} alt="logoWithText" size="15%" objectFit="contain" />
        <Form
          onSubmit={onSubmit}
          defaultValues={{ userID: data.userID || "", password: data.password || "" }}
        >
          <Stacks direction="column" gap={16}>
            <Controller
              name="userID"
              rules={{ required: "ID пользователя обязательно" }}
              render={({ field }) => (
                <>
                  <Label
                    text="ID Сотрудника"
                    direction="left"
                    style={{ justifyContent: "space-between", gap: "8px" }}
                  >
                    <Input
                      {...field}
                      style={{ width: "180px" }}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </Label>
                </>
              )}
            />
            <Controller
              name="password"
              rules={{
                required: "Пароль обязателен",
                minLength: { value: 6, message: "Минимум 6 символов" },
              }}
              render={({ field }) => (
                <>
                  <Label text="Пароль" direction="left" style={{ justifyContent: "space-between" }}>
                    <Input
                      {...field}
                      style={{ width: "162px" }}
                      type={showPassword ? "text" : "password"}
                      onChange={(event) => field.onChange(event.target.value)}
                      slots={
                        showPassword ? (
                          <EyeOpenIcon cursor={"pointer"} onClick={togglePasswordVisibility} />
                        ) : (
                          <EyeCloseIcon cursor={"pointer"} onClick={togglePasswordVisibility} />
                        )
                      }
                    />
                  </Label>
                </>
              )}
            />
            <Stacks justifyContent="space-between">
              <Typography
                onClick={() => alert("Добавить событие")}
                style={{ alignContent: "center", cursor: "pointer" }}
                color="secondary"
              >
                Обратиться в поддержку
              </Typography>
              <Button variant="primary" label="Войти" type="submit" loading={isLoading} />
            </Stacks>
          </Stacks>
        </Form>
      </Stacks>
    </div>
  );
};
