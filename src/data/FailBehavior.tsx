import { EdcIconData } from '..'

/**
 *   @see /README.md#Fail-behavior
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
  iconAlt?: string
  forceBehavior?: FailBehavior
}
