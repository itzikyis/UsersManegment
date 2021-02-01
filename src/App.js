import React from 'react';
import './App.css';
import UsersDataComp from './components/UsersDataComp'
import NavbarComp from './components/NavbarComp'

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <UsersDataComp />
    </div>
  );
}

export default App;
