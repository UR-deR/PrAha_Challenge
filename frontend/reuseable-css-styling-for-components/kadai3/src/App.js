import "./styles.css";

function MenuItem({ label }) {
  return <li>{label}</li>;
}

function Menu() {
  return (
    <ul>
      <MenuItem label="menu1" />
      <MenuItem label="menu2" />
      <MenuItem label="menu3" />
    </ul>
  );
}

export default function App() {
  return (
    <div className="App">
      <Menu />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
