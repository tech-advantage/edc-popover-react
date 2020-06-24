import React from 'react'
import { EdcIcon, EdcIconData } from './EdcIcon'
import { mount } from 'enzyme'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'

describe('EdcIcon', () => {
  const data: PopoverData = {
    fetched: true,
    triggerError: false,
    id: 'myId',
    title: 'myTitle',
    content: 'myContent',
    failBehaviorData: {
      displayIcon: 'displayIcon',
      errorIcon: 'errorIcon'
    }
  }
  const dummyEdcHelpProps: EdcHelpProps = {
    mainKey: 'dummy',
    subKey: 'dummy'
  }

  const dummyDarkEdcHelpProps: EdcHelpProps = {
    mainKey: 'dummy',
    subKey: 'dummy',
    dark: true
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
        edcHelpProps={dummyEdcHelpProps}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
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
        edcHelpProps={dummyEdcHelpProps}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
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
        edcHelpProps={dummyEdcHelpProps}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
      />
    )
    expect(wrapper.find('i').length).toEqual(1)
    expect(cssEdcIcon.content).not.toBeUndefined()
    expect(wrapper.find('i').hasClass(cssEdcIcon.content || '')).toBeTruthy()
  })

  it('should handle dark mode when enabled', () => {
    data.failBehaviorData.displayIcon = cssEdcIcon
    const wrapper = mount(
      <EdcIcon
        data={data}
        failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}
        edcHelpProps={dummyDarkEdcHelpProps}
      />
    )

    expect(wrapper.find('i').hasClass('on-dark')).toBeTruthy()
  })
})
