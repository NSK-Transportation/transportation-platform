import { Button, Calendar, Input, InputGroup, Stacks } from "@/shared/ui";
import { useWayManagement } from "../WayManagement.store";
import { CancelIcon } from "@/shared/assets";
import { useQuery } from "react-query";
import { getWays, getWaysManagement } from "@/shared/api/queries";
// import { useSaleTicket } from "./../../saleTicket/SaleTicket.store";

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const FilterMenu = () => {
  const { way, setWay, setWayDetails } = useWayManagement();
  const dateValue = way?.date || "";
  const fromValue = way?.from || "";
  const toValue = way?.to || "";
  const { refetch, isFetching } = useQuery(
    ["ways", way],
    () => getWaysManagement(way),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleClick = async () => {

    if (!way.from || !way.to || !way.date) {
      return;
    }
    const { data } = await refetch();
    if (data) {
      setWayDetails(data);
      // console.log(data);
    }
  };
  return (
    <Stacks direction="row" gap={15}>
      <Stacks direction="row" gap={1}>
        <InputGroup fullWidth>
          <Calendar
            onChange={(date: Date | Date[]) => {
              if (date instanceof Date) {
                setWay({
                  date: formatDate(date),
                });
              }
            }}
            name="date"
            placeholder="Дата отправления"
            minDate={new Date()}
            value={dateValue}
          />
          <Input
            style={{ width: "270px" }}
            name="from"
            type="text"
            value={fromValue}
            onChange={(e) => {
              setWay({
                from: e.target.value,
              });
            }}
            placeholder="Рейс"
            slots={<CancelIcon cursor={"pointer"} onClick={() => alert("Open date")} />}
          />
          <Input
            style={{ width: "270px" }}
            name="to"
            type="text"
            value={toValue}
            onChange={(e) => {
              setWay({
                to: e.target.value,
              });
            }}
            placeholder="Рейс"
            slots={<CancelIcon cursor={"pointer"} onClick={() => alert("Open date")} />}
          />
        </InputGroup>
        <Stacks fullwidth justifyContent="center">
          <Button onClick={handleClick} loading={isFetching} label="Искать" />
        </Stacks>
      </Stacks>
    </Stacks>
  );
};
