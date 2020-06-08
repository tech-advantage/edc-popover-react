import { HelperFactory } from '../helper/HelperFactory'
import { Helper, Article, Link, ArticleType } from 'edc-client-js'
import { PopoverConfig } from '../config/PopoverConfigProvider'
import { EdcHelpProps, PopoverData } from './EdcHelpData'
import React, { SetStateAction } from 'react'
import { buildData } from './EdcHelpHandler'
import { mount } from 'enzyme'

const article1 = new Article()
article1.label = 'Article1'

const link1 = new Link(1, 'Link1', ArticleType.DOCUMENT, 'myUrl')

const correctHelper = new Helper()
correctHelper.label = 'myTitle'
correctHelper.description = 'myDescription'
correctHelper.articles = [article1]
correctHelper.links = [link1]

const popoverConfig: PopoverConfig = {
  pluginId: 'myPluginId',
  helpPath: '/help',
  docPath: '/doc',
  i18nPath: '/doc/i18n',
  icon: 'myIcon'
}
popoverConfig.helpFactory = new HelperFactory(popoverConfig)

const edcHelpProps: EdcHelpProps = {
  mainKey: 'mainKey',
  subKey: 'subKey'
}

function getText(jsxOrStr: string | JSX.Element): string {
  return React.isValidElement(jsxOrStr)
    ? mount(jsxOrStr as JSX.Element).text()
    : (jsxOrStr as string)
}

describe('EdcHelpHandler', () => {
  it('should give correct data with correct input', (done) => {
    jest
      .spyOn(HelperFactory.prototype, 'getHelp')
      .mockReturnValue(Promise.resolve(correctHelper))

    const callback: React.Dispatch<React.SetStateAction<PopoverData>> = (
      dataAction: SetStateAction<PopoverData>
    ) => {
      const data = dataAction as PopoverData

      expect(data.fetched).toBeTruthy()
      expect(getText(data.title)).toEqual(correctHelper.label)
      expect(getText(data.content)).toContain(article1.label)
      expect(getText(data.content)).toContain(link1.label)
      expect(getText(data.content)).toContain(correctHelper.description)
      expect(data.icon).toContain(popoverConfig.icon)
      expect(data.id).toBeDefined()
      done()
    }

    buildData(popoverConfig, edcHelpProps, callback, true)
  })

  it('should catch and display a thrown error with undefined helper', (done) => {
    const errorMsg = 'MyErrorMsg'
    jest.spyOn(HelperFactory.prototype, 'getHelp').mockReturnValue(
      new Promise<Helper>(() => {
        throw new Error(errorMsg)
      })
    )

    const callback: React.Dispatch<React.SetStateAction<PopoverData>> = (
      dataAction: SetStateAction<PopoverData>
    ) => {
      const data = dataAction as PopoverData
      expect(data.fetched).toBeTruthy()
      expect(getText(data.title)).not.toEqual(correctHelper.label)
      expect(getText(data.content)).toContain(errorMsg)
      expect(data.icon).not.toContain(popoverConfig.icon)
      expect(data.id).toBeDefined()
      done()
    }

    buildData(popoverConfig, edcHelpProps, callback, true)
  })

  it('should catch and display a message if no provider is a deep parent', (done) => {
    jest
      .spyOn(HelperFactory.prototype, 'getHelp')
      .mockReturnValue(Promise.resolve(correctHelper))

    const savedFactory = popoverConfig.helpFactory
    popoverConfig.helpFactory = undefined

    const callback: React.Dispatch<React.SetStateAction<PopoverData>> = (
      dataAction: SetStateAction<PopoverData>
    ) => {
      const data = dataAction as PopoverData
      expect(data.fetched).toBeTruthy()
      expect(getText(data.title)).not.toEqual(correctHelper.label)
      expect(getText(data.content)).not.toContain(article1.label)
      expect(getText(data.content)).not.toContain(link1.label)
      expect(getText(data.content)).not.toContain(correctHelper.description)
      expect(data.icon).not.toContain(popoverConfig.icon)
      expect(data.id).toBeDefined()
      done()
    }

    buildData(popoverConfig, edcHelpProps, callback, true)
    popoverConfig.helpFactory = savedFactory
  })
})
