import { FC } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getWays, useWayStore } from "@/entities/way";
import { useWayDetailStore } from "@/entities/wayDetails";
import { Direction } from "@/shared/types";
import { Button } from "@/shared/ui";

interface Props {
  direction: Direction;
}

export const SearchWayButton: FC<Props> = ({ direction }) => {
  const { way } = useWayStore();
  const { setWayDetails } = useWayDetailStore();

  const { refetch, isFetching } = useQuery([`way-${direction}`, way], () => getWays(way), {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      setWayDetails(data, direction);
    },
  });

  const handleClick = () => {
    if (!(way.date && way.from.city && way.to.city)) {
      toast("Заполните поля");
      return;
    }
    toast.promise(refetch(), {
      loading: "Загрузка",
      success: "Маршруты получены",
      error: "Ошибка",
    });
    refetch();
  };

  return <Button label="Искать" onClick={handleClick} loading={isFetching} />;
};
