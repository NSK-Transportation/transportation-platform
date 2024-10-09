import { axiosInstance } from "@/shared/api/axiosInstance";
import { Document, Passenger } from "../model/types/passenger.types";

// export const getPassenger = async ({ series, number }: Document) => {
//   const response = await axiosInstance.get<Passenger>(`/passengers`, {
//     params: {
//       series,
//       number,
//     },
//   });

//   return response.data;
// };

// MOCK
export const getPassenger = async (document: Document): Promise<Passenger> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockPassenger: Passenger = {
        id: 1,
        firstName: "Иван",
        lastName: "Иванов",
        patronymic: "Иванович",
        gender: "male",
        birthday: "2003-19-02",
        phone: {
          code: "+7",
          number: "123456789",
          refusalToProvide: false,
        },
        identification: {
          document: {
            series: "1111",
            number: "111111",
          },
        },
        ticket: {
          there: {
            seatId: 1,
            wayDetail: {
              id: 1,
              wayNumber: "1",
              whoArive: "Константинопольский",
              status: "sale",
              ticket: {
                price: 2000,
              },
              baggage: {
                price: 200,
                count: 10,
                available: 10,
              },
              discounts: [],
              seats: [
                {
                  id: 1,
                  status: "free",
                  price: 0,
                  tariff: 0,
                  duty: 0,
                  saleDate: "",
                  saleTime: "",
                  whoSold: "",
                },
                {
                  id: 2,
                  status: "free",
                  price: 0,
                  tariff: 0,
                  duty: 0,
                  saleDate: "",
                  saleTime: "",
                  whoSold: "",
                },
                {
                  id: 3,
                  status: "free",
                  price: 0,
                  tariff: 0,
                  duty: 0,
                  saleDate: "",
                  saleTime: "",
                  whoSold: "",
                },
                {
                  id: 4,
                  status: "free",
                  price: 0,
                  tariff: 0,
                  duty: 0,
                  saleDate: "",
                  saleTime: "",
                  whoSold: "",
                },
                {
                  id: 5,
                  status: "free",
                  price: 0,
                  tariff: 0,
                  duty: 0,
                  saleDate: "",
                  saleTime: "",
                  whoSold: "",
                },
              ],
              from: {
                date: "10.10.2024",
                city: {
                  name: "Novosibirsk",
                  rus: "Новосибирск",
                  stations: [],
                },
                house: "2",
                station: {
                  name: "Railway",
                  rus: "Железнодорожная",
                },
                street: "ул. Петрова",
                time: "10:00",
              },
              to: {
                date: "12.10.2024",
                city: {
                  name: "Krasnoyrsk",
                  rus: "Новосибирск",
                  stations: [],
                },
                house: "2",
                station: {
                  name: "Railway",
                  rus: "Железнодорожная",
                },
                street: "ул. Петрова",
                time: "10:00",
              },
              vehicle: {
                id: 1,
                name: "Автобус",
                atp: "",
                driver: "",
                licensePlate: "",
                type: "bus",
              },
            },
            id: 1,
            type: "full",
            rus: "Полный",
            discount: null,
            baggage: null,
            payment: null,
            cashier: null,
            saleDate: "",
            saleTime: "",
            refund: null,
          },
          return: null,
        },
      };

      resolve(mockPassenger);
    }, 1000);
  });
};
