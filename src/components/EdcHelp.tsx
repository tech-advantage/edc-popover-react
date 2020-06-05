import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import './EdcHelp.scss'
import { PopoverConfigContext } from '../config/PopoverConfigProvider'

type EdcHelpProps = {
  pluginId?: string
  mainKey: string // key is a reserved prop of React
  subKey: string
  placement?: string
  dark?: boolean
  lang?: string
}

export function EdcHelp(props: EdcHelpProps): JSX.Element {
  const config = React.useContext(PopoverConfigContext)
  if (!config.edcClient) {
    return (
      <i id={props.mainKey + props.subKey} className='fas fa-times help-icon' />
    )
  }

  return <i className={config.icon + ' help-icon'} />
}
