import { PopoverConfigHandler } from './PopoverConfigHandler'

describe('PopoverConfigHandler', () => {
  it('should create an empty PopoverConfigHandler (all vars shoudl be undefined)', () => {
    const defaultPopover = new PopoverConfigHandler()

    expect(defaultPopover.getPluginId() === undefined)
    expect(defaultPopover.getIcon() === undefined)
    expect(defaultPopover.geti18nPath() === undefined)
    expect(defaultPopover.getDocPath() === undefined)
    expect(defaultPopover.getHelpPath() === undefined)
    expect(defaultPopover.getEdcClient() === undefined)
    expect(defaultPopover.isEmpty())
  })

  it('should create an filled PopoverConfigHandler (all vars are instancied)', () => {
    const pluginId = 'edcplugin'
    const docPath = '/doc'
    const helpPath = '/help'
    const i18nPath = '/i18n'
    const icon = 'far fa-ad'
    const defaultPopover = new PopoverConfigHandler(
      pluginId,
      helpPath,
      docPath,
      i18nPath,
      icon
    )

    expect(defaultPopover.getPluginId() === pluginId)
    expect(defaultPopover.getIcon() === icon)
    expect(defaultPopover.geti18nPath() === i18nPath)
    expect(defaultPopover.getDocPath() === docPath)
    expect(defaultPopover.getHelpPath() === helpPath)
    expect(defaultPopover.getEdcClient() !== undefined)
    expect(!defaultPopover.isEmpty())
  })
})
