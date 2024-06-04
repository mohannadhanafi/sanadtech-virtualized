import React from "react";

interface AlphabetMenuProps {
  scrollToLetter: (letter: string) => void;
}

const AlphabetMenu: React.FC<AlphabetMenuProps> = ({ scrollToLetter }) => (
  <div className="alphabet-menu">
    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(
      (letter) => (
        <div
          key={letter}
          className="alphabet-item"
          onClick={() => scrollToLetter(letter)}
        >
          {letter}
        </div>
      )
    )}
  </div>
);

export default AlphabetMenu;
