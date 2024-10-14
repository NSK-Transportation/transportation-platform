import _ from "lodash";
import { FC, ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDiscountStore } from "@/entities/discount";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { useTicketStore } from "@/entities/ticket";
import { Direction } from "@/shared/types";
import { Label, Select, Stacks, Input } from "@/shared/ui";

interface Props {
  passenger: Passenger;
  direction: Direction;
  onChange: (update: Partial<Passenger>) => void;
  setFormComplete: (isComplete: boolean) => void;
  addBaggage: ReactNode;
}

export const PassengerTicketFields: FC<Props> = ({
  passenger,
  direction,
  onChange,
  setFormComplete,
  addBaggage,
}) => {
  const {
    options: { tickets },
  } = useTicketStore();
  const {
    options: { discounts },
  } = useDiscountStore();
  const {
    options: { documents, privileges },
  } = usePassengerStore();

  const { register, trigger } = useForm<Passenger>({
    defaultValues: passenger,
    mode: "all",
  });

  const isTicketFormComplete = (passenger: Passenger, direction: Direction): boolean => {
    const ticket = passenger.ticket[direction];
    if (!ticket?.type) return false;

    // Если выбран полный билет, проверяем документ
    if (ticket.type === "full") {
      return (
        !!passenger.identification?.document?.type &&
        !!passenger.identification?.document?.series &&
        !!passenger.identification?.document?.number
      );
    }

    // Если детский билет
    if (ticket.type === "child") {
      return (
        !!ticket.discount?.type &&
        !!passenger.identification?.child?.series &&
        !!passenger.identification?.child?.number
      );
    }

    // Если скидочный билет
    if (ticket.type === "discount") {
      return (
        !!ticket.discount?.type &&
        !!(passenger.identification?.student?.number || passenger.identification?.military?.number)
      );
    }

    // Если льготы
    if (ticket.type === "privilege") {
      return (
        !!passenger.identification?.privilege?.type &&
        !!passenger.identification?.privilege?.series &&
        !!passenger.identification?.privilege?.number
      );
    }

    return true;
  };

  useEffect(() => {
    const completeStatus = isTicketFormComplete(passenger, direction);
    setFormComplete(completeStatus);
  }, [direction, passenger, setFormComplete]);

  const handleFieldChange = (field: string, value: unknown) => {
    const clonedPassenger = _.cloneDeep(passenger);
    const updatedPassenger = _.merge(clonedPassenger, _.set({}, field, value));
    onChange(updatedPassenger);
    trigger(field as keyof Passenger, { shouldFocus: true });
  };

  return (
    <>
      <Label variant="h3" text="Тип билета" required>
        <Select
          {...register(`ticket.${direction}.type`)}
          value={passenger.ticket[direction]?.type}
          placeholder="Выберите тип билета"
          options={tickets.map((ticket) => ({
            label: ticket.rus,
            value: ticket.type,
          }))}
          onChange={(event) =>
            handleFieldChange(
              `ticket.${direction}`,
              tickets.find((ticket) => ticket.type === event.target.value),
            )
          }
        />
      </Label>

      <Label variant="h3" text="Багаж">
        <Stacks fullheight alignItems="center" justifyContent="center">
          {addBaggage}
        </Stacks>
      </Label>

      {passenger?.ticket[direction]?.type === "full" && (
        <>
          <Label variant="h3" text="Тип документа" required>
            <Select
              {...register("identification.document.type")}
              value={passenger.identification?.document?.type}
              placeholder="Выберите тип документа"
              options={documents.map((document) => ({
                label: document.rus,
                value: document.type,
              }))}
              onChange={(event) =>
                handleFieldChange(
                  "identification.document",
                  documents.find((document) => document.type === event.target.value),
                )
              }
            />
          </Label>
          <Stacks gap={16}>
            <Label variant="h3" text="Серия" required>
              <Input
                {...register("identification.document.series")}
                placeholder="-- --"
                onChange={(event) =>
                  handleFieldChange("identification.document.series", event.target.value)
                }
              />
            </Label>
            <Label variant="h3" text="Номер" required>
              <Input
                {...register("identification.document.number")}
                placeholder="--- ---"
                onChange={(event) =>
                  handleFieldChange("identification.document.number", event.target.value)
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
              {...register(`ticket.${direction}.discount.type`)}
              value={passenger.ticket[direction].discount?.type}
              placeholder="Выберите скидку"
              options={discounts.child.map((document) => ({
                label: document.rus,
                value: document.type,
              }))}
              onChange={(event) =>
                handleFieldChange(
                  `ticket.${direction}.discount`,
                  discounts.child.find((discount) => discount.type === event.target.value),
                )
              }
            />
          </Label>
          <Label variant="h3" text="Свидетельство о рождении" required>
            <Stacks gap={16}>
              <Input
                {...register("identification.child.series")}
                placeholder="Серия"
                onChange={(event) =>
                  handleFieldChange("identification.child.series", event.target.value)
                }
              />
              <Input
                {...register("identification.child.number")}
                placeholder="Номер"
                onChange={(event) =>
                  handleFieldChange("identification.child.number", event.target.value)
                }
              />
            </Stacks>
          </Label>
        </>
      )}

      {passenger?.ticket[direction]?.type === "discount" && (
        <>
          <Label variant="h3" text="Cкидка" required>
            <Select
              {...register(`ticket.${direction}.discount.type`)}
              value={passenger.ticket[direction].discount?.type}
              placeholder="Выберите скидку"
              options={discounts.main.map((document) => ({
                label: document.rus,
                value: document.type,
              }))}
              onChange={(event) =>
                handleFieldChange(
                  `ticket.${direction}.discount`,
                  discounts.main.find((discount) => discount.type === event.target.value),
                )
              }
            />
          </Label>
          <Label
            variant="h3"
            text={
              passenger.ticket[direction]?.discount?.type === "student"
                ? "Номер студенческого"
                : "Номер справки"
            }
            required
          >
            <Input
              {...register(
                passenger.ticket[direction]?.discount?.type === "student"
                  ? "identification.student.number"
                  : "identification.military.number",
              )}
              placeholder="Введите номер"
              onChange={(event) =>
                handleFieldChange(
                  passenger.ticket[direction]?.discount?.type === "student"
                    ? "identification.student.number"
                    : "identification.military.number",
                  event.target.value,
                )
              }
            />
          </Label>
        </>
      )}

      {passenger?.ticket[direction]?.type === "privilege" && (
        <>
          <Label variant="h3" text="Тип льготы" required>
            <Select
              {...register("identification.privilege.type")}
              value={passenger.identification?.privilege?.type}
              placeholder="Нет льготы"
              options={privileges?.map((privilege) => ({
                label: privilege.rus,
                value: privilege.type,
              }))}
              onChange={(event) =>
                handleFieldChange(
                  "identification.privilege",
                  privileges.find((privilege) => privilege.type === event.target.value),
                )
              }
            />
          </Label>
          <Label variant="h3" text="Документ на право льготы" required>
            <Stacks gap={16}>
              <Input
                {...register("identification.privilege.series")}
                placeholder="Серия"
                onChange={(event) =>
                  handleFieldChange("identification.privilege.series", event.target.value)
                }
              />
              <Input
                {...register("identification.privilege.number")}
                placeholder="Номер"
                onChange={(event) =>
                  handleFieldChange("identification.privilege.number", event.target.value)
                }
              />
            </Stacks>
          </Label>
        </>
      )}
    </>
  );
};
