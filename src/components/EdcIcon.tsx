import { EdcHelpProps } from './EdcHelpData'
import React from 'react'

export type EdcIconData =
  | string
  | {
      type: 'class' | 'url'
      content?: string
    }

export type EdcIconProps = {
  icon: EdcIconData
  edcHelpProps: EdcHelpProps
}

export function EdcIcon(props: EdcIconProps): JSX.Element {
  const cssClass = 'help-icon' + (props.edcHelpProps.dark ? ' on-dark' : '')

  if (typeof props.icon === 'string') {
    return <i {...props} className={`${props.icon} ${cssClass}`} />
  }
  if (props.icon.type === 'class') {
    return <i {...props} className={`${props.icon.content} ${cssClass}`} />
  }
  return (
    <img
      {...props}
      className={cssClass}
      src={props.icon.content}
      alt='Popover icon'
    />
  )
}
