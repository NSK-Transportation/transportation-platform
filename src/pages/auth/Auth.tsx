import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { Controller } from "react-hook-form";

import { logoWithText, EyeOpenIcon, EyeCloseIcon } from "@/shared/assets";
import { Stacks, Time, Image, Label, Input, Button, Typography, Form, Box } from "@/shared/ui";

import { useAuthStore } from "./Auth.store";
import { Authorization } from "@/app/@types";
import { useAsideStore } from "../home/components";

export const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setAuth } = useAuthStore();
  const { appVersion } = useAsideStore();

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
    <Stacks
      style={{ height: "100vh" }}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Time style={{ color: "#52A5F2" }} />
      <Box variant="withoutShadow" padding={48}>
        <Stacks direction="column" alignItems="center" gap={64}>
          <Image src={logoWithText} alt="logoWithText" objectFit="contain" />
          <Form
            onSubmit={onSubmit}
            defaultValues={{ id: data.id || "", password: data.password || "" }}
          >
            <Stacks direction="column" gap={16}>
              <Controller
                name="id"
                rules={{ required: "ID пользователя обязательно" }}
                render={({ field }) => (
                  <>
                    <Label text="ID Сотрудника" variant="h3">
                      <Input {...field} onChange={(event) => field.onChange(event.target.value)} />
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
                    <Label text="Пароль" variant="h3">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => field.onChange(event.target.value)}
                        slotsRight={
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
              <Stacks alignItems="center" gap={16}>
                <Typography cursor="pointer" color="secondary" variant="h3">
                  Обратиться в поддержку
                </Typography>
                <Button variant="primary" label="Войти" type="submit" loading={isLoading} />
              </Stacks>
            </Stacks>
          </Form>
        </Stacks>
      </Box>
      <Typography variant="h5" color="secondary">
        Version {appVersion}
      </Typography>
    </Stacks>
  );
};
