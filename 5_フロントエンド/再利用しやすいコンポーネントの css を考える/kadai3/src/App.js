import './styles.css';
import React from 'react';

// tsの場合、elementとして指定できるものを制限する
// type Props = {
//   label: string,
//   element: 'span' | 'li',
// };

function MenuItem({ label, element }) {
  return React.createElement(element, null, label);
}

function Menu() {
  return (
    <ul>
      <MenuItem label="menu1" element="li" />
      <MenuItem label="menu2" element="li" />
      <MenuItem label="menu3" element="li" />
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
