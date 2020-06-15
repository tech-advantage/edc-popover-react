import { Placement } from 'react-bootstrap/Overlay'
import { OverlayTriggerType } from 'react-bootstrap/OverlayTrigger'

export type EdcHelpProps = {
  pluginId?: string
  mainKey: string // key is a reserved prop of React
  subKey: string
  placement?: Placement
  dark?: boolean
  lang?: string
  trigger?: OverlayTriggerType | OverlayTriggerType[]
  icon?: string
}

export type PopoverData = {
  fetched: boolean
  id: string
  title: string | JSX.Element
  content: string | JSX.Element
  icon: string
}
