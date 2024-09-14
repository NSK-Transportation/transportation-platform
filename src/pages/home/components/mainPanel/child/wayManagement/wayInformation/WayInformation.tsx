import { Button, Input, Stacks, Typography, Chip, Box } from "@/shared/ui";
import { RxCross2 } from "react-icons/rx";
import { WayDetails } from "@/app/@types";
import { FC } from "react";

interface WayInformationProps {
  item: WayDetails;
}

export const WayInformation: FC<WayInformationProps> = ({ item }) => {
  return (
    <Stacks direction="column" gap={20}>
      <Stacks direction="row" gap={10} justifyContent="space-between">
        <Stacks direction="row" gap={10}>
          <Typography color="default-black" variant="h1">
            Информация о рейсе:
          </Typography>
          <Typography color="info" variant="h1">
            {item.from.station} {item.id} - {item.to.station} {item.id}
          </Typography>
        </Stacks>
        <Button label="Отправить рейс" variant="primary" />
      </Stacks>

      <Box
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
        }}
      >
        <Stacks gap={50} direction="row" justifyContent="start">
          <Stacks gap={3} direction="column" alignItems="stretch">
            <Typography
              variant="h3"
              weight={300}
              color="default-black"
              style={{ marginTop: "10px" }}
            >
              {"Рейс:"}
            </Typography>
            <Box fullWidth={true} color="blue" style={{ borderRadius: "5px" }}>
              <Typography variant="h4" weight={600} color="default-white">
                {item.from.station} {item.id} - {item.to.station} {item.id}
              </Typography>
            </Box>
            <Typography
              variant="h3"
              weight={300}
              color="default-black"
              style={{ marginTop: "10px" }}
            >
              {"Маршрут:"}
            </Typography>
            <Box fullWidth={true} color="blue" style={{ borderRadius: "5px" }}>
              <Typography variant="h4" weight={600} color="default-white">
                {item.from.station} {item.id} - {item.to.station} {item.id}
              </Typography>
            </Box>
            <Typography
              variant="h3"
              weight={300}
              color="default-black"
              style={{ marginTop: "10px" }}
            >
              {"Расписание:"}
            </Typography>
            <Box fullWidth={true} color="blue" style={{ borderRadius: "5px" }}>
              <Typography variant="h4" weight={600} color="default-white">
                {item.from.station} {item.id} - {item.to.station} {item.id}
              </Typography>
            </Box>
          </Stacks>
          <Stacks gap={3} direction="column" alignItems="stretch">
            <Typography
              variant="h3"
              weight={300}
              color="default-black"
              style={{ marginTop: "10px" }}
            >
              {"Автобус:"}
            </Typography>

            <Stacks gap={10} direction="row" justifyContent="space-between">
              <Box fullWidth={true} color="blue" style={{ borderRadius: "5px" }}>
                <Typography variant="h4" weight={600} color="default-white">
                  {"Автобус"} {item.bus.free} места (Баг: {item.bus.bagPlace}; Стоя:{" "}
                  {item.bus.standPlace})
                </Typography>
              </Box>
              <Button label="Изменить" variant="tertiary" size="small" />
            </Stacks>

            <Stacks gap={3} direction="column" alignItems="start">
              <Typography
                variant="h3"
                weight={300}
                color="default-black"
                style={{ marginTop: "10px" }}
              >
                {"Гос. номер:"}
              </Typography>
              <Box fullWidth={false} color="blue" style={{ borderRadius: "5px" }}>
                <Typography variant="h4" weight={600} color="default-white">
                  {item.bus.busNumber}
                </Typography>
              </Box>
            </Stacks>

            <Typography
              variant="h3"
              weight={300}
              color="default-black"
              style={{ marginTop: "10px" }}
            >
              {"АТП:"}
            </Typography>
            <Stacks gap={10} direction="row" alignItems="center" justifyContent="space-between">
              <Box fullWidth={true} color="blue" style={{ borderRadius: "5px" }}>
                <Typography variant="h4" weight={600} color="default-white">
                  {item.bus.atpType}
                </Typography>
              </Box>
              <Button label="Изменить" variant="tertiary" size="small" />
            </Stacks>

            <Typography
              variant="h3"
              weight={300}
              color="default-black"
              style={{ marginTop: "10px" }}
            >
              {"Водители:"}
            </Typography>
            <Stacks gap={10} direction="row" justifyContent="space-between" alignItems="center">
              <Box fullWidth={true} color="blue" style={{ borderRadius: "5px" }}>
                <Typography variant="h4" weight={600} color="default-white">
                  {item.bus.driver}
                </Typography>
              </Box>
              <Button
                justifyContent="center"
                label={<RxCross2 />}
                size="icon"
                variant="tertiary"
                sizeIcon={36}
              />
            </Stacks>
            <Button
              label="+ добавить водителя"
              variant="tertiary"
              size="small"
              justifyContent="end"
            />
          </Stacks>
        </Stacks>
      </Box>

      <Box
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
        }}
      >
        <Stacks gap={60} direction="row" justifyContent="start">
          <Stacks gap={5} direction="column" alignItems="stretch">
            <Stacks gap={15} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" weight={300} color="default-black">
                {"Прибытие плановое:"}
              </Typography>
              <Stacks gap={5} direction="row" justifyContent="end" alignItems="center">
                <Typography variant="h1" weight={600} color="primary-second">
                  {"13:10"}
                </Typography>
                <Typography variant="h3" weight={500} color="primary">
                  {"26 авг"}
                </Typography>
              </Stacks>
            </Stacks>

            <Stacks gap={15} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" weight={300} color="default-black">
                {"Отправление плановое:"}
              </Typography>
              <Stacks gap={5} direction="row" justifyContent="end" alignItems="center">
                <Typography variant="h1" weight={600} color="primary-second">
                  {"13:10"}
                </Typography>
                <Typography variant="h3" weight={500} color="primary">
                  {"26 авг"}
                </Typography>
              </Stacks>
            </Stacks>

            <Stacks gap={15} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" weight={300} color="default-black">
                {"Обратное прибытие плановое:"}
              </Typography>
              <Stacks gap={5} direction="row" justifyContent="end" alignItems="center">
                <Typography variant="h1" weight={400} color="default-black">
                  {"13:10"}
                </Typography>
                <Typography variant="h3" weight={400} color="default-black">
                  {"26 авг"}
                </Typography>
              </Stacks>
            </Stacks>
          </Stacks>

          <Stacks gap={5} direction="column" alignItems="stretch">
            <Stacks gap={15} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" weight={300} color="default-black">
                {"Прибытие факт:"}
              </Typography>
              <Stacks gap={5} direction="row" justifyContent="end" alignItems="center">
                <Typography variant="h1" weight={600} color="primary-second">
                  {"13:10"}
                </Typography>
                <Typography variant="h3" weight={500} color="primary">
                  {"26 авг"}
                </Typography>
              </Stacks>
            </Stacks>

            <Stacks gap={15} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" weight={300} color="default-black">
                {"Отправление факт:"}
              </Typography>
              <Stacks gap={5} direction="row" justifyContent="end" alignItems="center">
                <Typography variant="h1" weight={600} color="primary-second">
                  {"13:10"}
                </Typography>
                <Typography variant="h3" weight={500} color="primary">
                  {"26 авг"}
                </Typography>
              </Stacks>
            </Stacks>

            <Stacks gap={15} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" weight={300} color="default-black">
                {"Обратное прибытие факт:"}
              </Typography>
              <Stacks gap={5} direction="row" justifyContent="end" alignItems="center">
                <Typography variant="h1" weight={400} color="default-black">
                  {"13:10"}
                </Typography>
                <Typography variant="h3" weight={400} color="default-black">
                  {"26 авг"}
                </Typography>
              </Stacks>
            </Stacks>
          </Stacks>
        </Stacks>
      </Box>

      {/* Block 3 - Status + Tickets information */}
      <Box
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
        }}
      >
        <Stacks gap={20} direction="row" justifyContent="space-between">
          <Stacks gap={5} direction="column" alignItems="stretch">
            <Stacks gap={10} direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h3" weight={300} color="default-black">
                {"Статус"}
              </Typography>
              <Chip size="small" variant="success" label={"Продажа"} />
            </Stacks>
            <Typography variant="h3" weight={300} color="default-black">
              {"Платформа"}
            </Typography>

            <Stacks gap={10} direction="row" justifyContent="space-between">
              <Box fullWidth={true} color="blue" style={{ borderRadius: "5px" }}>
                <Typography variant="h4" weight={600} color="default-white">
                  {"Объявят перед посадкой"}
                </Typography>
              </Box>
              <Button label="Изменить" variant="tertiary" size="small" />
            </Stacks>

            <Typography variant="h3" weight={300} color="default-black">
              {"Примечание"}
            </Typography>
            <Input fullWidth={true} color="default" value={""} placeholder="" />
          </Stacks>

          <Stacks gap={10} direction="column" alignItems="stretch">
            <Stacks gap={10} direction="row" alignItems="stretch">
              <Typography variant="h3" weight={300} color="default-black">
                {"Тип рейса:"}
              </Typography>
              <Typography variant="h3" weight={500} color="primary">
                {"Регулярный"}
              </Typography>
            </Stacks>

            <Stacks gap={20} direction="row" justifyContent="space-between">
              <Stacks gap={10} direction="column" justifyContent="space-between">
                <Typography variant="h3" weight={300} color="default-black">
                  {"Пассажирских билетов:"}
                </Typography>
                <Typography variant="h3" weight={300} color="default-black">
                  {"Багажных билетов:"}
                </Typography>
              </Stacks>
              <Stacks gap={10} direction="column" justifyContent="start">
                <Typography variant="h3" weight={600} color="primary-second">
                  {"8"}
                </Typography>
                <Typography variant="h3" weight={600} color="primary-second">
                  {"14"}
                </Typography>
              </Stacks>
              <Stacks gap={10} direction="column">
                <Typography variant="h3" weight={300} color="default-black">
                  {"На сумму:"}
                </Typography>
                <Typography variant="h3" weight={300} color="default-black">
                  {"На сумму:"}
                </Typography>
              </Stacks>
              <Stacks gap={10} direction="column">
                <Typography variant="h3" weight={600} color="primary">
                  {"3250,50 руб."}
                </Typography>
                <Typography variant="h3" weight={600} color="primary">
                  {"150,00 руб."}
                </Typography>
              </Stacks>
            </Stacks>
          </Stacks>
        </Stacks>
      </Box>
    </Stacks>
  );
};
