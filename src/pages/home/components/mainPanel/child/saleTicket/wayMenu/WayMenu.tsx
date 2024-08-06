/**
 * Выбор рейса
 */

import { Box, Button, Input, InputGroup, Stacks, Typography } from "@/shared/ui";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMainStore } from "../../../MainPanel.store";

export const WayMenu = () => {
  const {
    saleTicket: { way, setWay, returnWay },
  } = useMainStore();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWay({ ...way, [name]: value });
  };

  const handleClick = () => {
    // TODO: Сделать запрос на сервер
    console.log(way);
  };

  return (
    <Box color="blue">
      <Stacks fullwidth direction="column" gap={8}>
        <Typography variant="h3" color="default-white">
          Выбор рейса
        </Typography>
        <InputGroup fullWidth>
          {/* TODO: Добавить Datepicker */}
          <Input
            name="date"
            type="date"
            value={way.date}
            onChange={handleChange}
            key="1"
            placeholder="Дата отправления"
          />{" "}
          <Input
            name="from"
            type="text"
            value={way.from}
            onChange={handleChange}
            key="2"
            placeholder="Станция отправления"
          />
          <Input
            name="to"
            type="text"
            value={way.to}
            onChange={handleChange}
            key="3"
            placeholder="Станция прибытия"
          />
        </InputGroup>

        <Stacks justifyContent="flex-end">
          <Link to={"?step=1"} onClick={() => (returnWay.have = !returnWay.have)}>
            <Typography variant="h3" color="default-white">
              {returnWay.have ? "-" : "+"} Обратный билет
            </Typography>
          </Link>
        </Stacks>
      </Stacks>
      <Stacks fullwidth justifyContent="center">
        <Button onClick={handleClick} label="Искать" />
      </Stacks>
    </Box>
  );
};
