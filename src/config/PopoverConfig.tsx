export class PopoverConfig {
  pluginId: string | undefined
  helpPath: string | undefined
  docPath: string | undefined
  i18nPath: string | undefined
  icon: string | undefined

  constructor(
    pluginId?: string,
    helpPath?: string,
    docPath?: string,
    i18nPath?: string,
    icon?: string
  ) {
    this.pluginId = pluginId
    this.helpPath = helpPath
    this.docPath = docPath
    this.i18nPath = i18nPath
    this.icon = icon
  }
}
