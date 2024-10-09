// import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Box, Divider, Stacks, Typography } from "@/shared/ui";
// import { useInformationStore } from "../../../InformationPanel.store";
// import { TicketInfo } from "../ticketInfo/TicketInfo";
// import { SeatInfoWay } from "../seatInfoWay/SeatInfoWay";

// export const SeatPlace = () => {
//   const { activeWay, passengers, options } = useInformationStore();
//   const [searchParams] = useSearchParams();
//   const step = parseInt(searchParams.get("step") || "0");
//   const [visible, setVisible] = useState(true);

//   const renderSeatInfoReturn = () => {
//     const selectedSeats = activeWay?.return?.seats?.filter((seat) => seat.status === "selected");

//     return selectedSeats?.map((seat, index) => {
//       const passenger = passengers.find(
//         (passenger: Passenger) => passenger.ticket.return?.seatId === seat.id,
//       );

//       const ticketType = passenger?.ticket?.return?.type;

//       return (
//         <Box key={index} variant="dashed">
//           <Stacks direction="column" gap={8}>
//             <Stacks gap={8} fullwidth>
//               <Typography variant="h3" weight={600}>
//                 Посадочное место:
//               </Typography>
//               <Typography variant="h3" weight={400}>
//                 {seat.id}
//               </Typography>
//             </Stacks>
//             {step >= 2 && ticketType && (
//               <TicketInfo
//                 ticketType={ticketType}
//                 passenger={passenger!}
//                 direction={"return"}
//                 options={options}
//               />
//             )}
//           </Stacks>
//         </Box>
//       );
//     });
//   };

//   const renderSeatInfoThere = () => {
//     const selectedSeats = activeWay?.there?.seats?.filter((seat) => seat.status === "selected");

//     return selectedSeats?.map((seat, index) => {
//       const passenger = passengers.find(
//         (passenger: Passenger) => passenger.ticket.there?.seatId === seat.id,
//       );

//       const ticketType = passenger?.ticket?.there?.type;

//       return (
//         <Box key={index} variant="dashed">
//           <Stacks direction="column" gap={8}>
//             <Stacks gap={8} fullwidth>
//               <Typography variant="h3" weight={600}>
//                 Посадочное место:
//               </Typography>
//               <Typography variant="h3" weight={400}>
//                 {seat.id}
//               </Typography>
//             </Stacks>
//             {step >= 2 && ticketType && (
//               <>
//                 <TicketInfo
//                   ticketType={ticketType}
//                   passenger={passenger!}
//                   direction={"there"}
//                   options={options}
//                 />
//                 {step >= 3 && activeWay.return && passenger?.ticket.return && (
//                   <Stacks gap={8}>
//                     <Divider color="blue" orientation="vertical" width={2} />
//                     <Stacks direction="column" gap={8} fullwidth>
//                       <Typography variant="h3" color="primary-second">
//                         Обратный билет
//                       </Typography>
//                       <SeatInfoWay direction={"return"} visible={visible} setVisible={setVisible} />
//                       {visible && renderSeatInfoReturn()}
//                     </Stacks>
//                   </Stacks>
//                 )}
//               </>
//             )}
//           </Stacks>
//         </Box>
//       );
//     });
//   };

//   return (
//     <Stacks direction="column" gap={16}>
//       {renderSeatInfoThere()}
//     </Stacks>
//   );
// };
