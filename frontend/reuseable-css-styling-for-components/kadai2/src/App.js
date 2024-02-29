import './styles.css';

function Sidemenu() {
  return (
    <div>
      <ul>
        <li>menu1</li>
        <li>menu2</li>
        <li>menu3</li>
      </ul>
    </div>
  );
}

function MainContent() {
  return (
    <div>
      <p>僕はメインコンテンツだよ</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Sidemenu />
      <MainContent />
    </div>
  );
}
