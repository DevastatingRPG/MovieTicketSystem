// components/Seats.js
import styles from 'styles/seats.module.css';
import React, {useState} from 'react';

export default function Seats({ occupiedSeats, setSelectedSeats, selectedSeats }) {
  // const [selectedSeats, setSelectedSeats] = useState([]);
  const seats = Array.from({ length: 60 }, (_, i) => i + 1);
 
  return (
    <div className={styles.seats}>
      {seats.map((seat) => (
        <div
          key={seat}
          className={`${styles.seat} ${occupiedSeats.includes(seat) ? styles.occupied : ''} ${selectedSeats.includes(seat) ? styles.selected : ''}`}
          onClick={() => {
            if (selectedSeats.includes(seat)) {
              setSelectedSeats(selectedSeats.filter(s => s !== seat));
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
