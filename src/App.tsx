import * as React from 'react';
import './App.css';
import socketService from './services/socketService';
import Gamepad from './components/Gamepad';

class App extends React.Component {

  constructor(props: {}) {
    super(props)
    socketService.registerUser('test user')
  }

  public render() {
    return (
      <Gamepad/>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.tsx</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
