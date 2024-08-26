import { Stacks } from "@/shared/ui";
import { ActionMenu } from "./ActionMenu";
import { FilterMenu } from "./FilterMenu";

export const WayManagement = () => {
  return (
    <Stacks direction="column" gap={5}>
      <ActionMenu />
      <FilterMenu />
    </Stacks>
  );
};
