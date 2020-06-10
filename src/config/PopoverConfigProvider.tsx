import React from 'react'
import { HelperFactory } from '../helper/HelperFactory'

export type PopoverConfig = {
  pluginId: string
  helpPath: string
  docPath: string
  i18nPath: string
  icon?: string
  helpFactory?: HelperFactory
}

export const defaultConfig: PopoverConfig = {
  pluginId: '',
  helpPath: '',
  docPath: '',
  i18nPath: '',
  icon: 'far fa-question-circle'
}

export const PopoverConfigContext = React.createContext<PopoverConfig>(
  defaultConfig
)

export function PopoverProvider(
  props: PopoverConfig & { children: React.ReactNode }
): JSX.Element {
  const { children, ...value } = props

  if (!value.helpFactory) {
    value.helpFactory = new HelperFactory(value)
  }

  value.docPath = value.docPath.replace(/[/]*$/gm, '') + '/'
  value.helpPath = value.helpPath.replace(/[/]*$/gm, '') + '/'
  return (
    <PopoverConfigContext.Provider value={{ ...defaultConfig, ...value }}>
      {children}
    </PopoverConfigContext.Provider>
  )
}