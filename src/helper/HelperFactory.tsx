import { EdcClient, Helper, PopoverLabel } from 'edc-client-js'
import { PopoverConfig } from '../config/PopoverConfigProvider'

export class HelperFactory {
  private readonly edcClient?: EdcClient
  private readonly popoverConfig?: PopoverConfig

  constructor(popoverConfig?: PopoverConfig) {
    this.popoverConfig = popoverConfig
    if (popoverConfig) {
      this.edcClient = popoverConfig.pluginId
        ? new EdcClient(
            popoverConfig.docPath,
            popoverConfig.helpPath,
            popoverConfig.pluginId,
            true,
            popoverConfig.i18nPath
          )
        : undefined
    }
  }

  getHelp(
    mainKey: string,
    subKey: string,
    pluginId?: string,
    lang?: string
  ): Promise<Helper> {
    return !this.edcClient
      ? undefined
      : this.edcClient.getHelper(
          mainKey,
          subKey,
          pluginId || this.popoverConfig?.pluginId || '',
          lang
        )
  }

  getContextUrl(
    mainKey: string,
    subKey: string,
    articleIndex: number,
    lang?: string,
    pluginId?: string
  ): string | undefined {
    return !this.edcClient
      ? undefined
      : this.edcClient.getContextWebHelpUrl(
          mainKey,
          subKey,
          lang || '',
          articleIndex,
          pluginId
        )
  }

  getDocumentationUrl(docId: number, lang?: string): string | undefined {
    return !this.edcClient
      ? undefined
      : this.edcClient.getDocumentationWebHelpUrl(docId, lang)
  }

  getPopoverLabels(lang?: string, pluginId?: string): Promise<PopoverLabel> {
    return !this.edcClient
      ? undefined
      : this.edcClient.getPopoverLabels(lang, pluginId)
  }

  getEdcClient(): EdcClient | undefined {
    return this.edcClient
  }
}
