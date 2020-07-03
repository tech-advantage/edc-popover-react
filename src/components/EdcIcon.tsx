import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import React from 'react'
import { FailBehavior } from '..'
import { defaultFailBehavior } from '../data/FailBehavior'

export type EdcIconData =
  | string
  | {
      type: 'class' | 'url'
      content?: string
    }

export type EdcIconProps = {
  data: PopoverData
  edcHelpProps: EdcHelpProps
  failBehavior?: FailBehavior
}

function getIconContent(icon: EdcIconData): string | undefined {
  return typeof icon === 'string' ? icon : icon.content
}

export function EdcIcon(props: EdcIconProps): JSX.Element {
  const { data, edcHelpProps, failBehavior, ...newProps } = props
  const behaviorData = data.failBehaviorData
  let icon = getIconContent(behaviorData.displayIcon)
  let cssClass = ''
  let forceCss = false
  if (data.triggerError) {
    let newFailBehavior = failBehavior

    if (!newFailBehavior) {
      newFailBehavior = defaultFailBehavior
    }

    newFailBehavior = data.failBehaviorData.forceBehavior || newFailBehavior

    switch (newFailBehavior.icon) {
      case 'SHOWN':
        cssClass += 'help-icon'
        break
      case 'DISABLED':
        cssClass += 'help-icon-disabled'
        break
      case 'HIDDEN':
        cssClass += 'help-icon-hidden'
        break
      case 'ERROR':
        forceCss = true
        cssClass += 'help-icon-error'
        icon = getIconContent(behaviorData.errorIcon)
    }
  } else {
    cssClass += 'help-icon'
  }

  cssClass += edcHelpProps.dark ? ' on-dark' : ''

  return forceCss ||
    typeof behaviorData.displayIcon === 'string' ||
    behaviorData.displayIcon.type === 'class' ? (
    <i {...newProps} className={`${icon} ${cssClass}`} />
  ) : (
    <img
      {...newProps}
      className={cssClass}
      src={icon}
      alt={behaviorData.iconAlt || 'Help'}
    />
  )
}
