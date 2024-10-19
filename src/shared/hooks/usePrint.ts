import { useCallback } from "react";
import { createRoot } from "react-dom/client";

export const usePrint = () => {
  const printComponent = useCallback(
    (component: JSX.Element, styles: string = "", title: string) => {
      const printWindow = window.open("", "_blank");

      if (printWindow) {
        printWindow.document.write(`
          <head>
            <title>${title}</title>
            <style>
              ${styles} 
            </style>
          </head>
          <body>
            <div id="print-root"></div>
          </body>
      `);
        printWindow.document.close();

        const printRoot = printWindow.document.getElementById("print-root");
        if (printRoot) {
          createRoot(printRoot).render(component);
        }

        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        };
      }
    },
    [],
  );

  return printComponent;
};
