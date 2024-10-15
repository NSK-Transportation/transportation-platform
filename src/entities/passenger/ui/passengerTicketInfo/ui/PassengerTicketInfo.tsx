import moment from "moment";
import { FC } from "react";
import { Direction } from "@/shared/types";
import { Typography } from "@/shared/ui";
import { Passenger } from "../../../model/types/passenger.types";

interface Props {
  passenger: Passenger;
  direction: Direction;
}

export const PassengerTicketInfo: FC<Props> = ({ passenger, direction }) => {
  return (
    <>
      <Typography variant="h3">Тип билета: {passenger.ticket[direction]?.rus}</Typography>
      {(!passenger.ticket[direction]?.baggage ||
        passenger.ticket[direction]?.baggage?.quantity != 0) && (
        <Typography variant="h3">
          Багажных мест: {passenger.ticket[direction]?.baggage?.quantity}
        </Typography>
      )}

      {passenger.ticket[direction]?.type === "full" && (
        <>
          <Typography variant="h3">
            Тип документа: {passenger.identification?.document?.rus}
          </Typography>
          <Typography variant="h3">
            Серия / Номер: {passenger.identification?.document?.series}
            {" / "}
            {passenger.identification?.document?.number}
          </Typography>
        </>
      )}

      {passenger.ticket[direction]?.type === "child" && (
        <>
          <Typography variant="h3">Скидка: {passenger.ticket[direction].discount?.rus}</Typography>
          <Typography variant="h3">
            Свидетельство о рождении: {passenger.identification?.child?.series}
            {" / "}
            {passenger.identification?.child?.number}
          </Typography>
        </>
      )}

      {passenger.ticket[direction]?.type === "discount" && (
        <>
          <Typography variant="h3">Скидка: {passenger.ticket[direction].discount?.rus}</Typography>
          <Typography variant="h3">
            {passenger.ticket[direction].discount?.type === "student" && "Номер студенческого: "}
            {passenger.ticket[direction].discount?.type === "student" &&
              passenger.identification?.student?.number}
            {passenger.ticket[direction].discount?.type === "military" && "Номер справки: "}
            {passenger.ticket[direction].discount?.type === "military" &&
              passenger.identification?.military?.number}
          </Typography>
        </>
      )}

      {passenger.ticket[direction]?.type === "privilege" && (
        <>
          <Typography variant="h3">
            Тип льготы: {passenger.identification?.privilege?.rus}
          </Typography>
          <Typography variant="h3">
            Документ на право льготы: {passenger.identification?.privilege?.series}
            {" / "}
            {passenger.identification?.privilege?.number}
          </Typography>
        </>
      )}

      {/* Общая информация пассажира */}
      <Typography variant="h3">Фамилия: {passenger.lastName}</Typography>
      <Typography variant="h3">Имя: {passenger.firstName}</Typography>
      <Typography variant="h3">Отчество: {passenger.patronymic}</Typography>
      <Typography variant="h3">
        Дата рождения: {moment(passenger.birthday?.toString()).format("DD.MM.YYYY")}
      </Typography>
      <Typography variant="h3">Пол: {passenger.gender?.rus}</Typography>
      {!passenger.phone.refusalToProvide && (
        <Typography variant="h3">Телефон: {passenger.phone.number}</Typography>
      )}
    </>
  );
};
