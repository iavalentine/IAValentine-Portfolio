// Below is importing React module from 'react'.
import React from 'react';

// Below is a interface defining props for the Button component.
interface ButtonProps {
  onClick: () => void; // Function to be called when the button is clicked.
  children: React.ReactNode; // Content inside the button.
}

// Button component
const Button: React.FC<ButtonProps> = ({onClick, children }) => {
  // Below is rendering the button with the onClick handler and children content.
  return (
    <button className="Button" onClick={onClick}>
      {children} {/* Displaying the content inside the button */}
    </button>
  );
};

// Below is exporting the Button component as the default export.
export default Button;
