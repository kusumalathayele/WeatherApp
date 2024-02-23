import React, { useState } from "react";
import Weather from "./components/weather";

function App() {
  const [inputvalue, setinputvalue] = useState("london");
  const [location, setlocation] = useState("london");

  const handlesubmit = (e) => {
    e.preventDefault();
    setlocation(inputvalue);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <form onSubmit={handlesubmit} style={{ marginBottom: "20px" }}>
        <input type="text" value={inputvalue} onChange={(e) => { setinputvalue(e.target.value) }} />
        <button type="submit">Search city</button>
      </form>
      <Weather location={location} />
    </div>
  );
}

export default App;
