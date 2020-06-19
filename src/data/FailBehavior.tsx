import { EdcIconData } from '..'

/**
 *   Defines the behavior when an error occured:
 *    - ERROR_SHOWN: A red exclamation point replace the provided help icon and an error text is shown in popover
 *    - FRIENDLY_MSG: The provided help icon remains untouched but the popover content is set to a friendly message (like "Documentation coming soon ...")
 *    - NO_POPOVER: The provided help icon remains untouched but no popover is opened when triggered
 *    - HIDDEN_ICON: The help icon is hidden
 */
export type FailBehavior = {
  popover: 'ERROR_SHOWN' | 'FRIENDLY_MSG' | 'NO_POPOVER'
  icon: 'SHOWN' | 'DISABLED' | 'HIDDEN' | 'ERROR'
}

export const defaultFailBehavior: FailBehavior = {
  popover: 'FRIENDLY_MSG',
  icon: 'SHOWN'
}

export type BehaviorData = {
  displayIcon: EdcIconData
  errorIcon: EdcIconData
  friendlyMsg?: string
  iconAlt?: string
  forceBehavior?: FailBehavior
}
