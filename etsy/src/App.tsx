import React from 'react';
import './App.css';
import Listing from './components/Listing.tsx';
import itemsData from './data/Items.json';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Передача импортированных данных в компонент Listing */}
      <Listing items={itemsData} />
    </div>
  );
}

export default App;
