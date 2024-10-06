import { WayManagementList } from "@/widgets/Way";
import { SelectorWayHorizontal } from "@/widgets/Way/selectorWayHorizontal";
import { SelectWayStatus } from "@/features/way";
import { Stacks } from "@/shared/ui";

export const ManagementWay = () => {
  return (
    <Stacks direction="column" gap={16}>
      <SelectorWayHorizontal />
      <SelectWayStatus />
      <WayManagementList />
    </Stacks>
  );
};
