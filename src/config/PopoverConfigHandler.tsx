import { EdcClient } from 'edc-client-js'

/*
    In order to limit RAM usage of EdcClient, we're trying to make it as a service
    But in case of a custom plugin.id, we must reinstanciate an EdcClient
 */
export class PopoverConfigHandler {
  private readonly pluginId?: string
  private readonly helpPath?: string
  private readonly docPath?: string
  private readonly i18nPath?: string
  private readonly icon?: string
  private readonly edcClient?: EdcClient

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

    this.edcClient = this.createEdcClient(this.pluginId)
  }

  getPluginId(): string | undefined {
    return this.pluginId
  }

  getDocPath(): string | undefined {
    return this.docPath
  }

  getHelpPath(): string | undefined {
    return this.helpPath
  }

  geti18nPath(): string | undefined {
    return this.i18nPath
  }

  getIcon(): string | undefined {
    return this.icon
  }

  getEdcClient(): EdcClient | undefined {
    return this.edcClient
  }

  isEmpty(): boolean {
    return (
      !this.pluginId ||
      !this.helpPath ||
      !this.docPath ||
      !this.i18nPath ||
      !this.icon
    )
  }

  /*
       Can handle a custom pluginId for popover config
   */
  createEdcClient(pluginId?: string): EdcClient | undefined {
    return pluginId !== undefined && !this.isEmpty()
      ? new EdcClient(
          this.docPath,
          this.helpPath,
          pluginId,
          true,
          this.i18nPath
        )
      : undefined
  }
}
