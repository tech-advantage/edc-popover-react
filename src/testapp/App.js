import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {EdcHelp} from '../components/EdcHelp';
import {PopoverConfigurationProvider} from '../components/PopoverConfigurationProvider';

class App extends Component {
  render() {
    return (
      <PopoverConfigurationProvider icon="fa-question-circle-o" pluginId="" helpPath="" docPath="">
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">edc Popover React Component</h1>
            On dark background: <EdcHelp mainKey="key" subKey="subKey" dark={true}/>
          </header>
          <p className="App-intro">
            Integration example for <a href="https://www.easydoccontents.com">edc</a> Popover in a React app.
          </p>
          <p>
            On white background:
            <EdcHelp mainKey="key" subKey="subKey"/>
          </p>

        </div>
      </PopoverConfigurationProvider>
    );
  }
}

export default App;
