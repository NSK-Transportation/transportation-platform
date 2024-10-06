import { FC } from "react";
import { useWayStore } from "@/entities/way";
import { Typography } from "@/shared/ui";

export const SetReturnWay: FC = () => {
  const { returnHave, setReturnHave } = useWayStore();

  const handleReturn = () => {
    setReturnHave(!returnHave);
  };
  return (
    <Typography cursor="pointer" variant="h3" color="default-white" onClick={handleReturn}>
      {returnHave ? "Отменить обратный билет" : "Добавить обратный билет"}
    </Typography>
  );
};
