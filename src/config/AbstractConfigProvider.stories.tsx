import React from 'react'
import { ExampleConfigProvider } from './AbstractConfigProvider.spec'
import { ConfigContext } from './AbstractConfigProvider'

export default { title: 'AbstractConfigProvider' }

export const withDefaultIcon = () => (
  <ExampleConfigProvider>
    <button>
      <ConfigContext.Consumer>
        {(value) => value.pluginId}
      </ConfigContext.Consumer>
    </button>
  </ExampleConfigProvider>
)
