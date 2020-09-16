import React from 'react'
import { HelperFactory } from '../helper/HelperFactory'
import { EdcIconData, FailBehavior } from '..'
import { IPopoverOptions } from 'edc-popover-utils'

export type EdcPopoverConfig = {
  pluginId: string
  helpPath: string
  docPath: string
  i18nPath: string
  icon?: EdcIconData
  lang?: string
  options?: IPopoverOptions
  failBehavior?: FailBehavior

  // Only backend side, if you want to use your custom helpFactory
  helpFactory?: Function
}

export const defaultConfig: EdcPopoverConfig = {
  pluginId: '',
  helpPath: '',
  docPath: '',
  i18nPath: '',
  icon: 'far fa-question-circle'
}

export const PopoverConfigContext = React.createContext<EdcPopoverConfig>(
  defaultConfig
)

export function EdcPopoverProvider(
  props: EdcPopoverConfig & { children: React.ReactNode }
): JSX.Element {
  const { children, ...value } = props

  if (!value.helpFactory) {
    value.helpFactory = (): HelperFactory => new HelperFactory(value)
  }

  value.docPath =
    value.docPath !== '/' ? value.docPath.replace(/[/]*$/gm, '') : '/'
  value.helpPath =
    value.helpPath !== '/' ? value.helpPath.replace(/[/]*$/gm, '') : '/'
  return (
    <PopoverConfigContext.Provider value={{ ...defaultConfig, ...value }}>
      {children}
    </PopoverConfigContext.Provider>
  )
}
