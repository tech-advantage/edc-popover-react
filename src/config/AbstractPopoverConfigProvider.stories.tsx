import React, { FunctionComponent } from 'react'
import {
  AbstractPopoverConfigProvider,
  ConfigContext
} from './AbstractPopoverConfigProvider'

export default { title: 'AbstractConfigProvider' }

export const withExampleConsumer: FunctionComponent = () => (
  <ExampleConfigProvider>
    <h4>Fetch plugin id from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string | undefined => value.getPluginId()}
      </ConfigContext.Consumer>
    </div>
    <h4>Fetch doc path from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string | undefined => value.getDocPath()}
      </ConfigContext.Consumer>
    </div>
    <h4>Fetch help path from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string | undefined => value.getHelpPath()}
      </ConfigContext.Consumer>
    </div>
    <h4>Fetch icon from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string | undefined => value.getIcon()}
      </ConfigContext.Consumer>
    </div>
    <h4>Fetch icon from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string | undefined => value.getIcon()}
      </ConfigContext.Consumer>
    </div>
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
