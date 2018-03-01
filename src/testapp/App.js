import React, { Component } from 'react';
import './App.css';
import { EdcHelp } from '../components/EdcHelp';
import { EdcConfigurationProvider } from '../components/EdcConfigurationProvider';

class App extends Component {
  render() {
    return (
      <EdcConfigurationProvider
        icon="fa-question-circle-o"
        pluginId="edchelp"
        helpPath="/help"
        docPath="/doc"
      >
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">edc Popover React Component</h1>
            On dark background:{' '}
            <EdcHelp mainKey="fr.techad.edc" subKey="help.center" dark={true} />
          </header>
          <p className="App-intro">
            Integration example for{' '}
            <a href="https://www.easydoccontents.com">edc</a> Popover in a React
            app.
          </p>
          <p>
            On white background:
            <EdcHelp mainKey="fr.techad.edc" subKey="help.center" />
          </p>
        </div>
      </EdcConfigurationProvider>
    );
  }
}

export default App;
