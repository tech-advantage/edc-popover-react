import React, { RefObject, useEffect } from 'react'
import { EdcIcon } from './EdcIcon'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { EdcPopoverConfig } from '../config/PopoverConfigProvider'
import { defaultFailBehavior } from '../data/FailBehavior'
import { Popover, PopoverConfig, PopoverContent } from 'edc-popover-js'
import 'edc-popover-js/dist/edc-popover.css'

export type EdcPopoverProps = {
  edcHelp: EdcHelpProps
  config: EdcPopoverConfig
  data: PopoverData
}

function popoverFactory(
  props: EdcPopoverProps,
  triggerRef: RefObject<HTMLImageElement>
): Popover {
  const config = new PopoverConfig()
  config.icon = ''
  if (triggerRef.current) {
    config.target = triggerRef.current
  }

  config.content = props.data.content
  config.labels = props.data.labels
  config.options = props.edcHelp.options

  return new Popover(config)
}

export function getEdcIcon(
  props: EdcPopoverProps,
  ref: RefObject<HTMLImageElement>
): JSX.Element {
  return (
    <EdcIcon
      data={props.data}
      config={props.config}
      edcHelpProps={props.edcHelp}
      failBehavior={props.config.failBehavior}
      ref={ref}
    />
  )
}

export function EdcPopover(props: EdcPopoverProps): JSX.Element {
  const ref = React.createRef<HTMLImageElement>()

  let hasPopover = true
  let icon: JSX.Element

  if (!props.data.triggerError) {
    hasPopover = true
    icon = getEdcIcon(props, ref)
  } else {
    let failBehavior = props.config.failBehavior

    if (!failBehavior) {
      failBehavior = defaultFailBehavior
    }

    failBehavior = props.data.failBehaviorData.forceBehavior || failBehavior

    switch (failBehavior.popover) {
      case 'ERROR_SHOWN':
        icon = getEdcIcon(props, ref)
        hasPopover = true
        break
      case 'FRIENDLY_MSG':
        props.data.content = new PopoverContent()
        icon = getEdcIcon(props, ref)
        hasPopover = true
        break
      case 'NO_POPOVER':
        icon = getEdcIcon(props, ref)
        hasPopover = false
        break
      default:
        icon = getEdcIcon(props, ref)
        hasPopover = true
    }
  }

  useEffect(() => {
    if (hasPopover) {
      const popover = popoverFactory(props, ref)
      return (): void => {
        popover.instance.destroy()
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return (): void => {}
  })

  return icon
}
