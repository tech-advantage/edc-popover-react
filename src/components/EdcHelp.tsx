import React, { useEffect, useRef, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './EdcHelp.scss'
import { PopoverConfigContext } from '../config/PopoverConfigProvider'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { buildData, getIcon } from '../handlers/EdcHelpHandler'
import { EdcPopover } from './EdcPopover'
import { PopoverContent } from 'edc-popover-utils'

const defaultProps: EdcHelpProps = {
  pluginId: undefined,
  mainKey: '',
  subKey: '',
  lang: undefined
}

export function EdcHelp(props: EdcHelpProps): JSX.Element {
  const config = React.useContext(PopoverConfigContext)
  // Mixing options by overriding global with local ones
  config.options = { ...config.options, ...props.options }
  const finalProps = { ...defaultProps, ...props }

  // setData can be used to rerender the Component with new data (useful for async task)
  const [data, setData] = useState<PopoverData>({
    triggerError: false,
    content: new PopoverContent('Loading...', 'Loading...'),
    labels: {},
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
