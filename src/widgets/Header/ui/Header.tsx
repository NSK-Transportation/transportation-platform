import { Button, Stacks, Time, Typography, User } from "@/shared/ui";

export const Header = () => {
  return (
    <Stacks justifyContent="space-between">
      <Typography>ActiveLink</Typography>
      <Stacks gap={16}>
        <Time />
        <User name="Ксюша Павловна" description="ID: 000000" />
        <Button justifyContent="center" label={"*"} size="icon" variant="secondary" sizeIcon={48} />
      </Stacks>
    </Stacks>
  );
};
