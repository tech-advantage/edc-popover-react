import { EdcIconData } from '..'
import { BehaviorData } from './FailBehavior'
import { PopoverContent, PopoverLabels } from 'edc-popover-utils'
import { EdcIPopoverOptions } from '../components/EdcIPopoverOptions'

export type EdcHelpProps = {
  pluginId?: string
  mainKey: string // key is a reserved prop of React
  subKey: string
  lang?: string
  icon?: EdcIconData
  options?: EdcIPopoverOptions
}

export type PopoverData = {
  triggerError: boolean
  content: PopoverContent
  labels: PopoverLabels
  failBehaviorData: BehaviorData
}
