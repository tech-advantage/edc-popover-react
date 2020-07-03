import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './EdcHelp.scss'
import { PopoverConfigContext } from '../config/PopoverConfigProvider'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { buildData, getIcon, getId } from '../handlers/EdcHelpHandler'
import { EdcPopover } from './EdcPopover'

const defaultProps: EdcHelpProps = {
  pluginId: undefined,
  mainKey: '',
  subKey: '',
  placement: 'auto',
  dark: false,
  lang: undefined,
  trigger: 'click'
}

export function EdcHelp(props: EdcHelpProps): JSX.Element {
  const config = React.useContext(PopoverConfigContext)
  const finalProps = { ...defaultProps, ...props }

  // setData can be used to rerender the Component with new data (useful for async task)
  const [data, setData] = useState<PopoverData>({
    triggerError: false,
    id: getId(finalProps),
    title: 'Loading...',
    content: 'Loading...',
    failBehaviorData: {
      displayIcon: getIcon(config, props) || '',
      errorIcon: ''
    }
  })

  const isDataFetched = useRef(false)
  // Make async tasks cancellable if component is unmounted (effect cleanup)
  useEffect(() => {
    let isMounted = true
    if (!isDataFetched.current) {
      buildData(config, finalProps, setData, isMounted)
    }
    isDataFetched.current = !isDataFetched.current
    return (): void => {
      isMounted = false
    }
  }, [config, finalProps])

  return (
    <div className='help-container'>
      <EdcPopover edcHelp={finalProps} config={config} data={data} />
    </div>
  )
}
