import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Box, Stacks, Typography } from "@/shared/ui";
import styles from "../seatInfoPlace/SeatinfoPlace.module.scss";
import { useSearchParams } from "react-router-dom";

export const SeatInfoPlace = () => {
  const { passengers, activeWay } = useMainStore((state) => state.saleTicket);
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";

  return activeWay?.seatsSelected.map((seat, index) => {
    const ticketType = passengers[index]?.ticket?.type;

    return (
      <Box key={index} className={styles.seatInfoPlace__box}>
        <Stacks direction="column" gap={8}>
          <Stacks gap={19} direction="row" fullwidth>
            <Typography variant="h4" weight={600}>
              Посадочное место
            </Typography>
            <Typography variant="h4" weight={400}>
              {seat}
            </Typography>
          </Stacks>

          {step === "3" && (
            <>
              {/* Полный билет */}
              {ticketType === "full" && (
                <Stacks direction="column" gap={8}>
                  <Stacks direction="row" gap={19}>
                    <Typography variant="h4" weight={600}>
                      Багажное место:
                    </Typography>
                    <Typography variant="h4" weight={400}>
                      {passengers[index]?.baggage?.rus}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={7}>
                    <Typography variant="h4" weight={600}>
                      Тип билета:
                    </Typography>
                    <Typography variant="h4" weight={400} color="primary">
                      {passengers[index]?.ticket?.rus}
                    </Typography>
                    <Typography variant="h4" weight={600}>
                      Тип документа:
                    </Typography>
                    <Typography variant="h4" weight={400} color="primary">
                      {passengers[index]?.identification?.documentType}
                    </Typography>
                  </Stacks>
                  <Stacks direction="column" gap={4}>
                    <Stacks direction="row" gap={18}>
                      <Typography variant="h4" weight={600}>
                        Фамилия:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].lastName}
                      </Typography>
                    </Stacks>
                    <Stacks direction="row" gap={50}>
                      <Typography variant="h4" weight={600}>
                        Имя:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].firstName}
                      </Typography>
                    </Stacks>
                    <Stacks direction="row" gap={18}>
                      <Typography variant="h4" weight={600}>
                        Отчество:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].patronymic}
                      </Typography>
                    </Stacks>
                  </Stacks>
                  <Stacks direction="row" gap={18} alignItems="center">
                    <Stacks direction="column" gap={1}>
                      <Typography variant="h4" weight={600}>
                        Дата
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        рождения:
                      </Typography>
                    </Stacks>
                    <Typography variant="h4" weight={400} color="secondary">
                      {passengers[index].birthday}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={51}>
                    <Typography variant="h4" weight={600}>
                      Пол:
                    </Typography>
                    <Typography variant="h4" weight={400} color="secondary">
                      {passengers[index].gender}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={18}>
                    <Typography variant="h4" weight={600}>
                      Телефон :
                    </Typography>
                    <Typography variant="h4" weight={400} color="primary">
                      {passengers[index].phone}
                    </Typography>
                  </Stacks>
                </Stacks>
              )}
              {/* Детский билет */}
              {ticketType === "child" && (
                <Stacks direction="column" gap={8}>
                  <Stacks direction="row" gap={19}>
                    <Typography variant="h4" weight={600}>
                      Багажное место:
                    </Typography>
                    <Typography variant="h4" weight={400}>
                      {passengers[index]?.baggage?.rus}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={7}>
                    <Typography variant="h4" weight={600}>
                      Тип билета:
                    </Typography>
                    <Typography variant="h4" weight={400} color="primary">
                      {passengers[index]?.ticket?.rus}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={35}>
                    <Typography variant="h4" weight={600}>
                      Скидка:
                    </Typography>
                    <Typography variant="h4" weight={400} color="info">
                      {passengers[index]?.discount?.rus} ff
                    </Typography>

                    <Stacks direction="row" gap={7}>
                      <Typography variant="h4" weight={600}>
                        Свидетельство о рожд.:
                      </Typography>
                      <Typography variant="h4" weight={400} color="info">
                        {passengers[index]?.identification?.series}
                      </Typography>
                      <Typography variant="h4" weight={400} color="info">
                        {passengers[index]?.identification?.number}
                      </Typography>
                    </Stacks>
                  </Stacks>
                  <Stacks direction="column" gap={4}>
                    <Stacks direction="row" gap={18}>
                      <Typography variant="h4" weight={600}>
                        Фамилия:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].lastName}
                      </Typography>
                    </Stacks>
                    <Stacks direction="row" gap={50}>
                      <Typography variant="h4" weight={600}>
                        Имя:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].firstName}
                      </Typography>
                    </Stacks>
                    <Stacks direction="row" gap={18}>
                      <Typography variant="h4" weight={600}>
                        Отчество:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].patronymic}
                      </Typography>
                    </Stacks>
                  </Stacks>
                  <Stacks direction="row" gap={18} alignItems="center">
                    <Stacks direction="column" gap={1}>
                      <Typography variant="h4" weight={600}>
                        Дата
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        рождения:
                      </Typography>
                    </Stacks>
                    <Typography variant="h4" weight={400} color="secondary">
                      {passengers[index].birthday}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={51}>
                    <Typography variant="h4" weight={600}>
                      Пол:
                    </Typography>
                    <Typography variant="h4" weight={400} color="secondary">
                      {passengers[index].gender}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={18}>
                    <Typography variant="h4" weight={600}>
                      Телефон :
                    </Typography>
                    <Typography variant="h4" weight={400} color="primary">
                      {passengers[index].phone}
                    </Typography>
                  </Stacks>
                </Stacks>
              )}
              {/* Льготный билет */}
              {ticketType === "privilege" && (
                <Stacks direction="column" gap={8}>
                <Stacks direction="row" gap={19}>
                  <Typography variant="h4" weight={600}>
                    Багажное место:
                  </Typography>
                  <Typography variant="h4" weight={400}>
                    {passengers[index]?.baggage?.rus}
                  </Typography>
                </Stacks>
                <Stacks direction="row" gap={7}>
                  <Typography variant="h4" weight={600}>
                    Тип билета:
                  </Typography>
                  <Typography variant="h4" weight={400} color="primary">
                    {passengers[index]?.ticket?.rus}
                  </Typography>
                </Stacks>
                <Stacks direction="row" gap={7}>
                  <Typography variant="h4" weight={600}>
                    Тип льготы:
                  </Typography>
                  <Typography variant="h4" weight={400} color="info">
                    "Назвние льготы"
                  </Typography>
                </Stacks>
                <Stacks direction="column" gap={4}>
                  <Stacks direction="row" gap={18}>
                    <Typography variant="h4" weight={600}>
                      Фамилия:
                    </Typography>
                    <Typography variant="h4" weight={600}>
                      {passengers[index].lastName}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={50}>
                    <Typography variant="h4" weight={600}>
                      Имя:
                    </Typography>
                    <Typography variant="h4" weight={600}>
                      {passengers[index].firstName}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={18}>
                    <Typography variant="h4" weight={600}>
                      Отчество:
                    </Typography>
                    <Typography variant="h4" weight={600}>
                      {passengers[index].patronymic}
                    </Typography>
                  </Stacks>
                </Stacks>
                <Stacks direction="row" gap={18} alignItems="center">
                  <Stacks direction="column" gap={1}>
                    <Typography variant="h4" weight={600}>
                      Дата
                    </Typography>
                    <Typography variant="h4" weight={600}>
                      рождения:
                    </Typography>
                  </Stacks>
                  <Typography variant="h4" weight={400} color="secondary">
                    {passengers[index].birthday}
                  </Typography>
                </Stacks>
                <Stacks direction="row" gap={51}>
                  <Typography variant="h4" weight={600}>
                    Пол:
                  </Typography>
                  <Typography variant="h4" weight={400} color="secondary">
                    {passengers[index].gender}
                  </Typography>
                </Stacks>
                <Stacks direction="row" gap={18}>
                  <Typography variant="h4" weight={600}>
                    Телефон :
                  </Typography>
                  <Typography variant="h4" weight={400} color="primary">
                    {passengers[index].phone}
                  </Typography>
                </Stacks>
              </Stacks>
              )}
              {/* Билет со скидкой */}
              {ticketType === "discount" && (
                  <Stacks direction="column" gap={8}>
                  <Stacks direction="row" gap={19}>
                    <Typography variant="h4" weight={600}>
                      Багажное место:
                    </Typography>
                    <Typography variant="h4" weight={400}>
                      {passengers[index]?.baggage?.rus}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={7}>
                    <Typography variant="h4" weight={600}>
                      Тип билета:
                    </Typography>
                    <Typography variant="h4" weight={400} color="primary">
                      {passengers[index]?.ticket?.rus}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={7}>
                    <Typography variant="h4" weight={600}>
                      Вид скидки:
                    </Typography>
                    <Typography variant="h4" weight={400} color="info">
                      {passengers[index]?.discount?.rus}
                    </Typography>
                    <Typography variant="h4" weight={600}>
                      Номер документа:
                    </Typography>
                    <Typography variant="h4" weight={400}>
                      {passengers[index]?.identification?.number}
                    </Typography>
                  </Stacks>
                  <Stacks direction="column" gap={4}>
                    <Stacks direction="row" gap={18}>
                      <Typography variant="h4" weight={600}>
                        Фамилия:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].lastName}
                      </Typography>
                    </Stacks>
                    <Stacks direction="row" gap={50}>
                      <Typography variant="h4" weight={600}>
                        Имя:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].firstName}
                      </Typography>
                    </Stacks>
                    <Stacks direction="row" gap={18}>
                      <Typography variant="h4" weight={600}>
                        Отчество:
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        {passengers[index].patronymic}
                      </Typography>
                    </Stacks>
                  </Stacks>
                  <Stacks direction="row" gap={18} alignItems="center">
                    <Stacks direction="column" gap={1}>
                      <Typography variant="h4" weight={600}>
                        Дата
                      </Typography>
                      <Typography variant="h4" weight={600}>
                        рождения:
                      </Typography>
                    </Stacks>
                    <Typography variant="h4" weight={400} color="secondary">
                      {passengers[index].birthday}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={51}>
                    <Typography variant="h4" weight={600}>
                      Пол:
                    </Typography>
                    <Typography variant="h4" weight={400} color="secondary">
                      {passengers[index].gender}
                    </Typography>
                  </Stacks>
                  <Stacks direction="row" gap={18}>
                    <Typography variant="h4" weight={600}>
                      Телефон :
                    </Typography>
                    <Typography variant="h4" weight={400} color="primary">
                      {passengers[index].phone}
                    </Typography>
                  </Stacks>
                </Stacks>
              )}
            </>
          )}
        </Stacks>
      </Box>
    );
  });
};
