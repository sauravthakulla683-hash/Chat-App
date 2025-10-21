import React, { useState } from "react";

const App = () => {
  const [grid, setGrid] = useState(4);
  const [card, setCard] = useState([]);
  const [flipped, setflipped] = useState([]);
  const [solved, setsolved] = useState([]);
  const [disable, setdisable] = useState(false);
  const [won, setwon] = useState(false);

  const gridchange = (e) => {
    setGrid(e.target.value);
  };

  return (
    <div className="flex w-full h-screen flex-col gap-6 justify-center items-center ">
      <h1 className="text-4xl">Memory Game</h1>
      {/* INPUT */}
      <div className="flex justify-center items-center flex-col text-3xl">
        <label htmlFor="grid">Enter the grid size Max:(10)</label>
        <input
          id="grid"
          type="number"
          value={grid}
          onChange={gridchange}
          className="w-16"
        />
      </div>

      {/* Game */}

      {/* WIn pop up */}

      {/* Reset */}
    </div>
  );
};

export default App;
