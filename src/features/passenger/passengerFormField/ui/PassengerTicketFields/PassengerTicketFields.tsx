import { FC } from "react";
import { useDiscountStore } from "@/entities/discount";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { useTicketStore } from "@/entities/ticket";
import { Direction } from "@/shared/types";
import { Label, Select, Stacks, Input } from "@/shared/ui";

interface Props {
  passenger: Passenger;
  direction: Direction;
  onChange: (update: Partial<Passenger>) => void;
}

export const PassengerTicketFields: FC<Props> = ({ passenger, direction, onChange }) => {
  const {
    options: { tickets },
  } = useTicketStore();
  const {
    options: { discounts },
  } = useDiscountStore();
  const {
    options: { documents, privileges },
  } = usePassengerStore();

  return (
    <>
      <Label variant="h3" text="Тип билета">
        <Select
          placeholder="Выберите тип билета"
          options={tickets.map((ticket) => ({
            label: ticket.rus,
            value: ticket.type,
          }))}
          value={passenger?.ticket[direction]?.type}
          onChange={(event) =>
            onChange({
              ticket: {
                ...passenger.ticket,
                [direction]: {
                  ...passenger.ticket[direction],
                  ...tickets.find((ticket) => ticket.type === event.target.value),
                },
              },
            })
          }
        />
      </Label>

      <Label variant="h3" text="Багаж">
        <Input disabled readOnly placeholder="Выберите багаж" style={{ cursor: "pointer" }} />
      </Label>

      {passenger?.ticket[direction]?.type === "full" && (
        <>
          <Label variant="h3" text="Тип документа">
            <Select
              placeholder="Выберите тип документа"
              options={documents.map((document) => ({
                label: document.rus,
                value: document.type,
              }))}
              value={passenger.identification?.document?.type}
              onChange={(event) => {
                onChange({
                  identification: {
                    ...passenger.identification,
                    document: {
                      ...passenger.identification?.document,
                      ...documents.find((document) => document.type === event.target.value),
                    },
                  },
                });
              }}
            />
          </Label>
          <Stacks gap={16}>
            <Label variant="h3" text="Серия">
              <Input
                value={passenger.identification?.document?.series}
                placeholder="-- --"
                onChange={(event) =>
                  onChange({
                    identification: {
                      ...passenger.identification,
                      document: {
                        ...passenger.identification?.document,
                        series: event.target.value,
                      },
                    },
                  })
                }
              />
            </Label>
            <Label variant="h3" text="Номер ">
              <Input
                value={passenger.identification?.document?.number}
                placeholder="--- ---"
                onChange={(event) =>
                  onChange({
                    identification: {
                      ...passenger.identification,
                      document: {
                        ...passenger.identification?.document,
                        number: event.target.value,
                      },
                    },
                  })
                }
              />
            </Label>
          </Stacks>
        </>
      )}

      {passenger?.ticket[direction]?.type === "child" && (
        <>
          <Label variant="h3" text="Cкидка">
            <Select
              placeholder="Выберите скидку"
              options={discounts.child.map((document) => ({
                label: document.rus,
                value: document.type,
              }))}
              value={passenger.ticket[direction]?.discount?.type}
              onChange={(event) => {
                onChange({
                  ticket: {
                    ...passenger.ticket,
                    [direction]: {
                      ...passenger.ticket[direction],
                      discount: {
                        ...passenger.ticket[direction]?.discount,
                        ...discounts.child.find((document) => document.type === event.target.value),
                      },
                    },
                  },
                });
              }}
            />
          </Label>
          <Label variant="h3" text="Свидетельство о рождении">
            <Stacks gap={16}>
              <Input
                placeholder="Серия"
                value={passenger.identification?.child?.series}
                onChange={(event) => {
                  onChange({
                    identification: {
                      ...passenger.identification,
                      child: {
                        ...passenger.identification?.child,
                        series: event.target.value,
                      },
                    },
                  });
                }}
              />
              <Input
                placeholder="Номер"
                value={passenger.identification?.child?.number}
                onChange={(event) => {
                  onChange({
                    identification: {
                      ...passenger.identification,
                      child: {
                        ...passenger.identification?.child,
                        number: event.target.value,
                      },
                    },
                  });
                }}
              />
            </Stacks>
          </Label>
        </>
      )}

      {passenger?.ticket[direction]?.type === "discount" && (
        <>
          <Label variant="h3" text="Cкидка">
            <Select
              placeholder="Выберите скидку"
              options={discounts.main.map((document) => ({
                label: document.rus,
                value: document.type,
              }))}
              value={passenger.ticket[direction]?.discount?.type}
              onChange={(event) => {
                onChange({
                  ticket: {
                    ...passenger.ticket,
                    [direction]: {
                      ...passenger.ticket[direction],
                      discount: {
                        ...passenger.ticket[direction]?.discount,
                        ...discounts.main.find((document) => document.type === event.target.value),
                      },
                    },
                  },
                });
              }}
            />
          </Label>
          <Label
            variant="h3"
            text={
              passenger.ticket[direction]?.discount?.type === "student"
                ? "Номер студенческого"
                : "Номер справки"
            }
          >
            <Input
              placeholder="Введите номер"
              value={
                passenger.ticket[direction]?.discount?.type === "student"
                  ? passenger.identification?.student?.number
                  : passenger.identification?.military?.number
              }
              onChange={(event) =>
                onChange({
                  identification: {
                    ...passenger.identification,
                    ...(passenger.ticket[direction]?.discount?.type === "student"
                      ? { student: { number: event.target.value } }
                      : { military: { number: event.target.value } }),
                  },
                })
              }
            />
          </Label>
        </>
      )}

      {passenger?.ticket[direction]?.type === "privilege" && (
        <>
          <Label variant="h3" text="Тип льготы">
            <Select
              placeholder="Нет льготы"
              options={privileges?.map((privilege) => ({
                label: privilege.rus,
                value: privilege.type,
              }))}
              value={passenger.identification?.privilege?.type}
              onChange={(event) => {
                onChange({
                  identification: {
                    ...passenger.identification,
                    privilege: {
                      ...passenger.identification?.privilege,
                      ...privileges?.find((privilege) => privilege.type === event.target.value),
                    },
                  },
                });
              }}
            />
          </Label>
          <Label variant="h3" text="Документ на право льготы">
            <Stacks gap={16}>
              <Input
                value={passenger.identification?.privilege?.series}
                placeholder="Серия"
                onChange={(event) => {
                  onChange({
                    identification: {
                      ...passenger.identification,
                      privilege: {
                        ...passenger.identification?.privilege,
                        series: event.target.value,
                      },
                    },
                  });
                }}
              />
              <Input
                value={passenger.identification?.privilege?.number}
                placeholder="Номер"
                onChange={(event) => {
                  onChange({
                    identification: {
                      ...passenger.identification,
                      privilege: {
                        ...passenger.identification?.privilege,
                        number: event.target.value,
                      },
                    },
                  });
                }}
              />
            </Stacks>
          </Label>
        </>
      )}
    </>
  );
};
