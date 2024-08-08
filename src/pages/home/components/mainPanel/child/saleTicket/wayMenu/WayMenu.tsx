/**
 * Компонент WayMenu
 *
 * Компонент для выбора рейса, который позволяет пользователю выбрать дату, станцию отправления и станцию прибытия.
 * Также предоставляет возможность включения или отключения обратного билета.
 *
 * @returns {JSX.Element} Отображает форму для выбора рейса и кнопку для поиска рейсов.
 */

import { Box, Button, Input, InputGroup, Stacks, Typography } from "@/shared/ui";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMainStore } from "../../../MainPanel.store";

interface WayMenuProps {
  returnWay?: boolean;
}

export const WayMenu = ({ returnWay }: WayMenuProps) => {
  const {
    saleTicket: { way, setWay },
  } = useMainStore();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWay({
      ...way,
      ...(returnWay ? { return: { ...way.return, [name]: value } } : { [name]: value }),
    });
  };

  const handleClick = () => {
    // TODO: Сделать запрос на сервер
    console.log(way);
  };

  return (
    <>
      <Box color="blue">
        <Stacks fullwidth direction="column" gap={8}>
          <Typography variant="h3" color="default-white">
            {returnWay ? "Выберите обратный рейс" : "Выберите рейс"}
          </Typography>
          <InputGroup fullWidth>
            {/* TODO: Добавить Datepicker */}
            <Input
              name="date"
              type="date"
              value={returnWay ? way.return?.date : way.date}
              onChange={handleChange}
              key="1"
              placeholder="Дата отправления"
            />{" "}
            <Input
              name="from"
              type="text"
              value={returnWay ? way.return?.from : way.from}
              onChange={handleChange}
              key="2"
              placeholder="Станция отправления"
            />
            <Input
              name="to"
              type="text"
              value={returnWay ? way.return?.to : way.to}
              onChange={handleChange}
              key="3"
              placeholder="Станция прибытия"
            />
          </InputGroup>

          <Stacks justifyContent="flex-end">
            <Link to={"?step=1"} onClick={() => setWay({ ...way, returnHave: !way.returnHave })}>
              <Typography variant="h3" color="default-white">
                {way.returnHave ? "-" : "+"} Обратный билет
              </Typography>
            </Link>
          </Stacks>
        </Stacks>

        <Stacks fullwidth justifyContent="center">
          <Button onClick={handleClick} label="Искать" />
        </Stacks>
      </Box>
    </>
  );
};
