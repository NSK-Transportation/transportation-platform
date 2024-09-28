import { Passenger, WayDetail } from "@/app/@types";
import { Typography } from "@/shared/ui";
import { FC } from "react";

interface PassengerInfoScreenProps {
  passengers: Passenger[];
  totalSum: number;
  activeWay: {
    there: WayDetail | null;
    return: WayDetail | null;
  };
}

export const PassengerInfoScreen: FC<PassengerInfoScreenProps> = ({
  passengers,
  totalSum,
  activeWay,
}) => {
  return (
    <div>
      <Typography weight={600}>Подтверждение пассажиров</Typography>
      <p>Сумма к оплате: {totalSum} рублей</p>
      {passengers.map((passenger) => (
        <div key={passenger.id}>
          <Typography weight={600}>
            Пассажир {passenger.lastName + " " + passenger.firstName + " " + passenger.patronymic}
          </Typography>
          <p>Билет туда: {activeWay.there?.ticket.price ?? "Нет данных"} руб.</p>
          <p>Билет обратно: {activeWay.return?.ticket.price ?? "Нет данных"} руб.</p>
          <p>
            Багаж туда: {passenger.ticket.there?.baggage && passenger.ticket.there.baggage.count}{" "}
            шт.
          </p>
          <p>
            Багаж обратно:{" "}
            {passenger.ticket.return?.baggage && passenger.ticket.return.baggage.count} шт.
          </p>
        </div>
      ))}
    </div>
  );
};
