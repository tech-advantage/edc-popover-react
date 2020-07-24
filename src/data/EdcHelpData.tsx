import { EdcIconData } from '..'
import { BehaviorData } from './FailBehavior'
import { PopoverContent, PopoverLabels, PopoverOptions } from 'edc-popover-js'

export type EdcHelpProps = {
  pluginId?: string
  mainKey: string // key is a reserved prop of React
  subKey: string
  lang?: string
  icon?: EdcIconData
  options?: PopoverOptions
}

export type PopoverData = {
  triggerError: boolean
  content: PopoverContent
  labels: PopoverLabels
  failBehaviorData: BehaviorData
}
