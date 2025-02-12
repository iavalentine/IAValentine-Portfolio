// Below is importing the necessary modules from React.
import React, { useState } from 'react';

// Below is importing the Card and Button components from './card' and './button' respectively.
import Card from './card';
import Button from './button';

// Below defines the suits and ranks for the deck of cards.
const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const RANKS = ['2 ', '3 ', '4 ', '5 ', '6 ', '7 ', '8 ', '9 ', '10 ', 'J ', 'Q ', 'K ', 'A '];

// Below is a function that generates a deck of cards.
function generateDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

// Deck component
function Deck() {
  // State hooks for deck and drawn cards.
  const [deck, setDeck] = useState(generateDeck());
  const [drawnCards, setDrawnCards] = useState([]);

  // Below is a function to shuffle the deck.
  const shuffleDeck = () => {
    setDeck((prevDeck) => {
      const shuffleDeck = [...prevDeck];
      shuffleDeck.sort(() => Math.random() - 0.5);
      return shuffleDeck;
    });
    setDrawnCards([]); // Clears the drawn cards.
  };

  // Below is a function to draw a card from the deck.
  const drawCard = () => {
    if (deck.length === 0) {
      alert('No cards left in the deck!');
      return;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    setDrawnCards((prevDrawnCards) => [...prevDrawnCards, card]);
    setDeck((prevDeck) => prevDeck.filter((c, index) => index !== randomIndex));
  };

  // Below is a function to show the total card count in the deck.
  const showCardCount = () => {
    alert(`Total cards remaining in the deck: ${deck.length}`);
  };

  // Below is rendering the Deck component.
  return (
    <div className="Deck">
      <Button onClick={shuffleDeck}>Shuffle Deck</Button>
      <Button onClick={drawCard}>Draw Card</Button>
      <Button onClick={showCardCount}>Show Card Count</Button> {/* New button for showing card count */}
      <div className="CardArea">
        {/* Below is mapping over drawn cards and rendering Card components */}
        {drawnCards.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} />
        ))}
      </div>
    </div>
  );
}

// Below is exporting the Deck component as the default export.
export default Deck;