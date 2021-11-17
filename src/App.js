import React from 'react';
import './App.css';
import Wrapper from './Components/Wrapper';



class App extends React.Component {

  render() {
    return (
        <div className="app">
        {/*
            Call component Wrapper that contains:
              1- AllBooks -> Component
              2- Search -> Component
        */}
          <Wrapper />
        </div>
    )
  }
}

export default App
