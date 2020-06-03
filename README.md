## edc-popover-react [![Build Status](https://travis-ci.org/tech-advantage/edc-popover-react.svg?branch=master)](https://travis-ci.org/tech-advantage/edc-popover-react)
This is a react implementation of edc popover displaying the contextual help

_This project is meant to be used with **easy doc contents** (aka edc)._

edc is a simple yet powerful tool for agile-like documentation
management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## Dependencies

The required dependencies are:

- React JS 16.4.0 or higher

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

To work properly, this module needs a basic configuration, you must implement your own configuration by extending `AbstractPopoverConfigProvider` like the example below:
```typescript
import { AbstractPopoverConfigProvider } from 'edc-popover-react'

class ExampleConfigProvider extends AbstractPopoverConfigProvider {
  getPluginId(): string {
    return 'edchelp-test'
  }

  getDocPath(): string {
    return '/doc'
  }

  getHelpPath(): string {
    return '/help'
  }

  getI18nPath(): string {
    return '/doc/i18n'
  }

  //Optional
  getIcon(): string {
    return 'fa-question-circle-o'
  }
}
```

Methods to implement are :
| Method | Return type | Description |
|---|---|---|
| getPluginId | string | The identifier of the target plugin documentation export |
| getHelpPath | string | The path to edc-help-ng application |
| getDocPath  | string | The path to exported documentation |
| getI18nPath | string | The path to translation json files |

Optional methods that can be overridden :
| Method | Return type | Description | Default value |
|---|---|---|---|
| getIcon | string | The font awesome icon | fa-question-circle-o |

### Usage

The main component is `EdcHelp`, you can use the component as follows:
```typescript
import { EdcHelp } from 'edc-popover-react'

...
<EdcHelp />
...
```

## Tests

#### UI components

edc-popover-react uses [Storybook](https://storybook.js.org/) for isolated UI components testing, it can be started with :
```bash
npm run storybook
```

