/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { usePassengerStore, type Store as PassengerStore } from "@/entities/passenger";
import { Payment } from "../types/payment.types";

// Интерфейс хранилища
export interface Store {
  payment: Payment;
  options: {
    methods: Payment[];
  };

  setPayment: (payment: Payment) => void;
}

export const usePaymentStore = create<Store>()(
  devtools(
    immer((set) => ({
      payment: {
        amount: 0,
        ticket: {
          amount: 0,
          there: {
            price: 0,
          },
          return: {
            price: 0,
          },
        },
        baggage: {
          amount: 0,
          quantity: 0,
          there: {
            price: 0,
          },
          return: {
            price: 0,
          },
        },
      },
      options: {
        methods: [
          { id: 1, type: "cash", rus: "Наличные" },
          { id: 2, type: "card", rus: "Карта" },
          { id: 3, type: "sbp", rus: "СБП" },
        ],
      },

      setPayment: (payment) => {
        set((state) => {
          return { ...state, payment: { ...state.payment, ...payment } };
        });
      },
    })),
    {
      name: "PaymentStore",
    },
  ),
);

usePassengerStore.subscribe((state: PassengerStore) => {
  let thereBaggageQuantity = 0;
  let returnBaggageQuantity = 0;
  let thereBaggageTotal = 0;
  let returnBaggageTotal = 0;
  let thereTicketTotal = 0;
  let returnTicketTotal = 0;

  const totalBaggageQuantity = thereBaggageQuantity + returnBaggageQuantity;

  const totalBaggagePrice = state.passengers.reduce((acc, passenger) => {
    const thereBaggageSubQuantity = passenger.ticket.there?.baggage?.quantity ?? 0;
    const returnBaggageSubQuantity = passenger.ticket.return?.baggage?.quantity ?? 0;

    const baggageTherePrice = passenger.ticket.there?.baggage?.price ?? 0;
    const baggageReturnPrice = passenger.ticket.return?.baggage?.price ?? 0;

    const thereBaggageSubTotal = thereBaggageSubQuantity * baggageTherePrice;
    const returnBaggageSubTotal = returnBaggageSubQuantity * baggageReturnPrice;

    thereBaggageTotal += thereBaggageSubTotal;
    returnBaggageTotal += returnBaggageSubTotal;

    thereBaggageQuantity += thereBaggageSubQuantity;
    returnBaggageQuantity += returnBaggageSubQuantity;

    return acc + thereBaggageSubTotal + returnBaggageSubTotal;
  }, 0);

  const totalTicketPrice = state.passengers.reduce((acc, passenger) => {
    const thereTicketSubTotal = passenger.ticket.there?.wayDetail?.ticket.price ?? 0;
    const returnTicketSubTotal = passenger.ticket.return?.wayDetail?.ticket.price ?? 0;

    thereTicketTotal += thereTicketSubTotal;
    returnTicketTotal += returnTicketSubTotal;

    return acc + thereTicketSubTotal + returnTicketSubTotal;
  }, 0);

  usePaymentStore.setState(() => ({
    payment: {
      baggage: {
        amount: totalBaggagePrice,
        quantity: totalBaggageQuantity,
        there: {
          price: thereBaggageTotal,
        },
        return: {
          price: returnBaggageTotal,
        },
      },
      ticket: {
        amount: totalTicketPrice,
        there: {
          price: thereTicketTotal,
        },
        return: {
          price: returnTicketTotal,
        },
      },
      amount: totalTicketPrice + totalBaggagePrice,
    },
  }));
});
