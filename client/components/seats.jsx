 // components/Seats.js
 import styles from 'styles/seats.module.css';

 export default function Seats({ occupiedSeats }) {
   const seats = Array.from({ length: 60 }, (_, i) => i + 1);

   return (
     <div className={styles.seats}>
       {seats.map((seat) => (
         <div
           key={seat}
           className={`${styles.seat} ${occupiedSeats.includes(seat) ? styles.occupied : ''}`}
         >
           {seat}
         </div>
       ))}
     </div>
   );
 }
