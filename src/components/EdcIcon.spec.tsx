import React from 'react'
import { EdcIcon, EdcIconData } from './EdcIcon'
import { mount } from 'enzyme'
import { EdcHelpProps } from './EdcHelpData'

describe('EdcIcon', () => {
  const dummyEdcHelpProps: EdcHelpProps = {
    mainKey: 'dummy',
    subKey: 'dummy'
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
    const wrapper = mount(
      <EdcIcon icon={defaultStringIcon} edcHelpProps={dummyEdcHelpProps} />
    )
    expect(wrapper.find('i').length).toEqual(1)
    expect(wrapper.find('i').hasClass(defaultStringIcon)).toBeTruthy()
  })

  it('should display an <img /> when EdcIconData has provided an URL', () => {
    const wrapper = mount(
      <EdcIcon icon={urlEdcIcon} edcHelpProps={dummyEdcHelpProps} />
    )
    expect(wrapper.find('img').length).toEqual(1)
    expect(wrapper.find('img').prop('src')).toEqual(urlEdcIcon.content)
  })

  it('should display an <i /> when EdcIconData has provided a CSS class', () => {
    const wrapper = mount(
      <EdcIcon icon={cssEdcIcon} edcHelpProps={dummyEdcHelpProps} />
    )
    expect(wrapper.find('i').length).toEqual(1)
    expect(cssEdcIcon.content).not.toBeUndefined()
    expect(wrapper.find('i').hasClass(cssEdcIcon.content || '')).toBeTruthy()
  })
})
