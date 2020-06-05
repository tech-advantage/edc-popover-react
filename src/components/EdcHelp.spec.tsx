import React from 'react'
import { mount } from 'enzyme'
import { EdcHelp } from './EdcHelp'
import { PopoverProvider } from '..'

describe('EdcHelp', () => {
  it('should render a <i /> to display the icon', () => {
    const wrapper = mount(
      <PopoverProvider
        pluginId='myedchelp'
        docPath='/doc'
        helpPath='/help'
        i18nPath='/doc/i18n'
      >
        <EdcHelp mainKey='a' subKey='b' />
      </PopoverProvider>
    )
    expect(wrapper.find('i').length).toEqual(1)
  })
})
