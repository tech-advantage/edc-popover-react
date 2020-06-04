import React, { FunctionComponent } from 'react'
import {
  AbstractPopoverConfigProvider,
  ConfigContext
} from './AbstractPopoverConfigProvider'

export default { title: 'AbstractConfigProvider' }

export const withExampleConsumer: FunctionComponent = () => (
  <ExampleConfigProvider>
    <h1>No results should be empty</h1>
    <hr />
    <hr />
    <h4>Fetch plugin id from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string => 'Result: ' + value.getPluginId()}
      </ConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch doc path from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string => 'Result: ' + value.getDocPath()}
      </ConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch help path from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string => 'Result: ' + value.getHelpPath()}
      </ConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch icon from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string => 'Result: ' + value.getIcon()}
      </ConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch i18n path from context (provider =&gt; consumer)</h4>
    <div>
      <ConfigContext.Consumer>
        {(value): string => 'Result: ' + value.geti18nPath()}
      </ConfigContext.Consumer>
    </div>
    <hr />
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
