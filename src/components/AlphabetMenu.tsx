import React, { useState } from "react";

interface AlphabetMenuProps {
  scrollToLetter: (letter: string, prevLetter?: string) => void;
}

const AlphabetMenu: React.FC<AlphabetMenuProps> = ({ scrollToLetter }) => {
  const [prevLetter, setPrevLetter] = useState<string>('');

  return (
  <div className="alphabet-menu">
    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(
      (letter) => (
        <div
          key={letter}
          className="alphabet-item"
          onClick={() => {
            scrollToLetter(letter, prevLetter)
            setPrevLetter(letter)
          }}
        >
          {letter}
        </div>
      )
    )}
  </div>
)};

export default AlphabetMenu;
