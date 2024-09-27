import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Booking = () => {
  const { imdbID } = useParams(); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  // Array of seat numbers (1 to 300)
  const seats = Array.from({ length: 300 }, (_, index) => index + 1);
  
  // Array of row labels (A to W for 23 rows)
  const rowLabels = Array.from({ length: 23 }, (_, index) => String.fromCharCode(65 + index));

  // Toggle seat selection
  const toggleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      // Deselect the seat
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => seat !== seatNumber)
      );
    } else if (selectedSeats.length < 2) {
      // Select the seat if less than 2 seats are selected
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
    } else {
      // If user tries to select more than 2 seats
      alert('You can select a maximum of 2 seats.');
    }
  };

  
  const handleBooking = () => {
    console.log('Selected Seats:', selectedSeats);
    console.log('Movie IMDb ID:', imdbID);
    alert(`Booking confirmed for ${selectedSeats.length} seats!`);
    
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 items-center">
        <button onClick={() => navigate(-1)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
          Back
        </button>
        <div className="text-xl font-bold">Booking for IMDb ID: {imdbID}</div>
      </div>

      
      <div className="overflow-x-auto mt-5">
        {rowLabels.map((rowLabel, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-4 mb-2 md:justify-center">
            {/* Row label (A, B, C, etc.) */}
            <div className={`text-lg font-bold w-[10px] ${(rowLabel=="H" || rowLabel=="O")?
                    "mt-8":
                    ""}`}>{rowLabel}</div>
            

            {/* Seats in the row */}
            <div className="flex gap-2 ">
              {seats.slice(rowIndex * 13, rowIndex * 13 + 13).map((seatNumber) => (
                
                <div
                  key={seatNumber}
                  className={`w-6 h-6 flex items-center justify-center border border-gray-400 rounded cursor-pointer ${
                    selectedSeats.includes(seatNumber) ? 'bg-green-500 text-white' : 'bg-gray-200'
                  } ${(rowLabel=="H" || rowLabel=="O")?
                    "mt-8":
                    ""} md:w-12 md:h-12 md:text-lg`}
                  onClick={(e) => {toggleSeatSelection(seatNumber);
                    console.log(e.target.key)
                  }}
                >
                  {seatNumber%13?
                  seatNumber%13:
                  13}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleBooking}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Confirm Booking ({selectedSeats.length} seats)
      </button>
    </div>
  );
};

export default Booking;
