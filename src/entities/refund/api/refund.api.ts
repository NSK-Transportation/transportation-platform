import { Refund } from "../model/types/refund.types";

// MOCK
export const getRefund = async (): Promise<Refund> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockRefund: Refund = {
        withheld: 319,
        retentionPercentage: 25,
        amount: 957,
        type: "sbp",
      };

      resolve(mockRefund);
    }, 1000);
  });
};
