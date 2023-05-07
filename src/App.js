import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { Eprovider } from './context/Eprovider';

function App() {
  return (
    <React.StrictMode>
      <Eprovider>
        <AppRouter />
      </Eprovider>
    </React.StrictMode>
  );
}

export default App;
