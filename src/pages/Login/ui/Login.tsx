import { LoginForm } from "@/features/auth";
import { logoWithText } from "@/shared/assets";
import { useAppStore } from "@/shared/store";
import { Stacks, Time, Image, Typography, Box } from "@/shared/ui";

export const Login = () => {
  const { version } = useAppStore();

  return (
    <Stacks
      style={{ height: "100vh" }}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Time />
      <Box variant="withoutShadow" padding={48}>
        <Stacks direction="column" alignItems="center" gap={64}>
          <Image src={logoWithText} alt="logoWithText" objectFit="contain" />
          <LoginForm />
        </Stacks>
      </Box>
      <Typography variant="h5" color="secondary">
        Версия {version}
      </Typography>
    </Stacks>
  );
};
