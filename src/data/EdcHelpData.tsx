import { EdcIconData } from '..'
import { BehaviorData } from './FailBehavior'
import { PopoverContent, PopoverLabels } from 'edc-popover-js'
import { IPopoverOptions } from 'edc-popover-js/src/classes/popover-options.interface'

export type EdcHelpProps = {
  pluginId?: string
  mainKey: string // key is a reserved prop of React
  subKey: string
  lang?: string
  icon?: EdcIconData
  options?: IPopoverOptions
}

export type PopoverData = {
  triggerError: boolean
  content: PopoverContent
  labels: PopoverLabels
  failBehaviorData: BehaviorData
}
