import { useState } from "react";
import JSONTreeComponent from "./modules/JsonTree";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <JSONTreeComponent />;
}

export default App;
