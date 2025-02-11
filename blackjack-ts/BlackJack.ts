// Below defines enum for card suits.
enum Suit {
Hearts = 'Hearts',
Diamonds = 'Diamonds',
Clubs = 'Clubs',
Spades = 'Spades',
}
// Below defines enum for card values.
enum Value {
Ace = 'Ace',
Two = '2',
Three = '3',
Four = '4',
Five = '5',
Six = '6',
Seven = '7',
Eight = '8',
Nine = '9',
Ten = '10',
Jack = 'Jack',
Queen = 'Queen',
King = 'King',
}
// Below is a class representing a single playing card.
class Card {
suit: Suit;
value: Value;
constructor(suit: Suit, value: Value) {
this.suit = suit;
this.value = value;
}
// Below gets a numerical value of the card. 
getValue(): number {
if (this.value === Value.Jack || this.value === Value.Queen || this.value === Value.King) {
return 10;
} else if (this.value === Value.Ace) {
return 11;
} else {
return parseInt(this.value);
}
}
// Below adjusts the value of the Ace based on the current score.
adjustAceValue(currentScore: number): number {
if (this.value === Value.Ace && currentScore + 11 > 21) {
return 1;
}
return 11;
}
}
// Below is a class representing a deck of cards. 
class Deck {
cards: Card[];
constructor() {
// Below generates and initialize a deck of cards.
this.cards = this.generateDeck();
}
// Below generates a standard deck of cards.
private generateDeck(): Card[] {
const suits = Object.keys(Suit).map(key => Suit[key as keyof typeof Suit]);
const values = Object.keys(Value).map(key => Value[key as keyof typeof Value]);
const deck: Card[] = [];
for (const suit of suits) {
for (const value of values) {
deck.push(new Card(suit, value));
}
}
return deck;
}
// Below shuffles the deck.
shuffle(): void {
for (let i = this.cards.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
}
}
// Below deals a card from the deck.
dealCard(): Card | undefined {
return this.cards.pop();
}
}
// Below is a class representing the player in the game.
class Player {
hand: Card[];
constructor() {
this.hand = [];
}
// Below receives a card and adds it to the players hand.
receiveCard(card: Card): void {
this.hand.push(card);
}
// Below calculates the score of the players hand.
getScore(): number {
let score = 0;
let aceCount = 0;
for (const card of this.hand) {
score += card.getValue();
if (card.value === Value.Ace) {
aceCount++;
}
}
// Below adjusts the score if there are Aces in the hand.
while (aceCount > 0 && score > 21) {
score -= 10;
aceCount --;
}
return score;
}
}
// Below is a class representing the blackjack game.
class Game {
player: Player;
dealer: Player;
deck: Deck;
constructor() {
// Below initializes the player, dealer and the deck.
this.player = new Player();
this.dealer = new Player();
this.deck = new Deck();
this.deck.shuffle();
}
// Below starts the game.
startGame(): void {
// Below deals the initial cards to the player and dealer.
this.player.receiveCard(this.deck.dealCard()!);
this.player.receiveCard(this.deck.dealCard()!);
this.dealer.receiveCard(this.deck.dealCard()!);
this.dealer.receiveCard(this.deck.dealCard()!);
// Prints the initial game status.
this.printGameStatus();
// Starts the players turn.
this.playerTurn();
}
// Below prints the current game status.
printGameStatus(): void {
console.log(`Players Hand: ${this.player.hand.map(card => `${card.value} of ${card.suit}`).join(', ')}`);
console.log(`Players Score: ${this.player.getScore()}`);
console.log(`Dealers Hand: ${this.dealer.hand[0].value} of ${this.dealer.hand[0].suit}, Face Down Card`);
}
// Below is the start of the players turn.
playerTurn(): void {
const readline = require('readline').createInterface({
input: process.stdin,
output: process.stdout,
});
// Below prompts the player to hit or stay.
readline.question('(h)it or (s)tay?', (answer: string) => {
if (answer.toLowerCase() === 'h') {
// If the player hits, then it deals the card and prints the game status.
this.player.receiveCard(this.deck.dealCard()!);
this.printGameStatus();
if (this.player.getScore() > 21) {
// If the player busts, the game ends.
console.log('Player busts! Dealer wins.');
readline.close();
} else {
// Otherwise, continue the players turn.
this.playerTurn();
}
} else if (answer.toLowerCase() === 's') {
// If the player stays, then it starts the dealers turn.
this.dealerTurn();
} else {
// Below handles a possible invalid input.
console.log('Invalid input! Please enter (h)it or (s)tay.');
this.playerTurn();
}
});
}
// Below is the start of the dealers turn.
dealerTurn(): void {
console.log('Dealer reveals face down card:');
console.log(`Dealers Hand: ${this.dealer.hand.map(card => `${card.value} of ${card.suit}`).join(', ')}`);
console.log(`Dealers Score: ${this.dealer.getScore()}`);
// Below makes the dealer hit until the score is at least 17.
while (this.dealer.getScore() < 17) {
this.dealer.receiveCard(this.deck.dealCard()!);
console.log(`Dealer hits: ${this.dealer.hand[this.dealer.hand.length - 1].value} of ${this.dealer.hand[this.dealer.hand.length - 1].suit}`);
console.log(`Dealers Hand: ${this.dealer.hand.map(card => `${card.value} of ${card.suit}`).join(', ')}`);
console.log(`Dealers Score: ${this.dealer.getScore()}`);
}
// Below determines the winner or possible tie.
if (this.dealer.getScore() > 21 || this.player.getScore() > this.dealer.getScore()) {
console.log('Player wins!');
} else if (this.dealer.getScore() > this.player.getScore()) {
console.log('Dealer wins!');
} else {
console.log('It\'s a tie!');
}
// Ends the game.
process.exit();
}
}
// Creates and starts a new game.
const game = new Game();
game.startGame();