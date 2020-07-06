import React from 'react'
import { EdcIcon } from './EdcIcon'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { PopoverConfig } from '../config/PopoverConfigProvider'
import { OverlayChildren } from 'react-bootstrap/Overlay'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { defaultFailBehavior } from '../data/FailBehavior'
import { getDark, getPlacement } from '../handlers/EdcHelpHandler'

export type EdcPopoverProps = {
  edcHelp: EdcHelpProps
  config: PopoverConfig
  data: PopoverData
}

export function getEdcIcon(props: EdcPopoverProps): JSX.Element {
  return (
    <EdcIcon
      data={props.data}
      config={props.config}
      edcHelpProps={props.edcHelp}
      failBehavior={props.config.failBehavior}
    />
  )
}

/*
 * Can't create a functional component, OverlayTrigger cannot handle properly custom React Components
 * Temporary workaround: Function returning JSX.Element
 */
export function getEdcPopover(
  props: EdcPopoverProps,
  hideContent?: boolean
): JSX.Element {
  return (
    <Popover
      id={props.data.id}
      className={
        (getDark(props.config, props.edcHelp) ? 'on-dark ' : '') +
        (hideContent ? 'hide-content' : '')
      }
    >
      <Popover.Title as='h3' className='popover-title'>
        {props.data.title}
      </Popover.Title>
      {!hideContent && <Popover.Content>{props.data.content}</Popover.Content>}
    </Popover>
  )
}

export function getOverlayTrigger(
  overlay: OverlayChildren,
  props: EdcPopoverProps
): JSX.Element {
  return (
    <OverlayTrigger
      overlay={overlay}
      trigger={props.edcHelp.trigger || props.config.trigger || 'click'}
      rootClose
      placement={getPlacement(props.config, props.edcHelp)}
    >
      {getEdcIcon(props)}
    </OverlayTrigger>
  )
}

export function EdcPopover(props: EdcPopoverProps): JSX.Element {
  if (!props.data.triggerError) {
    return getOverlayTrigger(getEdcPopover(props), props)
  }

  let failBehavior = props.config.failBehavior

  if (!failBehavior) {
    failBehavior = defaultFailBehavior
  }

  failBehavior = props.data.failBehaviorData.forceBehavior || failBehavior

  switch (failBehavior.popover) {
    case 'ERROR_SHOWN':
      return getOverlayTrigger(getEdcPopover(props), props)
    case 'FRIENDLY_MSG':
      props.data.title = props.data.failBehaviorData.friendlyMsg || ''
      return getOverlayTrigger(getEdcPopover(props, true), props)
    case 'NO_POPOVER':
      return getEdcIcon(props)
    default:
      return getOverlayTrigger(getEdcPopover(props), props)
  }
}
