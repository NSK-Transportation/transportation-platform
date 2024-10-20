import { useDisclosure } from "@siberiacancode/reactuse";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { FormPrinting } from "@/features/refund";
import { getRefund, RefundInformation, postRefund, useRefundStore } from "@/entities/refund";
import { Button, Popup, Stacks, Typography } from "@/shared/ui";

export const Refund = () => {
  const { refund, passenger, setRefund } = useRefundStore();
  const { opened, open, close } = useDisclosure();
  const navigate = useNavigate();

  const { data: queryData, status: queryStatus } = useQuery(
    [`refund`, refund],
    () => getRefund(passenger?.id ?? ""),
    {
      enabled: !!passenger,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setRefund(data.refund);
      },
    },
  );

  const { data: mutationData, mutateAsync, isLoading } = useMutation(() => postRefund(refund));

  const handleRefund = () => {
    toast.promise(mutateAsync(), {
      loading: "Возврат билета",
      success: "Билет успешно возвращен",
      error: "Ошибка возврата билета",
    });
    open();
    mutateAsync();
  };

  const handleClosePopup = () => {
    close();
    navigate(0);
  };

  return (
    <>
      <RefundInformation
        passenger={passenger!}
        refund={refund!}
        action={<FormPrinting status={queryStatus} form={queryData?.form} />}
      />

      <Stacks justifyContent="flex-end">
        <Button label="Возврат" onClick={handleRefund} loading={isLoading} disabled={!refund} />
      </Stacks>

      {mutationData?.status === "success" && (
        <Popup isOpen={opened} onClose={handleClosePopup}>
          <Stacks direction="column" gap={16} alignItems="center">
            <Typography variant="h3">
              Возврат на сумма {queryData?.refund.amount} совершен
            </Typography>
            <Typography variant="h6" color="secondary">
              При закрытии окна, страница будет обновлена
            </Typography>
          </Stacks>
        </Popup>
      )}
    </>
  );
};
