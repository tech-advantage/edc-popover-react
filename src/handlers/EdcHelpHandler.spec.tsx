import { HelperFactory } from '../helper/HelperFactory'
import {
  Helper,
  Article,
  Link,
  ArticleType,
  PopoverLabel,
  PopoverError
} from 'edc-client-js'
import { EdcPopoverConfig } from '../config/PopoverConfigProvider'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
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

const correctPopoverLabel = new PopoverLabel()
correctPopoverLabel.articles = 'Need more...'
correctPopoverLabel.links = 'Related topics'
correctPopoverLabel.iconAlt = 'Help'
correctPopoverLabel.comingSoon = 'myComingSoon'
const correctPopoverError = new PopoverError()
correctPopoverError.failedData = 'myFailedData'
correctPopoverLabel.errors = correctPopoverError

const popoverConfig: EdcPopoverConfig = {
  pluginId: 'myPluginId',
  helpPath: '/help',
  docPath: '/doc',
  i18nPath: '/doc/i18n',
  icon: 'myIcon'
}
popoverConfig.helpFactory = (): HelperFactory =>
  new HelperFactory(popoverConfig)

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

    jest
      .spyOn(HelperFactory.prototype, 'getPopoverLabels')
      .mockReturnValue(Promise.resolve(correctPopoverLabel))

    const callback: React.Dispatch<React.SetStateAction<PopoverData>> = (
      dataAction: SetStateAction<PopoverData>
    ) => {
      const data = dataAction as PopoverData

      expect(getText(data.content.title)).toEqual(correctHelper.label)
      expect(getText(data.content.articles[0].label)).toEqual(article1.label)
      expect(getText(data.content.links[0].label)).toContain(link1.label)
      expect(getText(data.content.description)).toContain(
        correctHelper.description
      )
      expect(data.failBehaviorData.displayIcon).toContain(popoverConfig.icon)
      done()
    }

    buildData(popoverConfig, edcHelpProps, callback, true)
  })

  it('should catch and display a correct error with undefined helper', (done) => {
    jest.spyOn(HelperFactory.prototype, 'getHelp').mockReturnValue(
      new Promise<Helper>(() => {
        throw new Error()
      })
    )

    jest
      .spyOn(HelperFactory.prototype, 'getPopoverLabels')
      .mockReturnValue(Promise.resolve(correctPopoverLabel))

    const callback: React.Dispatch<React.SetStateAction<PopoverData>> = (
      dataAction: SetStateAction<PopoverData>
    ) => {
      const data = dataAction as PopoverData
      expect(getText(data.content.title)).not.toEqual(correctHelper.label)
      expect(getText(data.content.description)).toEqual(
        correctPopoverError.failedData
      )
      done()
    }

    buildData(popoverConfig, edcHelpProps, callback, true)
  })

  it('should catch and display a message if no provider is a deep parent', (done) => {
    jest
      .spyOn(HelperFactory.prototype, 'getHelp')
      .mockReturnValue(Promise.resolve(correctHelper))

    jest
      .spyOn(HelperFactory.prototype, 'getPopoverLabels')
      .mockReturnValue(Promise.resolve(correctPopoverLabel))

    const savedHelp = popoverConfig.helpFactory
    popoverConfig.helpFactory = undefined

    const callback: React.Dispatch<React.SetStateAction<PopoverData>> = (
      dataAction: SetStateAction<PopoverData>
    ) => {
      const data = dataAction as PopoverData
      expect(getText(data.content.title)).not.toEqual(correctHelper.label)
      expect(data.content.articles.length).toEqual(0)
      expect(data.content.links.length).toEqual(0)
      expect(getText(data.content.description)).not.toContain(
        correctHelper.description
      )

      popoverConfig.helpFactory = savedHelp
      done()
    }

    buildData(popoverConfig, edcHelpProps, callback, true)
  })

  it('should handle default translation in context if not overriden by props', (done) => {
    jest
      .spyOn(HelperFactory.prototype, 'getHelp')
      .mockReturnValue(Promise.resolve(correctHelper))
    jest
      .spyOn(HelperFactory.prototype, 'getContextUrl')
      .mockReturnValue('contextUrl')
    jest
      .spyOn(HelperFactory.prototype, 'getDocumentationUrl')
      .mockReturnValue('docuUrl')
    jest
      .spyOn(HelperFactory.prototype, 'getPopoverLabels')
      .mockReturnValue(Promise.resolve(correctPopoverLabel))

    const callback: React.Dispatch<React.SetStateAction<PopoverData>> = () => {
      expect(HelperFactory.prototype.getHelp).toHaveBeenCalledWith(
        edcHelpProps.mainKey,
        edcHelpProps.subKey,
        undefined,
        'fr'
      )
      expect(HelperFactory.prototype.getDocumentationUrl).toHaveBeenCalledWith(
        link1.id,
        'fr'
      )
      expect(HelperFactory.prototype.getContextUrl).toHaveBeenCalledWith(
        edcHelpProps.mainKey,
        edcHelpProps.subKey,
        0,
        'fr',
        undefined
      )
      popoverConfig.lang = undefined
      done()
    }

    popoverConfig.lang = 'fr'
    buildData(popoverConfig, edcHelpProps, callback, true)
  })
})
