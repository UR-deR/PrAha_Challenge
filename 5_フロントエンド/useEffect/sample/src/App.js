import "./styles.css";
import { SomeComponent } from "./some-component";
import { useState } from "react";
import { FetchComponent } from "./fetch-component";

export default function App() {
  // 強制的にSomeComponentをレンダリングさせるためのフラグ
  const [flag, setFlag] = useState(false);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => setFlag((flag) => !flag)}>レンダリング！</button>
      <SomeComponent someFlag={flag} />
      <FetchComponent />
    </div>
  );
}
