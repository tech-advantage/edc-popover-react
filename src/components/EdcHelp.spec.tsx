import React from 'react'
import { mount } from 'enzyme'
import { EdcHelp } from './EdcHelp'
import { PopoverProvider } from '..'
import { OverlayTrigger, PopoverContent, PopoverTitle } from 'react-bootstrap'

describe('EdcHelp', () => {
  const casualEdcHelpClick = mount(
    <PopoverProvider
      pluginId='myedchelp'
      docPath='/doc'
      helpPath='/help'
      i18nPath='/doc/i18n'
    >
      <EdcHelp mainKey='a' subKey='b' trigger='click' />
    </PopoverProvider>
  )

  const tempEdcHelp = mount(
    <PopoverProvider
      pluginId='myedchelp'
      docPath='/doc'
      helpPath='/help'
      i18nPath='/doc/i18n'
    >
      <EdcHelp mainKey='a' subKey='b' trigger='click' />
    </PopoverProvider>
  )

  tempEdcHelp.find(OverlayTrigger).simulate('click')

  const popover = tempEdcHelp.find('.popover')

  const casualEdcHelpHover = mount(
    <PopoverProvider
      pluginId='myedchelp'
      docPath='/doc'
      helpPath='/help'
      i18nPath='/doc/i18n'
    >
      <EdcHelp mainKey='a' subKey='b' trigger='hover' />
    </PopoverProvider>
  )

  const malformedEdcHelp = mount(<EdcHelp mainKey='a' subKey='b' />)

  it('should render a red cross if no provider as present as far parents', () => {
    expect(malformedEdcHelp.find('i').hasClass('fa-times'))
  })
  it('should render a <i /> to display the icon', () => {
    expect(casualEdcHelpClick.find('i').length).toEqual(1)
  })
  it('should display a popover on click', () => {
    casualEdcHelpClick.find(OverlayTrigger).simulate('click')
    expect(casualEdcHelpClick.find('.popover').length).toBeGreaterThanOrEqual(1)
  })
  it('should display a popover on hover', () => {
    casualEdcHelpHover.find(OverlayTrigger).simulate('mouseOver')
    expect(casualEdcHelpHover.find('.popover').length).toBeGreaterThanOrEqual(1)
  })
  it('should have a popover with a title', () => {
    expect(popover.find(PopoverTitle).length).toEqual(1)
  })
  it('should have a popover with a content', () => {
    expect(popover.find(PopoverContent).length).toEqual(1)
  })
})
