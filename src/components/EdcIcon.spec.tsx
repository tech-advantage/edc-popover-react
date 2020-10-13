import React from 'react'
import { EdcIcon, EdcIconData } from './EdcIcon'
import { mount } from 'enzyme'
import { PopoverData } from '../data/EdcHelpData'
import { EdcPopoverConfig } from '../config/PopoverConfigProvider'
import { PopoverContent, PopoverLabels } from 'edc-popover-utils'

describe('EdcIcon', () => {
  const config: EdcPopoverConfig = {
    pluginId: 'pluginId',
    docPath: 'docPath',
    helpPath: 'helpPath',
    i18nPath: 'i18n'
  }
  const data: PopoverData = {
    triggerError: false,
    content: new PopoverContent('myTitle', 'myContent'),
    labels: new PopoverLabels(),
    failBehaviorData: {
      displayIcon: 'displayIcon',
      errorIcon: 'errorIcon'
    }
  }

  const defaultStringIcon: EdcIconData = 'myClass'
  const cssEdcIcon: EdcIconData = {
    type: 'class',
    content: 'myIconClass'
  }
  const urlEdcIcon: EdcIconData = {
    type: 'url',
    content: 'myUrl'
  }

  it('should display an <i /> when EdcIconData is just a string', () => {
    data.failBehaviorData.displayIcon = defaultStringIcon
    const wrapper = mount(
      <EdcIcon
        data={data}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
        config={config}
      />
    )
    expect(wrapper.find('i').length).toEqual(1)
    expect(wrapper.find('i').hasClass(defaultStringIcon)).toBeTruthy()
  })

  it('should display an <img /> when EdcIconData has provided an URL', () => {
    data.failBehaviorData.displayIcon = urlEdcIcon
    const wrapper = mount(
      <EdcIcon
        data={data}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
        config={config}
      />
    )
    expect(wrapper.find('img').length).toEqual(1)
    expect(wrapper.find('img').prop('src')).toEqual(urlEdcIcon.content)
  })

  it('should display an <i /> when EdcIconData has provided a CSS class', () => {
    data.failBehaviorData.displayIcon = cssEdcIcon
    const wrapper = mount(
      <EdcIcon
        data={data}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
        config={config}
      />
    )
    expect(wrapper.find('i').length).toEqual(1)
    expect(cssEdcIcon.content).not.toBeUndefined()
    expect(wrapper.find('i').hasClass(cssEdcIcon.content || '')).toBeTruthy()
  })

  it('should handle dark mode when enabled', () => {
    data.failBehaviorData.displayIcon = cssEdcIcon
    config.options = {
      dark: true
    }
    const wrapper = mount(
      <EdcIcon
        data={data}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
        config={config}
      />
    )

    expect(wrapper.find('i').hasClass('edc-on-dark')).toBeTruthy()
    config.options = undefined
  })
})
