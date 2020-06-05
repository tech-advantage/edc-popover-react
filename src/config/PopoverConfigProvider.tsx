import React from 'react'
import { EdcClient } from 'edc-client-js'

export type PopoverConfig = {
  pluginId: string
  helpPath: string
  docPath: string
  i18nPath: string
  icon?: string
  edcClient?: EdcClient
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
  value.edcClient =
    value.pluginId && !value.edcClient
      ? new EdcClient(
          value.docPath,
          value.helpPath,
          value.pluginId,
          true,
          value.i18nPath
        )
      : undefined

  return (
    <PopoverConfigContext.Provider value={{ ...defaultConfig, ...value }}>
      {children}
    </PopoverConfigContext.Provider>
  )
}
