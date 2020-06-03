import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
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
  const rightVals = new ExampleConfigProvider({})

  it('should allow to fetch all props from ConfigContext', () => {
    const wrapper = mount(
      <ExampleConfigProvider>
        <button id='pluginId'>
          <ConfigContext.Consumer>
            {(value) => value.pluginId}
          </ConfigContext.Consumer>
        </button>
        <button id='helpPath'>
          <ConfigContext.Consumer>
            {(value) => value.helpPath}
          </ConfigContext.Consumer>
        </button>
        <button id='docPath'>
          <ConfigContext.Consumer>
            {(value) => value.docPath}
          </ConfigContext.Consumer>
        </button>
        <button id='i18nPath'>
          <ConfigContext.Consumer>
            {(value) => value.i18nPath}
          </ConfigContext.Consumer>
        </button>
        <button id='icon'>
          <ConfigContext.Consumer>
            {(value) => value.icon}
          </ConfigContext.Consumer>
        </button>
      </ExampleConfigProvider>
    )

    exceptAllPropsOk(wrapper, rightVals)
  })

  it('should handle multiple declaration of implemented provider', () => {
    const wrapper = mount(
      <>
        <ExampleConfigProvider>
          <button id='pluginId'>
            <ConfigContext.Consumer>
              {(value) => value.pluginId}
            </ConfigContext.Consumer>
          </button>
        </ExampleConfigProvider>
        <ExampleConfigProvider>
          <button id='helpPath'>
            <ConfigContext.Consumer>
              {(value) => value.helpPath}
            </ConfigContext.Consumer>
          </button>
        </ExampleConfigProvider>
        <ExampleConfigProvider>
          <button id='docPath'>
            <ConfigContext.Consumer>
              {(value) => value.docPath}
            </ConfigContext.Consumer>
          </button>
        </ExampleConfigProvider>
        <ExampleConfigProvider>
          <button id='i18nPath'>
            <ConfigContext.Consumer>
              {(value) => value.i18nPath}
            </ConfigContext.Consumer>
          </button>
        </ExampleConfigProvider>
        <ExampleConfigProvider>
          <button id='icon'>
            <ConfigContext.Consumer>
              {(value) => value.icon}
            </ConfigContext.Consumer>
          </button>
        </ExampleConfigProvider>{' '}
      </>
    )

    exceptAllPropsOk(wrapper, rightVals)
  })
})

function exceptAllPropsOk(
  wrapper: ReactWrapper,
  rightVals: AbstractPopoverConfigProvider
): void {
  expect(wrapper.find('#pluginId').text()).toEqual(rightVals.getPluginId())
  expect(wrapper.find('#helpPath').text()).toEqual(rightVals.getHelpPath())
  expect(wrapper.find('#docPath').text()).toEqual(rightVals.getDocPath())
  expect(wrapper.find('#i18nPath').text()).toEqual(rightVals.getI18nPath())
  expect(wrapper.find('#icon').text()).toEqual(rightVals.getIcon())
}
