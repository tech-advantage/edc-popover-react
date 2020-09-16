import { PopoverData } from '../data/EdcHelpData'
import React, { forwardRef } from 'react'
import { FailBehavior } from '..'
import { EdcPopoverConfig } from '../config/PopoverConfigProvider'
import { defaultFailBehavior } from '../data/FailBehavior'

export type EdcIconData =
  | string
  | {
      type: 'class' | 'url'
      content?: string
    }

export type EdcIconProps = {
  data: PopoverData
  config: EdcPopoverConfig
  failBehavior?: FailBehavior
}

function getIconContent(icon: EdcIconData): string | undefined {
  return typeof icon === 'string' ? icon : icon.content
}

export const EdcIcon = forwardRef<HTMLImageElement, EdcIconProps>(
  (props, ref) => {
    const { data, config, failBehavior, ...newProps } = props
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
          cssClass += 'edc-help-icon'
          break
        case 'DISABLED':
          cssClass += 'edc-help-icon-disabled'
          break
        case 'HIDDEN':
          cssClass += 'edc-help-icon-hidden'
          break
        case 'ERROR':
          forceCss = true
          cssClass += 'edc-help-icon-error'
          icon = getIconContent(behaviorData.errorIcon)
      }
    } else {
      cssClass += 'edc-help-icon'
    }

    cssClass += config.options?.dark ? ' edc-on-dark' : ''

    return forceCss ||
      typeof behaviorData.displayIcon === 'string' ||
      behaviorData.displayIcon.type === 'class' ? (
      <i {...newProps} className={`${icon} ${cssClass}`} ref={ref} />
    ) : (
      <img
        {...newProps}
        className={cssClass}
        src={icon}
        alt={behaviorData.iconAlt || 'Help'}
        ref={ref}
      />
    )
  }
)
