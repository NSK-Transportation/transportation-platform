import {
  Box,
  Chip,
  Divider,
  Grid,
  Input,
  Label,
  RadioGroup,
  Select,
  Stacks,
  Typography,
} from "@/shared/ui";
import { useMainStore } from "../../../MainPanel.store";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { BaggageType, DocumentType, Passenger, PrivilegeType, TicketType } from "@/app/@types";

export const PassengerInfoItem = () => {
  const {
    activeWay,
    tickets,
    discounts,
    baggages,
    documents,
    privileges,
    passengers,
    setPassenger,
  } = useMainStore((state) => state.saleTicket);
  const navigate = useNavigate();
  console.log(activeWay)
  useEffect(() => {
    if (!activeWay || passengers.length === 0) {
      navigate(
        {
          pathname: "/home/sale-ticket",
          search: "?step=1",
        },
        { replace: true },
      );
      navigate(0);
    }
  }, [activeWay, passengers, navigate]);

  if (!activeWay || passengers.length === 0) {
    return <Typography variant="h3">Маршрут или пассажиры не найдены</Typography>;
  }

  const renderInputFields = (passengersInfo: Passenger, additionalFields: ReactNode) => (
    <>
      {additionalFields}
      <Label variant="h3" text="Фамилия">
        <Input
          value={passengersInfo.lastName}
          onChange={(event) => setPassenger(passengersInfo.id, { lastName: event.target.value })}
          placeholder="Например, Плеханова"
        />
      </Label>
      <Label variant="h3" text="Имя">
        <Input
          value={passengersInfo.firstName}
          onChange={(event) => setPassenger(passengersInfo.id, { firstName: event.target.value })}
          placeholder="Например, Татьяна"
        />
      </Label>
      <Label variant="h3" text="Отчество">
        <Input
          value={passengersInfo.patronymic}
          placeholder="Например, Фёдоровна"
          onChange={(event) => setPassenger(passengersInfo.id, { patronymic: event.target.value })}
        />
      </Label>
      <Label variant="h3" text="Дата рождения">
        <Input
          type="date"
          value={passengersInfo.birthday}
          onChange={(event) => setPassenger(passengersInfo.id, { birthday: event.target.value })}
        />
      </Label>
      <Label variant="h3" text="Телефон">
        <Input
          value={passengersInfo.phone}
          placeholder="+ 7 (---) --- -- --"
          onChange={(event) => setPassenger(passengersInfo.id, { phone: event.target.value })}
        />
      </Label>
      <Label variant="h3" text="Пол">
        <RadioGroup
          direction="row"
          name="gender"
          radios={[
            { value: "men", title: "Мужской" },
            { value: "women", title: "Женский" },
          ]}
          selected={passengersInfo.gender || ""}
          onChange={(value) =>
            setPassenger(passengersInfo.id, {
              gender: value as "men" | "women",
            })
          }
        />
      </Label>
    </>
  );

  const renderPassengersInfo = (seatId: number) => {
    const passengersInfo = passengers.find((p) => p.ticket?.seatId === seatId);
    if (!passengersInfo) return null;

    return (
      <Box key={seatId}>
        <Stacks fullwidth direction="column" gap={16}>
          <Stacks gap={8}>
            <Typography variant="h3">Данные пассажира</Typography>
            <Chip size="small" variant="primary" label={`Место ${seatId}`} />
          </Stacks>
          <Stacks alignItems="center" fullwidth direction="column" gap={16}>
            <Box
              fullWidth
              style={{
                boxShadow: "none",
                padding: 0,
              }}
            >
              <Stacks fullwidth direction="column" gap={16}>
                <Grid container fullwidth gap={16}>
                  <Label variant="h3" text="Тип билета">
                    <Select
                      placeholder="Выберите тип билета"
                      options={tickets.map((ticket) => ({
                        label: ticket.rus,
                        value: ticket.type,
                      }))}
                      value={passengersInfo?.ticket?.type}
                      onChange={(event) =>
                        setPassenger(passengersInfo.id, {
                          ticket: {
                            ...passengersInfo.ticket,
                            type: event.target.value as TicketType,
                          },
                        })
                      }
                    />
                  </Label>

                  <Label variant="h3" text="Багажный билет">
                    <Select
                      placeholder="Выберите багаж"
                      options={baggages.map((baggage) => ({
                        label: baggage.rus,
                        value: baggage.type,
                      }))}
                      value={passengersInfo?.ticket?.baggage?.type}
                      onChange={(event) => {
                        setPassenger(passengersInfo.id, {
                          ticket: {
                            ...passengersInfo.ticket,
                            baggage: baggages.find(
                              (baggage) => baggage.type === (event.target.value as BaggageType),
                            ),
                          },
                        });
                      }}
                    />
                  </Label>
                </Grid>

                {passengersInfo?.ticket?.type === "discount" && (
                  <>
                    <Divider />
                    <Typography variant="h3">Выберите скидку</Typography>
                    <Stacks gap={8}>
                      {discounts?.discount?.map((discount) => (
                        <Chip
                          key={discount.id}
                          selected={passengersInfo.ticket?.discount?.id === discount.id}
                          onClick={() =>
                            setPassenger(passengersInfo.id, {
                              ticket: {
                                ...passengersInfo.ticket,
                                discount: {
                                  ...passengersInfo.ticket.discount,
                                  id: discount.id,
                                  rus: discount.rus,
                                  value: discount.value,
                                  type: discount.type,
                                },
                              },
                            })
                          }
                          size="extra-large"
                          variant="outline"
                          label={`${discount.rus} ${discount.value}%`}
                        />
                      ))}
                      <Chip size="extra-large" label="+ Добавить скидку" />
                    </Stacks>
                    {passengersInfo?.ticket.discount?.id === 1 && (
                      <Grid container columns="repeat(2, 1fr)" gap={16}>
                        {renderInputFields(
                          passengersInfo,
                          <>
                            <Label variant="h3" text="Номер студенческого">
                              <Input
                                placeholder="Введите номер"
                                value={passengersInfo.identification?.studentTicketNumber}
                                onChange={(event) =>
                                  setPassenger(passengersInfo.id, {
                                    identification: {
                                      ...passengersInfo.identification,
                                      studentTicketNumber: event.target.value,
                                    },
                                  })
                                }
                              />
                            </Label>
                          </>,
                        )}
                      </Grid>
                    )}
                    {passengersInfo?.ticket.discount?.id === 2 && (
                      <Grid container columns="repeat(2, 1fr)" gap={16}>
                        {renderInputFields(
                          passengersInfo,
                          <>
                            <Label variant="h3" text="Номер справки">
                              <Input
                                placeholder="Введите номер"
                                value={passengersInfo.identification?.militaryCertificateNumber}
                                onChange={(event) =>
                                  setPassenger(passengersInfo.id, {
                                    identification: {
                                      ...passengersInfo.identification,
                                      militaryCertificateNumber: event.target.value,
                                    },
                                  })
                                }
                              />
                            </Label>
                          </>,
                        )}
                      </Grid>
                    )}
                  </>
                )}

                {passengersInfo?.ticket?.type === "privilege" && (
                  <>
                    <Divider />
                    <Grid container columns="repeat(2, 1fr)" gap={16}>
                      <Label variant="h3" text="Тип льготы">
                        <Select
                          placeholder="Нет льготы"
                          options={
                            privileges?.map((privilege) => ({
                              label: privilege.rus,
                              value: privilege.type,
                            })) ?? []
                          }
                          value={passengersInfo.identification?.privilege?.type}
                          onChange={(event) => {
                            setPassenger(passengersInfo.id, {
                              identification: {
                                ...passengersInfo.identification,
                                privilege: privileges.find(
                                  (privilege) =>
                                    privilege.type === (event.target.value as PrivilegeType),
                                ),
                              },
                            });
                          }}
                        />
                      </Label>
                      <Label variant="h3" text="Документ на право льготы">
                        <Stacks gap={16}>
                          <Input
                            value={passengersInfo.identification?.series}
                            placeholder="-- --"
                            onChange={(event) =>
                              setPassenger(passengersInfo.id, {
                                identification: {
                                  ...passengersInfo.identification,
                                  series: event.target.value,
                                },
                              })
                            }
                          />
                          <Input
                            value={passengersInfo.identification?.number}
                            placeholder="--- ---"
                            onChange={(e) =>
                              setPassenger(passengersInfo.id, {
                                identification: {
                                  ...passengersInfo?.identification,
                                  number: e.target.value,
                                },
                              })
                            }
                          />
                        </Stacks>
                      </Label>

                      {renderInputFields(passengersInfo, null)}
                    </Grid>
                  </>
                )}

                {passengersInfo?.ticket?.type === "full" && (
                  <>
                    <Divider />
                    <Grid container columns="repeat(2, 1fr)" gap={16}>
                      <Label variant="h3" text="Тип документа">
                        <Select
                          placeholder="Выберите тип документа"
                          options={documents?.map((document) => ({
                            label: document.rus,
                            value: document.type,
                          }))}
                          value={passengersInfo.identification?.document?.type}
                          onChange={(event) => {
                            setPassenger(passengersInfo.id, {
                              identification: {
                                ...passengersInfo.identification,
                                document: documents?.find(
                                  (document) =>
                                    document.type === (event.target.value as DocumentType),
                                ),
                              },
                            });
                          }}
                        />
                      </Label>
                      <Stacks gap={16}>
                        <Label variant="h3" text="Серия документа">
                          <Input
                            value={passengersInfo.identification?.series}
                            placeholder="-- --"
                            onChange={(e) =>
                              setPassenger(passengersInfo.id, {
                                identification: {
                                  ...passengersInfo.identification,
                                  series: e.target.value,
                                },
                              })
                            }
                          />
                        </Label>
                        <Label variant="h3" text="Номер документа">
                          <Input
                            value={passengersInfo.identification?.number}
                            placeholder="--- ---"
                            onChange={(e) =>
                              setPassenger(passengersInfo.id, {
                                identification: {
                                  ...passengersInfo.identification,
                                  number: e.target.value,
                                },
                              })
                            }
                          />
                        </Label>
                      </Stacks>
                      {renderInputFields(passengersInfo, null)}
                    </Grid>
                  </>
                )}

                {passengersInfo?.ticket?.type === "child" && (
                  <>
                    <Divider />
                    <Typography variant="h3">Выберите скидку</Typography>
                    <Stacks gap={8}>
                      {discounts?.child?.map((discount) => (
                        <Chip
                          key={discount.id}
                          selected={passengersInfo.ticket?.discount?.id === discount.id}
                          onClick={() =>
                            setPassenger(passengersInfo.id, {
                              ticket: {
                                ...passengersInfo.ticket,
                                discount: {
                                  ...passengersInfo.ticket.discount,
                                  id: discount.id,
                                  rus: discount.rus,
                                  value: discount.value,
                                  type: discount.type,
                                },
                              },
                            })
                          }
                          size="extra-large"
                          variant="outline"
                          label={`${discount.rus} ${discount.value}%`}
                        />
                      ))}
                    </Stacks>
                    <Grid container columns="repeat(2, 1fr)" gap={16}>
                      <Label variant="h3" text="Свидетельство о рождении">
                        <Stacks gap={16}>
                          <Input
                            placeholder="Серия"
                            value={passengersInfo.identification?.birthCertificateSeries}
                            onChange={(event) =>
                              setPassenger(passengersInfo.id, {
                                identification: {
                                  ...passengersInfo.identification,
                                  birthCertificateSeries: event.target.value,
                                },
                              })
                            }
                          />
                          <Input
                            placeholder="Номер"
                            value={passengersInfo.identification?.birthCertificateNumber}
                            onChange={(event) =>
                              setPassenger(passengersInfo.id, {
                                identification: {
                                  ...passengersInfo.identification,
                                  birthCertificateNumber: event.target.value,
                                },
                              })
                            }
                          />
                        </Stacks>
                      </Label>
                      {renderInputFields(passengersInfo, null)}
                    </Grid>
                  </>
                )}
              </Stacks>
            </Box>
          </Stacks>
        </Stacks>
      </Box>
    );
  };

  return <>{activeWay && activeWay.seatsSelected.map((seatId) => renderPassengersInfo(seatId))}</>;
};
