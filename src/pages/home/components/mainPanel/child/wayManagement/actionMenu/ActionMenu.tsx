import { Box, Button, Stacks } from "@/shared/ui";

export const ActionMenu = () => {
    return (
        <Stacks direction="row" gap={20}>
            <Box border={"default"} >
                <Stacks direction="row" gap={20}>
                    <Button label="Отменить рейс" justifyContent="start" variant="tertiary" />
                    <Button label="Начать / закончить посадку" justifyContent="start" variant="tertiary" />
                    <Button label="Отменить рейс" justifyContent="start" variant="tertiary" />
                    <Button label="Пересадка пассажиров" justifyContent="start" variant="tertiary" />
                    <Button label="Отметить обратное прибытие" justifyContent="start" variant="tertiary" />
                </Stacks >
            </Box>
            <Button label="Добавить рейс" justifyContent="start" variant="primary" />
        </Stacks >
    );
};