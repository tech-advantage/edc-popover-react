import { HelperFactory } from './HelperFactory'
import { EdcClient } from 'edc-client-js'

beforeEach(() => {
  jest
    .spyOn(EdcClient.prototype, 'getHelper')
    .mockReturnValue(Promise.resolve())
  jest
    .spyOn(EdcClient.prototype, 'getContextWebHelpUrl')
    .mockReturnValue('/doc/context/test')
  jest
    .spyOn(EdcClient.prototype, 'getDocumentationWebHelpUrl')
    .mockReturnValue('/doc/documentation/test')
})

describe('HelperFactory', () => {
  const fullHelper = new HelperFactory({
    pluginId: 'edchelp',
    helpPath: '/help',
    docPath: '/doc',
    i18nPath: '/doc/i18n'
  })
  it('should create an empty HelperFactory with default constructor', () => {
    const emptyHelper = new HelperFactory()

    expect(emptyHelper.getContextUrl('dummy', 'dummy', -1)).toBeUndefined()
    expect(emptyHelper.getHelp('dummy', 'dummy')).toBeUndefined()
    expect(emptyHelper.getDocumentationUrl(-1)).toBeUndefined()
  })

  it('should handle default args', () => {
    fullHelper.getHelp('mainKey', 'subKey')
    expect(EdcClient.prototype.getHelper).toHaveBeenCalledWith(
      'mainKey',
      'subKey',
      'edchelp',
      undefined
    )

    fullHelper.getHelp('mainKey', 'subKey', 'edctest')
    expect(EdcClient.prototype.getHelper).toHaveBeenCalledWith(
      'mainKey',
      'subKey',
      'edctest',
      undefined
    )

    fullHelper.getContextUrl('mainKey', 'subKey', 1)
    expect(EdcClient.prototype.getContextWebHelpUrl).toHaveBeenCalledWith(
      'mainKey',
      'subKey',
      '',
      1,
      undefined
    )

    fullHelper.getContextUrl('mainKey', 'subKey', 1, 'fr', 'edctest')
    expect(EdcClient.prototype.getContextWebHelpUrl).toHaveBeenCalledWith(
      'mainKey',
      'subKey',
      'fr',
      1,
      'edctest'
    )

    fullHelper.getDocumentationUrl(12)
    expect(EdcClient.prototype.getDocumentationWebHelpUrl).toHaveBeenCalledWith(
      12,
      undefined
    )

    fullHelper.getDocumentationUrl(12, 'fr')
    expect(EdcClient.prototype.getDocumentationWebHelpUrl).toHaveBeenCalledWith(
      12,
      'fr'
    )
  })
})
