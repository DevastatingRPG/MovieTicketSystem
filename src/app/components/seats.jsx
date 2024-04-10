// components/Seats.js
// import styles from 'styles/seats.module.css';
// import React, { useState } from 'react';

// export default function Seats({ occupiedSeats, setSelectedSeats, selectedSeats }) {
//     // const [selectedSeats, setSelectedSeats] = useState([]);
//     const seats = Array.from({ length: 60 }, (_, i) => i + 1);

//     return (
//         <div className={styles.seats}>
//             {seats.map((seat) => (
//                 <div
//                     key={seat}
//                     className={`${styles.seat} ${occupiedSeats.includes(seat) ? styles.occupied : ''} ${selectedSeats.includes(seat) ? styles.selected : ''}`}
//                     onClick={() => {
//                         if (selectedSeats.includes(seat)) {
//                             setSelectedSeats(selectedSeats.filter(s => s !== seat));
//                         } else if (selectedSeats.length < 10 && !occupiedSeats.includes(seat)) {
//                             setSelectedSeats([...selectedSeats, seat]);
//                         }

//                     }}
//                 >
//                     {seat}
//                 </div>
//             ))}
//         </div>
//     );
// }
import React, { useState } from 'react';

// export default function Seats({ occupiedSeats, setSelectedSeats, selectedSeats }) {
//     // const [selectedSeats, setSelectedSeats] = useState([]);
//     const seats = Array.from({ length: 60 }, (_, i) => i + 1);

//     return (
//         <div className="grid grid-cols-10 gap-2">
//             {seats.map((seat) => (
//                 <div
//                     key={seat}
//                     className={`seat p-2 text-center ${occupiedSeats.includes(seat) ? 'bg-red-500' : ''
//                         } ${selectedSeats.includes(seat) ? 'bg-green-500' : ''}`}
//                     onClick={() => {
//                         if (selectedSeats.includes(seat)) {
//                             setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//                         } else if (selectedSeats.length < 10 && !occupiedSeats.includes(seat)) {
//                             setSelectedSeats([...selectedSeats, seat]);
//                         }
//                     }}
//                 >
//                     {seat}
//                 </div>
//             ))}
//         </div>
//     );
// }
export default function Seats({ occupiedSeats, setSelectedSeats, selectedSeats }) {
    // const [selectedSeats, setSelectedSeats] = useState([]);
    const seats = Array.from({ length: 60 }, (_, i) => i + 1);
  
    return (
      <div className="grid grid-cols-10 gap-2 mb-4">
        {seats.map((seat) => (
          <div
            key={seat}
            className={`seat p-2 text-center rounded-md cursor-pointer hover:bg-gray-200 ${
              occupiedSeats.includes(seat) ? 'bg-red-500' : ''
            } ${selectedSeats.includes(seat) ? 'bg-green-500' : ''}`}
            onClick={() => {
              if (selectedSeats.includes(seat)) {
                setSelectedSeats(selectedSeats.filter((s) => s !== seat));
              } else if (selectedSeats.length < 10 && !occupiedSeats.includes(seat)) {
                setSelectedSeats([...selectedSeats, seat]);
              }
            }}
          >
            {seat}
          </div>
        ))}
      </div>
    );
  }
