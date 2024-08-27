import { Stacks } from "@/shared/ui";
import { ActionMenu } from "./actionMenu/ActionMenu";
import { FilterMenu } from "./filterMenu/FilterMenu";
// import {WayMenu} from "./filterMenu/FilterMenu"

export const WayManagement = () => {
  return (
    <Stacks direction="column" gap={5}>
      <ActionMenu />
      <FilterMenu />
    </Stacks>
  );
};
