import { useMutation } from "react-query";
import { useBaggageStore } from "@/entities/baggage";
import { postBaggage } from "@/entities/baggage";
// import { BaggageAddIcon, BaggageDeleteIcon } from "@/shared/assets";
import { Box, Stacks, Typography, Button, Divider } from "@/shared/ui";

export const AddBaggage = () => {
  const { baggage, removeBaggage, addBaggage } = useBaggageStore();

  const { mutateAsync, isFetching } = useMutation((data) => postBaggage(data), {
    onSuccess: (data) => {
      setAuth({ isAuth: true });
      console.log("Успешный вход в систему", data);
    },
    onError: (error) => {
      console.error("Ошибка при входе в систему", error);
    },
  });

  return (
    <>
      <Box>
        <Stacks fullwidth direction="column" gap={16}>
          <Typography weight="bold" variant="h3">
            Добавить багаж
          </Typography>
          <Stacks gap={16}>
            <Divider orientation="vertical" color="blue" />
            <Stacks direction="column">
              <Stacks direction="row" gap={4}>
                <Typography variant="h3">Доступно мест для багажа: </Typography>
                <Typography variant="h3" color="primary-second">
                  {baggage.available}
                </Typography>
              </Stacks>
              <Stacks direction="row" gap={4}>
                <Typography variant="h3">Тариф: </Typography>
                <Typography variant="h3" color="primary-second">
                  {baggage.price}
                </Typography>
              </Stacks>
              <Stacks direction="row" gap={4}>
                <Typography variant="h3">Выбрано багажа: </Typography>
                <Typography variant="h3" color="primary-second">
                  {baggage.count}
                </Typography>
              </Stacks>
              <Stacks>
                <Button
                  fullWidth
                  disabled={baggage.count <= 0}
                  size="icon"
                  label="-"
                  onClick={removeBaggage}
                />
                <Button
                  fullWidth
                  disabled={baggage.count >= baggage.available}
                  size="icon"
                  label="+"
                  onClick={addBaggage}
                />
              </Stacks>
            </Stacks>
          </Stacks>
        </Stacks>
      </Box>
      <Stacks justifyContent="flex-end">
        <Button label="Добавить" loading={isFetching} />
      </Stacks>
    </>
  );
};
