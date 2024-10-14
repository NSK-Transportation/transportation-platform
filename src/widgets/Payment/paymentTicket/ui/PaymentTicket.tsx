import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { usePassengerStore } from "@/entities/passenger";
import { Payment, PaymentInformation, usePaymentStore } from "@/entities/payment";
import { paymentMutation } from "@/entities/payment";
import { Button } from "@/shared/ui";

// В сущность оплаты Payment добавить варианты оплаты, т.е.
// - если кассир выбрал наличку, то подключается логика для наличной оплаты (печать чека и т.д. по ТЗ)
// - если кассир выбрал карту, то подключается логика для оплаты картой (перенаправление на сервис оплаты или сигнал терминалу)
// - если кассир выбрал СБП, то подключается логика для СБП (на втором экране рендерится QR CODE)

export const PaymentTicket = () => {
  const {
    payment,
    setPayment,
    options: { methods },
  } = usePaymentStore();
  const { passengers } = usePassengerStore();

  const { mutateAsync, isLoading } = useMutation(
    (type: Payment["type"]) => paymentMutation(type, payment),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  const handlePayment = async (type: Payment["type"], payment: Payment) => {
    switch (type) {
      case "cash":
        toast("Выбрана оплата через наличку");
        break;
      case "card":
        toast("Выбрана оплата через карточку");
        break;
      case "sbp":
        toast("Выбрана оплата через СБП");
        break;
    }
    setPayment(payment);
    await mutateAsync(type);
  };

  return (
    <>
      <PaymentInformation
        actions={methods.map((method) => (
          <Button // Разбить кнопки оплаты на разные компонентны, для разной логики оплаты
            key={method.id}
            variant={method.type === payment?.type ? "selected" : "payment"}
            label={method.rus}
            size="large"
            onClick={() => handlePayment(method.type, method)}
            loading={method.type === payment.type && isLoading}
          />
        ))}
        payment={payment}
        passengers={passengers}
      />
    </>
  );
};
