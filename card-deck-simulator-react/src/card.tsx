// Below is importing React module from 'react'.
import React from 'react';

// Below is the interface defining props for the Card component.
interface CardProps {
  suit: string; // Suit of the card.
  rank: string; // Rank of the card.
}

// Card component
const Card: React.FC<CardProps> = ({ suit, rank }) => {
  // Below is rendering the card with the suit and rank.
  return (
     <div className="Card">
      <span className="Rank">{rank}</span> {/* Displaying the rank */}
      <span className="Suit">{suit}</span> {/* Displaying the suit */}
    </div>
  );
};

// Below is exporting the Card component as the default export.
export default Card;