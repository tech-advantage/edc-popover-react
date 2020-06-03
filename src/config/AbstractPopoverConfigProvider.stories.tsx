import React from 'react'
import {
  AbstractPopoverConfigProvider,
  ConfigContext
} from './AbstractPopoverConfigProvider'

export default { title: 'AbstractConfigProvider' }

export const withExampleConsumer = () => (
  <ExampleConfigProvider>
    <button>
      <ConfigContext.Consumer>
        {(value) => value.pluginId}
      </ConfigContext.Consumer>
    </button>
  </ExampleConfigProvider>
)

class ExampleConfigProvider extends AbstractPopoverConfigProvider {
  getPluginId(): string {
    return 'edchelp-test-storybook'
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
}
