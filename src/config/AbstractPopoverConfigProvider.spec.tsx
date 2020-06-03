import React from 'react'
import { mount } from 'enzyme'
import {
  AbstractPopoverConfigProvider,
  ConfigContext
} from './AbstractPopoverConfigProvider'

class ExampleConfigProvider extends AbstractPopoverConfigProvider {
  getPluginId(): string {
    return 'edchelp-test-jest'
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

describe('ConfigProvider', () => {
  it('should allow to fetch the ConfigContext', () => {
    const wrapper = mount(
      <ExampleConfigProvider>
        <button>
          <ConfigContext.Consumer>
            {(value) => value.pluginId}
          </ConfigContext.Consumer>
        </button>
      </ExampleConfigProvider>
    )

    expect(wrapper.find('button').text()).toEqual(
      new ExampleConfigProvider({}).getPluginId()
    )
  })
})