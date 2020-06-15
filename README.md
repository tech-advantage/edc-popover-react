## edc-popover-react [![Build Status](https://travis-ci.org/tech-advantage/edc-popover-react.svg?branch=master)](https://travis-ci.org/tech-advantage/edc-popover-react)
This is a react implementation of edc popover displaying the contextual help

_This project is meant to be used with **easy doc contents** (aka edc)._

edc is a simple yet powerful tool for agile-like documentation
management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## Dependencies

The required dependencies are:

- [ReactJS](https://reactjs.org/) 16.4.0 or higher
- [FontAwesome](https://github.com/FortAwesome/Font-Awesome) 5.13.0 or higher
- [bootstrap](https://getbootstrap.com/) 4.5.0 or higher
- [edc-client-js](https://github.com/tech-advantage/edc-client-js) 3.0.1 or higher
- [react-bootstrap](https://react-bootstrap.github.io/) 1.0.1 or higher

## Usage

### Import

You can import this module with `npm` by running:
```bash
npm install edc-popover-react --save
```

Or with `yarn`:
```bash
yarn add edc-popover-react
```

### Setup

To work properly, this module needs a basic configuration, you must implement your own configuration by using a high-level Component `PopoverConfigProvider` like the example below:
```typescript jsx
import { PopoverProvider } from 'edc-popover-react'
import { EdcHelp } from 'edc-popover-react'
...

<PopoverProvider
        pluginId='myedchelp'
        docPath='/doc'
        helpPath='/help'
        i18nPath='/doc/i18n'
      >
    ...
   <EdcHelp .../>
    ...
   <EdcHelp .../>
    ...
</PopoverProvider>
```

Props to specify are :
| Prop | Type | Description |
|---|---|---|
| pluginId | `string` | The identifier of the target plugin documentation export |
| helpPath | `string` | The path to edc-help-ng application |
| docPath  | `string` | The path to exported documentation |
| i18nPath | `string` | The path to translation json files |

Optional prop that can be overridden :
| Method | Return type | Description | Default value |
|---|---|---|---|
| icon | `string` | The icon class | `far fa-question-circle` |
| lang | `string` | The default language | `en` |
| trigger | `OverlayTriggerType | OverlayTriggerType[]` | The trigger type | `click` |

You can also reuse your provider to make your app more flexible (but not recommended) :
```typescript jsx
render(){
  return (
  ...
  <PopoverProvider
          pluginId='myedchelp'
          docPath='/doc'
          helpPath='/help'
          i18nPath='/doc/i18n'
        >
    ...
    <EdcHelp .../>
    ...
    <EdcHelp .../>
    ...
  </PopoverProvider>
  ...
  <PopoverProvider
          pluginId='myedchelp'
          docPath='/doc'
          helpPath='/help'
          i18nPath='/doc/i18n'
          icon='far corst'
        >
    ...
    <EdcHelp .../>
    ...
  </PopoverProvider>
  ...
  )
}
```

### Usage

The main component is `EdcHelp`, you can use the component as follows:
```typescript jsx
import { EdcHelp } from 'edc-popover-react'

...
<EdcHelp mainKey='myKey' subKey='mySubKey'/>
...
```

**:warning: All `EdcHelp` components must be surrounded by your configured provider** (see [Setup section](#Setup))

### Customization
You can customize the design of the popover with CSS classes as below:

![CSS Classes](CSSClasses.png "CSS Classes")

## Tests

### Unit

edc-popover-react uses [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) for unit testing, you can test it by running:
```bash
npm test
```
or
```bash
yarn test
```
### UI components

edc-popover-react uses [Storybook](https://storybook.js.org/) for isolated UI components testing, you can test it by running:
```bash
npm run storybook
```
or
```bash
yarn run storybook
```

