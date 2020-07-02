import { Placement } from 'react-bootstrap/Overlay'
import { OverlayTriggerType } from 'react-bootstrap/OverlayTrigger'
import { EdcIconData } from '..'
import { BehaviorData } from './FailBehavior'

export type EdcHelpProps = {
  pluginId?: string
  mainKey: string // key is a reserved prop of React
  subKey: string
  placement?: Placement
  dark?: boolean
  lang?: string
  trigger?: OverlayTriggerType | OverlayTriggerType[]
  icon?: EdcIconData
}

export type PopoverData = {
  triggerError: boolean
  id: string
  title: string | JSX.Element
  content: string | JSX.Element
  failBehaviorData: BehaviorData
}
