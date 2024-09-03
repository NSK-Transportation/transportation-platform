/**
 * Компонент SeatMainItem
 *
 */

import { Box, Button, Label, Stacks, Typography } from "@/shared/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Direction } from "@/app/@types";
import { useSaleTicket } from "../SaleTicket.store";

interface SeatMainItemProps {
  direction: Direction;
}

export const SeatMainItem = ({ direction }: SeatMainItemProps) => {
  const { activeWay, statuses, toggleSeatStatus } = useSaleTicket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeWay[direction]) {
      navigate(
        {
          pathname: "/home/sale-ticket",
          search: "?step=0",
        },
        { replace: true },
      );
      navigate(0);
    }
  }, [activeWay, navigate]);

  if (!activeWay[direction]) {
    return <Typography variant="h3">Маршрут не найден</Typography>;
  }

  return (
    <Box>
      <Stacks fullwidth direction="column" gap={16}>
        <Stacks justifyContent="space-between">
          <Stacks direction="column" gap={4}>
            <Typography variant="h3">
              Количество мест: {activeWay?.[direction]?.seatsSelected.length}
            </Typography>
            <Typography color="secondary" variant="h4">
              Макс. количество: 10
            </Typography>
          </Stacks>

          <Stacks alignItems="flex-end" direction="column" gap={4}>
            <Typography variant="h3">Автобус: №{activeWay?.[direction]?.wayNumber}</Typography>
            <Typography variant="h3">
              Пассажирских мест: {activeWay?.[direction]?.seats.length}
            </Typography>
            <Typography variant="h3">Багажных мест: 0</Typography>
          </Stacks>
        </Stacks>

        <Stacks alignItems="center" direction="column" gap={8}>
          <Box variant="dashed">
            <Stacks
              fullwidth
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
              gap={16}
            >
              {activeWay?.[direction]?.seats.map((seat) => (
                <Button
                  key={seat.id}
                  variant={seat.status}
                  onClick={() =>
                    toggleSeatStatus(direction, activeWay?.[direction]?.id || 0, seat.id, 10)
                  }
                  disabled={seat.status === "booking" || seat.status === "occupied"}
                  label={`Место ${seat.id}`}
                />
              ))}
            </Stacks>
          </Box>

          <Stacks justifyContent="center" gap={16}>
            {statuses.map((status) => (
              <Label key={status.id} direction="right" text={status.rus}>
                <Button
                  style={{ cursor: "default" }}
                  size="small"
                  disabled={status.status === "booking" || status.status === "occupied"}
                  variant={status.status}
                  label=""
                />
              </Label>
            ))}
          </Stacks>
        </Stacks>
        <Typography variant="h3" color="secondary">
          Представленная нумерация мест не является схемой. Расположение выбранного номера места
          зависит от марки автобуса. Тип транспортного средства может быть изменён по инициативе
          перевозчика.
        </Typography>
      </Stacks>
    </Box>
  );
};
