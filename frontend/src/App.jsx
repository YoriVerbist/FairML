import { useState } from "react";
import "./App.css";
import StickyNavbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StickyNavbar />
      <div>Hello world</div>
    </>
  );
}

export default App;
