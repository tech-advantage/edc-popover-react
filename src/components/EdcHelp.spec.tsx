import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { EdcHelp } from './EdcHelp'
import { EdcPopoverProvider } from '..'
import { Popover, PopoverConfig } from 'edc-popover-utils'
import waitForExpect from 'wait-for-expect'
import { HelperFactory } from '../helper/HelperFactory'
import { Helper, PopoverError, PopoverLabel } from 'edc-client-js'
import { act } from 'react-dom/test-utils'

const content = 'Content'
const title = 'Title'
const dummyUrl = 'dummyUrl'

describe('EdcHelp', () => {
  let mockedInitPopover: jest.SpyInstance<void, [PopoverConfig]>
  const correctPopoverConfig = (): PopoverConfig | undefined => {
    const correctArray = mockedInitPopover.mock.calls.filter(
      (val) =>
        val[0].labels !== undefined && val[0].labels.comingSoon !== undefined
    )
    return correctArray.length > 0
      ? correctArray[correctArray.length - 1][0]
      : undefined
  }

  jest
    .spyOn(HelperFactory.prototype, 'edcClientFactory')
    .mockReturnValue(undefined)

  jest.spyOn(HelperFactory.prototype, 'getHelp').mockImplementation(() => {
    const helper = new Helper()
    helper.label = title
    helper.description = content
    return Promise.resolve(helper)
  })
  jest
    .spyOn(HelperFactory.prototype, 'getPopoverLabels')
    .mockImplementation(() => {
      const labels = new PopoverLabel()
      labels.comingSoon = 'comingSoon'
      labels.errors = new PopoverError()
      labels.errors.failedData = 'Failed data'
      labels.errorTitle = 'Error title'
      return Promise.resolve(labels)
    })
  jest
    .spyOn(HelperFactory.prototype, 'getContextUrl')
    .mockImplementation(() => dummyUrl)
  jest
    .spyOn(HelperFactory.prototype, 'getDocumentationUrl')
    .mockImplementation(() => dummyUrl)

  const casualEdcHelpClick = (): ReactWrapper =>
    mount(
      <EdcPopoverProvider
        pluginId='myedchelp'
        docPath='/doc'
        helpPath='/help'
        i18nPath='/doc/i18n'
        icon='fas fa-test'
      >
        <EdcHelp mainKey='a' subKey='b' options={{ trigger: 'click' }} />
      </EdcPopoverProvider>
    )

  const casualEdcHelpSVG = (): ReactWrapper =>
    mount(
      <EdcPopoverProvider
        pluginId='myedchelp'
        docPath='/doc'
        helpPath='/help'
        i18nPath='/doc/i18n'
        icon={{ type: 'url', content: '/icon.svg' }}
      >
        <EdcHelp mainKey='a' subKey='b' options={{ trigger: 'click' }} />
      </EdcPopoverProvider>
    )

  const casualEdcHelpHover = (): ReactWrapper =>
    mount(
      <EdcPopoverProvider
        pluginId='myedchelp'
        docPath='/doc'
        helpPath='/help'
        i18nPath='/doc/i18n'
      >
        <EdcHelp mainKey='a' subKey='b' options={{ trigger: 'mouseenter' }} />
      </EdcPopoverProvider>
    )

  const malformedEdcHelp = mount(<EdcHelp mainKey='a' subKey='b' />)

  it('should render a yellow triangle icon if no provider are present as ', () => {
    expect(
      malformedEdcHelp.find('i').hasClass('fa-exclamation-triangle')
    ).toBeTruthy()
  })

  it('should render a <i /> to display the icon', async () => {
    act(() => {
      const wrapper = casualEdcHelpClick()
      expect(wrapper.find('i').length).toEqual(1)
    })
  })
  it('should correctly display a SVG in a img div', () => {
    act(() => {
      const wrapper = casualEdcHelpSVG()
      expect(wrapper.find('img').length).toEqual(1)
    })
  })
  it('should display a popover on click', async () => {
    await act(async () => {
      if (mockedInitPopover) {
        mockedInitPopover.mockClear()
      }
      mockedInitPopover = jest.spyOn(Popover.prototype, 'buildPopover')
      casualEdcHelpClick()
      let config = correctPopoverConfig()
      await waitForExpect(() => {
        expect((config = correctPopoverConfig())).not.toBeUndefined()
      })
      expect(config?.options?.trigger).toBe('click')
      expect(config?.content.title).toBe(title)
      expect(config?.content.description).toBe(content)
    })
  })
  it('should display a popover on hover', async () => {
    await act(async () => {
      if (mockedInitPopover) {
        mockedInitPopover.mockClear()
      }
      mockedInitPopover = jest.spyOn(Popover.prototype, 'buildPopover')
      casualEdcHelpHover()
      let config = correctPopoverConfig()
      await waitForExpect(() => {
        expect((config = correctPopoverConfig())).not.toBeUndefined()
      })
      expect(config?.options?.trigger).toBe('mouseenter')
      expect(config?.content.title).toBe(title)
      expect(config?.content.description).toBe(content)
    })
  })
})
