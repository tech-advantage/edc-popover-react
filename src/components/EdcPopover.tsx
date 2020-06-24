import React from 'react'
import { EdcIcon } from './EdcIcon'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { PopoverConfig } from '../config/PopoverConfigProvider'
import { OverlayChildren } from 'react-bootstrap/Overlay'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { defaultFailBehavior } from '../data/FailBehavior'

export type EdcPopoverProps = {
  edcHelp: EdcHelpProps
  config: PopoverConfig
  data: PopoverData
}

export function getEdcIcon(props: EdcPopoverProps): JSX.Element {
  return (
    <EdcIcon
      data={props.data}
      edcHelpProps={props.edcHelp}
      failBehavior={props.config.failBehavior}
    />
  )
}

/*
 * Can't create a functional component, OverlayTrigger cannot handle properly custom React Components
 * Temporary workaround: Function returning JSX.Element
 */
export function getEdcPopover(data: PopoverData): JSX.Element {
  return (
    <Popover id={data.id}>
      <Popover.Title as='h3' className='popover-title'>
        {data.title}
      </Popover.Title>
      <Popover.Content>{data.content}</Popover.Content>
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
      placement={props.edcHelp.placement}
    >
      {getEdcIcon(props)}
    </OverlayTrigger>
  )
}

export function EdcPopover(props: EdcPopoverProps): JSX.Element {
  if (!props.data.triggerError) {
    return getOverlayTrigger(getEdcPopover(props.data), props)
  }

  let failBehavior = props.config.failBehavior

  if (!failBehavior) {
    failBehavior = defaultFailBehavior
  }

  failBehavior = props.data.failBehaviorData.forceBehavior || failBehavior

  switch (failBehavior.popover) {
    case 'ERROR_SHOWN':
      return getOverlayTrigger(getEdcPopover(props.data), props)
    case 'FRIENDLY_MSG':
      props.data.title = props.data.failBehaviorData.friendlyMsg || ''
      props.data.content = ''
      return getOverlayTrigger(getEdcPopover(props.data), props)
    case 'NO_POPOVER':
      return getEdcIcon(props)
    default:
      return getOverlayTrigger(getEdcPopover(props.data), props)
  }
}
