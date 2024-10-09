import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { logoutQuery, useAuthStore } from "@/entities/auth";
import { useSidebarStore } from "@/entities/sidebar";
import { useUserStore } from "@/entities/user";
import { ExitIcon } from "@/shared/assets";
import { Button, Stacks, Time, Typography, User } from "@/shared/ui";

export const Header = () => {
  const { setAuth } = useAuthStore();
  const { activeLink } = useSidebarStore();
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const { refetch, isFetching } = useQuery([], () => logoutQuery(), {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setAuth(false);
      clearUser();
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("Ошибка при выходе из системы", error);
    },
  });

  const handleLogout = async () => {
    await refetch();
  };

  return (
    <Stacks justifyContent="space-between">
      <Typography variant="h3">{activeLink}</Typography>
      <Stacks gap={16}>
        <Time />
        <User
          avatar={user.avatarUrl ? { src: user.avatarUrl } : { alt: user.firstName }}
          name={`${user.firstName || "Имя"} ${user.lastName || "Фамилия"}`}
          description={"ID:" + user.id}
        />
        <Button
          justifyContent="center"
          label={<ExitIcon />}
          size="icon"
          variant="shadow"
          sizeIcon={48}
          onClick={handleLogout}
          loading={isFetching}
        />
      </Stacks>
    </Stacks>
  );
};
