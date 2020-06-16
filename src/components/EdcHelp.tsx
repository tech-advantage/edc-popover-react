import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './EdcHelp.scss'
import { PopoverConfigContext } from '../config/PopoverConfigProvider'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { EdcHelpProps, EdcIconData, PopoverData } from './EdcHelpData'
import { buildData, getIcon, getId } from './EdcHelpHandler'

const defaultProps: EdcHelpProps = {
  pluginId: undefined,
  mainKey: '',
  subKey: '',
  placement: 'bottom',
  dark: false,
  lang: undefined,
  trigger: 'click'
}

type EdcIconProps = {
  icon: EdcIconData
  edcHelpProps: EdcHelpProps
}

function EdcIcon(props: EdcIconProps): JSX.Element {
  const cssClass = 'help-icon' + (props.edcHelpProps.dark ? ' on-dark' : '')

  if (typeof props.icon === 'string') {
    return <i className={`${props.icon} ${cssClass}`} />
  }
  if (props.icon.type === 'class') {
    return <i className={`${props.icon.content} ${cssClass}`} />
  }
  return (
    <img className={cssClass} src={props.icon.content} alt='Popover icon' />
  )
}

export function EdcHelp(props: EdcHelpProps): JSX.Element {
  const config = React.useContext(PopoverConfigContext)
  const finalProps = { ...defaultProps, ...props }

  // setData can be used to rerender the Component with new data (useful for async task)
  const [data, setData] = useState<PopoverData>({
    fetched: false,
    id: getId(finalProps),
    title: 'Loading...',
    content: 'Loading...',
    icon: getIcon(config, props) || ''
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
        trigger={finalProps.trigger || config.trigger || 'click'}
        placement={finalProps.placement}
        overlay={
          <Popover id={data.id}>
            <Popover.Title as='h3' className='popover-title'>
              {data.title}
            </Popover.Title>
            <Popover.Content>{data.content}</Popover.Content>
          </Popover>
        }
      >
        <EdcIcon icon={data.icon} edcHelpProps={finalProps} />
      </OverlayTrigger>
    </div>
  )
}
