import { EdcPopover } from './EdcPopover'
import { mount } from 'enzyme'
import React from 'react'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { EdcPopoverConfig } from '../config/PopoverConfigProvider'
import { Popover, PopoverContent, PopoverLabels } from 'edc-popover-js'
import { act } from 'react-dom/test-utils'
import { PopoverConfig } from 'edc-popover-js/index'
import waitForExpect from 'wait-for-expect'

describe('EdcPopover', () => {
  const edcHelpProps: EdcHelpProps = {
    mainKey: 'main',
    subKey: 'sub'
  }
  const config: EdcPopoverConfig = {
    pluginId: 'pluginId',
    helpPath: 'helpPath',
    docPath: 'failingDocPath',
    i18nPath: 'i18n'
  }
  const labels = new PopoverLabels()
  labels.comingSoon = 'myFriendlyMessage'
  labels.articles = 'Articles'
  labels.links = 'Links'
  const popoverData: PopoverData = {
    triggerError: true,
    content: new PopoverContent('myTitle', 'myContent'),
    labels: labels,
    failBehaviorData: {
      displayIcon: 'displayIcon',
      errorIcon: 'errorIcon'
    }
  }

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

  beforeEach(() => {
    if (mockedInitPopover) {
      mockedInitPopover.mockClear()
    }
    mockedInitPopover = jest.spyOn(Popover.prototype, 'initPopover')
  })

  it('should handle properly the default behavior : FRIENDLY_MSG and SHOWN', async () => {
    await act(async () => {
      const wrapper = mount(
        <EdcPopover edcHelp={edcHelpProps} config={config} data={popoverData} />
      )
      let popConfig: PopoverConfig | undefined
      await waitForExpect(() => {
        expect((popConfig = correctPopoverConfig())).not.toBeUndefined()
      })
      expect(
        wrapper
          .find('i')
          .hasClass(popoverData.failBehaviorData.displayIcon.toString())
      ).toBeTruthy()
      expect(popConfig?.content.title).toBe('')
      expect(popConfig?.content.description).toBe('')
    })
  })

  it('should handle properly the failed behavior : ERROR_SHOWN', async () => {
    await act(async () => {
      config.failBehavior = {
        popover: 'ERROR_SHOWN',
        icon: 'ERROR'
      }
      mockedInitPopover = jest.spyOn(Popover.prototype, 'initPopover')
      const wrapper = mount(
        <EdcPopover edcHelp={edcHelpProps} config={config} data={popoverData} />
      )
      let popConfig: PopoverConfig | undefined
      await waitForExpect(() => {
        expect((popConfig = correctPopoverConfig())).not.toBeUndefined()
      })

      expect(popConfig?.content.title).toContain(popoverData.content.title)
      expect(popConfig?.content.description).toContain(
        popoverData.content.description
      )
      expect(
        wrapper
          .find('i')
          .hasClass(popoverData.failBehaviorData.errorIcon.toString())
      )
    })
  })
  it('should handle properly the failed behavior : FRIENDLY_MSG', async () => {
    await act(async () => {
      config.failBehavior = {
        popover: 'FRIENDLY_MSG',
        icon: 'ERROR'
      }
      const wrapper = mount(
        <EdcPopover edcHelp={edcHelpProps} config={config} data={popoverData} />
      )
      let popConfig: PopoverConfig | undefined
      await waitForExpect(() => {
        expect((popConfig = correctPopoverConfig())).not.toBeUndefined()
      })
      expect(
        wrapper
          .find('i')
          .hasClass(popoverData.failBehaviorData.errorIcon.toString())
      ).toBeTruthy()
      expect(popConfig?.content.title).toBe('')
      expect(popConfig?.content.description).toBe('')
    })
  })
  it('should handle properly the failed behavior : NO_POPOVER', () => {
    act(() => {
      config.failBehavior = {
        popover: 'NO_POPOVER',
        icon: 'ERROR'
      }
      const wrapper = mount(
        <EdcPopover edcHelp={edcHelpProps} config={config} data={popoverData} />
      )

      expect(mockedInitPopover).not.toBeCalled()
      expect(
        wrapper
          .find('i')
          .hasClass(popoverData.failBehaviorData.errorIcon.toString())
      ).toBeTruthy()
    })
  })
  it('should handle properly the correct behavior', async () => {
    await act(async () => {
      config.failBehavior = {
        popover: 'ERROR_SHOWN',
        icon: 'ERROR'
      }
      popoverData.triggerError = false
      const wrapper = mount(
        <EdcPopover edcHelp={edcHelpProps} config={config} data={popoverData} />
      )
      let popConfig: PopoverConfig | undefined
      await waitForExpect(() => {
        expect((popConfig = correctPopoverConfig())).not.toBeUndefined()
      })
      expect(
        wrapper
          .find('i')
          .hasClass(popoverData.failBehaviorData.displayIcon.toString())
      ).toBeTruthy()
      expect(popConfig?.content.title).toBe(popoverData.content.title)
      expect(popConfig?.content.description).toBe(
        popoverData.content.description
      )
    })
  })
})
