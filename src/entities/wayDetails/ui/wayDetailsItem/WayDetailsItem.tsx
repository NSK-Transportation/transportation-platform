/* eslint-disable @conarti/feature-sliced/layers-slices */
import { FC } from "react";
import { Location } from "@/entities/location";
import { Box, Chip, Stacks, Typography } from "@/shared/ui";
import { WayDetail } from "../../model/types/wayDetails.types";

interface WayMainItemProps {
  wayDetail: WayDetail;
  isSelected: boolean;
  onClick: () => void;
}

export const WayDetailsItem: FC<WayMainItemProps> = ({ wayDetail, isSelected, onClick }) => {
  const renderLocation = ({ city, street, house, station, time, date }: Location): JSX.Element => (
    <Stacks direction="column">
      <Stacks gap={4} alignItems="flex-end">
        <Typography variant="h1" weight={600} color="primary-second">
          {time || "00:00"}
        </Typography>
        <Typography variant="h3" weight={600} color="primary">
          {date || "0 месяц"}
        </Typography>
      </Stacks>
      <Stacks direction="column">
        <Typography variant="h3" color="secondary">
          г. {city?.rus || "Неизвестно"}
        </Typography>
        <Typography variant="h3" color="secondary">
          ст. {station?.rus || "Неизвестно"}
        </Typography>
        <Typography variant="h3" color="secondary">
          {street || "Неизвестно"}, {house || "0"}
        </Typography>
      </Stacks>
    </Stacks>
  );

  return (
    <Box
      variant={isSelected ? "solid" : "withoutShadow"}
      fullWidth
      cursor="pointer"
      padding={[8, 16, 8, 16]}
      hover
      onClick={onClick}
      disabled={wayDetail.status === "closed"}
    >
      <Stacks fullwidth gap={4} direction="column">
        <Stacks justifyContent="space-between">
          <Stacks gap={8}>
            <Typography variant="h3">Рейс №{wayDetail?.wayNumber}</Typography>
            <Typography variant="h3">
              {wayDetail?.from.city.rus} - {wayDetail?.to.city.rus}
            </Typography>
          </Stacks>
          <Typography color="secondary" variant="h4">
            Перевозчик: {wayDetail?.whoArive}
          </Typography>
        </Stacks>

        <Stacks fullwidth justifyContent="space-between">
          {renderLocation(wayDetail?.from)}
          {renderLocation(wayDetail?.to)}

          <Stacks direction="column" justifyContent="space-between">
            <Stacks direction="column">
              <Typography variant="h3" color="secondary">
                Свободно мест: {wayDetail?.seats?.length}
              </Typography>
              <Typography variant="h3" color="primary-second">
                Регулярный
              </Typography>
            </Stacks>
            <Typography variant="h3" color="secondary">
              В брони: {wayDetail?.seats.filter((seat) => seat.status === "booking").length}
            </Typography>
          </Stacks>

          <Stacks direction="column" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h1" color="primary-second">
              {wayDetail?.ticket.price} руб
            </Typography>
            <Chip
              size="small"
              label={
                <Typography variant="h4" color="primary" weight={600}>
                  {wayDetail.discounts.map((discount) => discount?.rus?.slice(0, 4)).join(" / ")}
                </Typography>
              }
              variant="outline-orange"
            />
            <Stacks gap={4}>
              <Typography variant="h3" color="secondary">
                Багаж
              </Typography>
              <Typography variant="h3" color="info">
                +{wayDetail?.baggage.price} руб
              </Typography>
            </Stacks>
          </Stacks>
        </Stacks>
      </Stacks>
    </Box>
  );
};
