import './styles.css';

function ReusableButton() {
  return <button className="reusable-button">click me!</button>;
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="btn-wrapper">
        <ReusableButton />
      </div>
    </div>
  );
}
