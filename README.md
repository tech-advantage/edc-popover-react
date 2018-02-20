## edc-popover-react
This is a react implementation of edc popover displaying the contextual help

_This project is meant to be used with **easy doc contents** (aka edc)._

edc is a simple yet powerful tool for agile-like documentation
management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## Dependencies

The required dependencies are:

- React JS 16.2.0 or higher

## Importing the help component

You can import your library with NPM in any React application by running:

```bash
$ npm install edc-popover-react --save
```

with YARN, use:

```bash
$ yarn add edc-popover-react
```

## Add FontAwesome styles

In your App or main style file, include font-awesome css or less :

```javascript
import 'font-awesome/css/font-awesome.min.css';
```

## Consuming the help component

### Create a configuration service

This module needs a basic configuration. 

To provide this configuration, use the PopoverConfigurationProvider component on top of your App DOM.

Parameters to set are : 

| Method | Return type | Description | Required |
|---|---|---|---|
| pluginId | string | The identifier of the target plugin documentation export | yes |
| helpPath | string | The path to edc-help application | yes |
| docPath |  string | The path to exported documentation | yes |
| icon | string | The font awesome icon | no |

### Example

In your main application module, for example `App`:

```javascript
import 'font-awesome/css/font-awesome.min.css';
import { EdcHelp, PopoverConfigurationProvider } from 'edc-popover-react';

class App extends Component {
  render() {
    return (
      <PopoverConfigurationProvider icon="fa-question-circle-o" pluginId={myPluginId} helpPath={myHelpPath} docPath={myDocPath}>
        <div className="App">
          <header>
            <h1 className="App-title">edc Popover React Component</h1>
          </header>
          <p>
            Popover in a React app: <EdcHelp mainKey="key" subKey="subKey"/>
          </p>
        </div>
      </PopoverConfigurationProvider>
    );
  }
}
export default App;
```

You are now able to use the EdcHelp component in your React application :

```html
<h1>
  {{title}}
  <EdcHelp mainKey="my.key" subKey="my.subkey" placement="bottom" dark={true}/>
</h1>
```

## If your application is covered by more than one documentation
Wherever your application is not covered by the main documentation (the one whose plugin Id is set in the default configuration file), 
you can specify a custom documentation plugin Id using the optional 'pluginId' attribute of the EdcHelp component.

```html
<h1>
  {{title}}
  <EdcHelp pluginId="my.specificPluginId" mainKey="my.key" subKey="my.subkey" placement="bottom" dark={true}/>
</h1>
```

## Setting up the component

The `edc-help` component can take multiple inputs :

| Name | Type | Default | Description | Required |
|---|---|---|---|---|
| pluginId | string | '' | The edc plugin Id if different from the one configured in the main settings | no |
| mainKey | string | '' | The edc documentation main key | yes |
| subKey |  string | '' | The edc documentation sub key | yes |
| placement | string | 'bottom' | How to position the popover - top \| bottom \| left \| right | no |
| dark | boolean | false | Must be set as true if icon is on dark background | no |

## Coming soon

* Customize help icon color (currently gray).
* Customize help icon color on hover (currently blue).
* Add a custom CSS class to popover.
* Choose popover trigger (focus, hover, click, etc...)


## License

MIT [TECH'advantage](mailto:contact@tech-advantage.com)
