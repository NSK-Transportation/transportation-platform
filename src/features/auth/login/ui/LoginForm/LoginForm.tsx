import { useKeyboard } from "@siberiacancode/reactuse";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Authorization, useAuthStore } from "@/entities/auth";
import { loginMutation } from "@/entities/auth";
import { useUserStore } from "@/entities/user";
import { EyeCloseIcon, EyeOpenIcon } from "@/shared/assets";
import { Button, Input, Label, Stacks, Typography } from "@/shared/ui";

export const LoginForm = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);
  const { setAuth } = useAuthStore();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation((data: Authorization) => loginMutation(data), {
    onSuccess: (data) => {
      setAuth(true);
      setUser({ ...data });
      navigate("/home", { replace: true });
    },
    onError: (error) => {
      console.error("Ошибка при входе в систему", error);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Authorization>();

  const handleShowPassword = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  const onLogin = async (data: Authorization) => {
    await mutateAsync(data);
  };
  useKeyboard({ onKeyDown: (event) => event.key === "Enter" && handleSubmit(onLogin)() });

  return (
    <Stacks direction="column" gap={16}>
      <Label text="ID Сотрудника" variant="h3">
        <Input
          {...register("id", { required: "ID Сотрудника обязателен" })}
          type="number"
          message={errors.id?.message}
        />
      </Label>
      <Label text="Пароль" variant="h3">
        <Input
          {...register("password", { required: "Пароль обязателен" })}
          type={isPasswordHidden ? "text" : "password"}
          message={errors.password?.message}
          slotsRight={
            isPasswordHidden ? (
              <EyeOpenIcon size={20} cursor={"pointer"} onClick={handleShowPassword} />
            ) : (
              <EyeCloseIcon size={20} cursor={"pointer"} onClick={handleShowPassword} />
            )
          }
        />
      </Label>
      <Stacks alignItems="center" gap={16}>
        <Typography cursor="pointer" color="secondary" variant="h3">
          Обратиться в поддержку
        </Typography>
        <Button
          variant="primary"
          label="Войти"
          onClick={handleSubmit(onLogin)}
          loading={isLoading}
        />
      </Stacks>
    </Stacks>
  );
};
