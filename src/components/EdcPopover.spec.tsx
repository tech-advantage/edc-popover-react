import { EdcPopover } from './EdcPopover'
import { mount } from 'enzyme'
import React from 'react'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { PopoverConfig } from '../config/PopoverConfigProvider'
import { PopoverContent, PopoverTitle } from 'react-bootstrap'
import { EdcIcon } from './EdcIcon'

describe('EdcPopover', () => {
  const edcHelpProps: EdcHelpProps = {
    mainKey: 'main',
    subKey: 'sub'
  }
  const config: PopoverConfig = {
    pluginId: 'pluginId',
    helpPath: 'helpPath',
    docPath: 'failingDocPath',
    i18nPath: 'i18n',
    failBehavior: {
      popover: 'ERROR_SHOWN',
      icon: 'ERROR'
    }
  }
  const popoverData: PopoverData = {
    fetched: true,
    triggerError: true,
    id: 'myId',
    title: 'myTitle',
    content: 'myContent',
    failBehaviorData: {
      displayIcon: 'displayIcon',
      errorIcon: 'errorIcon',
      friendlyMsg: 'myFriendlyMessage'
    }
  }

  it('should handle properly the failed behavior : ERROR_SHOWN', () => {
    config.failBehavior = {
      popover: 'ERROR_SHOWN',
      icon: 'ERROR'
    }
    const wrapper = mount(
      <EdcPopover edcHelp={edcHelpProps} config={config} data={popoverData} />
    )
    wrapper.simulate('click')

    expect(wrapper.find(PopoverContent).text()).toContain(popoverData.content)
    expect(wrapper.find(PopoverTitle).text()).toContain(popoverData.title)
    expect(
      wrapper
        .find(EdcIcon)
        .hasClass(popoverData.failBehaviorData.errorIcon.toString())
    )
  })
  it('should handle properly the failed behavior : FRIENDLY_MSG', () => {
    config.failBehavior = {
      popover: 'FRIENDLY_MSG',
      icon: 'ERROR'
    }
    const wrapper = mount(
      <EdcPopover edcHelp={edcHelpProps} config={config} data={popoverData} />
    )
    wrapper.simulate('click')

    expect(wrapper.find(PopoverContent).text()).toEqual('')
    expect(wrapper.find(PopoverTitle).text()).toContain(
      popoverData.failBehaviorData.friendlyMsg
    )
    expect(
      wrapper
        .find(EdcIcon)
        .hasClass(popoverData.failBehaviorData.errorIcon.toString())
    )
  })
})
