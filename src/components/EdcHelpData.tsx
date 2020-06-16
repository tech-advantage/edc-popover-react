import { Placement } from 'react-bootstrap/Overlay'
import { OverlayTriggerType } from 'react-bootstrap/OverlayTrigger'
import { EdcIconData } from './EdcIcon'

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
  fetched: boolean
  id: string
  title: string | JSX.Element
  content: string | JSX.Element
  icon: EdcIconData
}
