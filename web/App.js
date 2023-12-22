// app.js
import React from "react";
import TranspiledComponent2 from "./transpiler/transpiledcode";
import TranspiledComponent from "./transpiler/transpiler";


const App = () => {
  return (
    <div>
      {/* <TranspiledComponent2 /> */}

      <TranspiledComponent2 />
      <TranspiledComponent/>
      
    </div>
  );
};

export default App;
