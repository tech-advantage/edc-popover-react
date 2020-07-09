import React from 'react'
import { HelperFactory } from '../helper/HelperFactory'
import { OverlayTriggerType } from 'react-bootstrap/OverlayTrigger'
import { EdcIconData, FailBehavior } from '..'
import { Placement } from 'react-bootstrap/Overlay'

export type PopoverConfig = {
  pluginId: string
  helpPath: string
  docPath: string
  i18nPath: string
  icon?: EdcIconData
  lang?: string
  dark?: boolean
  placement?: Placement
  trigger?: OverlayTriggerType | OverlayTriggerType[]
  failBehavior?: FailBehavior

  // Only backend side, if you want to use your custom helpFactory
  helpFactory?: Function
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
    value.helpFactory = (): HelperFactory => new HelperFactory(value)
  }

  value.docPath = value.docPath.replace(/[/]*$/gm, '') + '/'
  value.helpPath = value.helpPath.replace(/[/]*$/gm, '') + '/'
  return (
    <PopoverConfigContext.Provider value={{ ...defaultConfig, ...value }}>
      {children}
    </PopoverConfigContext.Provider>
  )
}
