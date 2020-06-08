import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './EdcHelp.scss'
import { PopoverConfigContext } from '../config/PopoverConfigProvider'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { EdcHelpProps, PopoverData } from './EdcHelpData'
import { buildData } from './EdcHelpHandler'

const defaultProps: EdcHelpProps = {
  pluginId: undefined,
  mainKey: '',
  subKey: '',
  placement: 'bottom',
  dark: false,
  lang: undefined,
  trigger: 'click'
}

export function EdcHelp(props: EdcHelpProps): JSX.Element {
  const config = React.useContext(PopoverConfigContext)
  const finalProps = { ...defaultProps, ...props }

  // setData can be used to rerender the Component with new data (useful for async task)
  const [data, setData] = useState<PopoverData>({
    fetched: false,
    id: 'popover ' + finalProps.mainKey + ' ' + finalProps.subKey,
    title: 'Loading...',
    content: 'Loading...',
    icon: config.icon || ''
  })

  // Make async tasks cancellable if component is unmounted (effect cleanup)
  useEffect(() => {
    let isMounted = true
    if (!data.fetched) {
      buildData(config, finalProps, setData, isMounted)
    }
    return (): void => {
      isMounted = false
    }
  }, [data.fetched, config, finalProps])

  return (
    <div className='help-container'>
      <OverlayTrigger
        trigger={finalProps.trigger}
        placement={finalProps.placement}
        overlay={
          <Popover id={data.id}>
            <Popover.Title as='h3'>{data.title}</Popover.Title>
            <Popover.Content>{data.content}</Popover.Content>
          </Popover>
        }
      >
        <i
          className={data.icon + ' help-icon ' + (finalProps.dark && 'on-dark')}
        />
      </OverlayTrigger>
    </div>
  )
}
