import React, { useState } from 'react';
import { Box, Stacks, Typography, Button } from "@/shared/ui";
import { BaggageAdd, BaggageDelete } from "@/shared/assets";

export const InfoAboutBaggage = () => {
  // Начальное количество мест для багажа
  const initialBaggageSlots = 3;
  const fare = 270;

  // Используем состояние для отслеживания оставшихся мест для багажа
  const [availableBaggageSlots, setAvailableBaggageSlots] = useState(initialBaggageSlots);

  // Используем состояние для отслеживания количества добавленного багажа
  const [baggageCount, setBaggageCount] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Функция для добавления багажа
  const addBaggage = () => {
    if (baggageCount.length < 2 && availableBaggageSlots > 0) {
      setBaggageCount([...baggageCount, baggageCount.length]);
      setAvailableBaggageSlots(availableBaggageSlots - 1);
    }
  };

  // Функция для удаления багажа
  const removeBaggage = (index: number) => {
    setBaggageCount(baggageCount.filter((_, i) => i !== index));
    setAvailableBaggageSlots(availableBaggageSlots + 1);
  };

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography weight="bold" variant="h3">
          Добавить багаж
        </Typography>

        <Stacks direction="column">
          <Typography weight="normal" variant="h3">
            Доступно мест для багажа: <Typography color='primary-second'>{availableBaggageSlots}</Typography>
          </Typography>

          <Typography weight="normal" variant="h3">
            Тариф: <Typography color='primary-second'>{fare} руб</Typography>
          </Typography>

          <Stacks>
            {/* Отображаем иконки багажа, если они были добавлены */}
            {baggageCount.map((_, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => removeBaggage(index)}
                style={{ cursor: 'pointer' }}
              >
                {hoveredIndex === index ? (
                  <BaggageDelete size={40} />
                ) : (
                  <BaggageAdd size={40} />
                )}
              </div>
            ))}
            {/* Кнопка "+" для добавления багажа отображается только если есть свободные места */}
            {baggageCount.length < 2 && availableBaggageSlots > 0 && (
              <Button variant="free" size="icon" label="+" onClick={addBaggage} />
            )}
          </Stacks>
        </Stacks>
      </Stacks>
    </Box>
  );
};
