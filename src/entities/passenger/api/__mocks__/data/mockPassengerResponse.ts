export default {
  passenger: {
    id: "346b8cab-a2c9-48e6-a75c-f2ea960eeeab",
    firstName: "Иван",
    lastName: "Иванов",
    patronymic: "Иванович",
    gender: {
      id: 1,
      type: "male",
      rus: "Мужской",
    },
    birthday: "19.02.2003",
    phone: {
      code: "+7",
      number: "9241112233",
      refusalToProvide: false,
    },
    identification: {
      document: {
        id: 1,
        type: "passport",
        rus: "Паспорт",
        series: "1234",
        number: "123456",
      },
    },
    ticket: {
      there: {
        seatId: 1,
        id: 1,
        type: "full",
        rus: "Полный",
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
          discounts: [
            {
              id: 1,
              type: "student",
              rus: "Студент",
            },
            {
              id: 2,
              type: "military",
              rus: "СВО",
            },
          ],
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
        discount: {
          id: 1,
          type: "student",
          rus: "Студент",
        },
        baggage: {
          quantity: 1,
        },
        payment: {
          amount: 2200,
          id: 2,
          type: "card",
          rus: "Карта",
        },
        cashier: {
          id: "000001",
          firstName: "Анна",
          lastName: "Шматко",
          role: 1,
          avatarUrl: "",
        },
        saleDate: "10.10.2024",
        saleTime: "15:40",
      },
      return: null,
    },
  },
};
