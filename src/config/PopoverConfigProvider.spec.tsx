import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import {
  EdcPopoverProvider,
  EdcPopoverConfig,
  PopoverConfigContext,
  defaultConfig
} from './PopoverConfigProvider'

function exceptAllPropsOk(
  wrapper: ReactWrapper,
  rightVals: EdcPopoverConfig
): void {
  expect(wrapper.find('#pluginId').text()).toEqual(rightVals.pluginId)
  expect(wrapper.find('#helpPath').text()).toEqual(rightVals.helpPath)
  expect(wrapper.find('#docPath').text()).toEqual(rightVals.docPath)
  expect(wrapper.find('#i18nPath').text()).toEqual(rightVals.i18nPath)
  expect(wrapper.find('#icon').text()).toEqual(rightVals.icon)
}

describe('AbstractPopoverConfigProvider', () => {
  const rightProps: EdcPopoverConfig = {
    ...defaultConfig,
    ...{
      pluginId: 'mypluginid',
      docPath: '/',
      helpPath: '/help',
      i18nPath: '/doc/i18n'
    }
  }
  it('should allow to fetch all props from ConfigContext', () => {
    const wrapper = mount(
      <EdcPopoverProvider
        pluginId={rightProps.pluginId}
        docPath={rightProps.docPath}
        helpPath={rightProps.helpPath}
        i18nPath={rightProps.i18nPath}
      >
        <button id='pluginId'>
          <PopoverConfigContext.Consumer>
            {(value): string => value.pluginId}
          </PopoverConfigContext.Consumer>
        </button>
        <button id='helpPath'>
          <PopoverConfigContext.Consumer>
            {(value): string => value.helpPath}
          </PopoverConfigContext.Consumer>
        </button>
        <button id='docPath'>
          <PopoverConfigContext.Consumer>
            {(value): string => value.docPath}
          </PopoverConfigContext.Consumer>
        </button>
        <button id='i18nPath'>
          <PopoverConfigContext.Consumer>
            {(value): string => value.i18nPath}
          </PopoverConfigContext.Consumer>
        </button>
        <button id='icon'>
          <PopoverConfigContext.Consumer>
            {(value): string | undefined => value.icon?.toString()}
          </PopoverConfigContext.Consumer>
        </button>
      </EdcPopoverProvider>
    )

    exceptAllPropsOk(wrapper, rightProps)
  })

  it('should handle multiple declaration of implemented provider', () => {
    const wrapper = mount(
      <>
        <EdcPopoverProvider
          pluginId={rightProps.pluginId}
          docPath={rightProps.docPath}
          helpPath={rightProps.helpPath}
          i18nPath={rightProps.i18nPath}
        >
          <button id='pluginId'>
            <PopoverConfigContext.Consumer>
              {(value): string => value.pluginId}
            </PopoverConfigContext.Consumer>
          </button>
        </EdcPopoverProvider>
        <EdcPopoverProvider
          pluginId={rightProps.pluginId}
          docPath={rightProps.docPath}
          helpPath={rightProps.helpPath}
          i18nPath={rightProps.i18nPath}
        >
          <button id='helpPath'>
            <PopoverConfigContext.Consumer>
              {(value): string => value.helpPath}
            </PopoverConfigContext.Consumer>
          </button>
        </EdcPopoverProvider>
        <EdcPopoverProvider
          pluginId={rightProps.pluginId}
          docPath={rightProps.docPath}
          helpPath={rightProps.helpPath}
          i18nPath={rightProps.i18nPath}
        >
          <button id='docPath'>
            <PopoverConfigContext.Consumer>
              {(value): string => value.docPath}
            </PopoverConfigContext.Consumer>
          </button>
        </EdcPopoverProvider>
        <EdcPopoverProvider
          pluginId={rightProps.pluginId}
          docPath={rightProps.docPath}
          helpPath={rightProps.helpPath}
          i18nPath={rightProps.i18nPath}
        >
          <button id='i18nPath'>
            <PopoverConfigContext.Consumer>
              {(value): string => value.i18nPath}
            </PopoverConfigContext.Consumer>
          </button>
        </EdcPopoverProvider>
        <EdcPopoverProvider
          pluginId={rightProps.pluginId}
          docPath={rightProps.docPath}
          helpPath={rightProps.helpPath}
          i18nPath={rightProps.i18nPath}
        >
          <button id='icon'>
            <PopoverConfigContext.Consumer>
              {(value): string | undefined => value.icon?.toString()}
            </PopoverConfigContext.Consumer>
          </button>
        </EdcPopoverProvider>
      </>
    )

    exceptAllPropsOk(wrapper, rightProps)
  })
})
