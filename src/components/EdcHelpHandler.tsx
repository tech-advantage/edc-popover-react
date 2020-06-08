import { PopoverConfig } from '../config/PopoverConfigProvider'
import React from 'react'
import { Helper } from 'edc-client-js'
import { EdcHelpProps, PopoverData } from './EdcHelpData'

function open(link?: string): void {
  if (link) {
    window.open(link, 'help', 'scrollbars=1,resizable=1,height=750,width=1200')
  }
}

function getId(props: EdcHelpProps): string {
  return `popover ${props.pluginId ? `${props.pluginId} ` : ''} ${
    props.mainKey
  } ${props.subKey}`
}

export function buildContent(
  config: PopoverConfig,
  helper: Helper,
  props: EdcHelpProps
): JSX.Element {
  return (
    <div>
      <article className='description'>{helper.description}</article>
      <div className='see-also'>
        <div className='need-more'>
          <span className='title'>
            <strong>Need more...</strong>
          </span>
          <ul>
            {helper.articles.map((value, index) => {
              return (
                <li key={index}>
                  <button
                    className='link-button'
                    onClick={(): void =>
                      open(
                        config.helpFactory?.getContextUrl(
                          props.mainKey,
                          props.subKey,
                          index,
                          props.lang,
                          props.pluginId
                        )
                      )
                    }
                  >
                    {value.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='related'>
          <span className='title'>
            <strong>Related topics</strong>
          </span>
          <ul>
            {helper.links.map((value, index) => {
              return (
                <li key={index}>
                  <button
                    className='link-button'
                    onClick={(): void =>
                      open(
                        config.helpFactory?.getDocumentationUrl(
                          value.id,
                          props.lang
                        )
                      )
                    }
                  >
                    {value.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function buildData(
  config: PopoverConfig,
  props: EdcHelpProps,
  setData: React.Dispatch<React.SetStateAction<PopoverData>>,
  isMounted: boolean
): void {
  const id = getId(props)
  if (!config.helpFactory) {
    setData({
      fetched: true,
      id: id,
      content: 'This EdcHelp is not a deep child of a PopoverConfigProvider',
      title: 'Failed to find a provider',
      icon: 'fas fa-exclamation-triangle text-warning'
    })
  } else {
    const failedData = {
      fetched: true,
      id: id,
      content:
        'An error occured when fetching data !\nCheck keys provided to the EdcHelp component',
      title: 'Error',
      icon: 'fas fa-exclamation-circle text-danger'
    }
    const helperProvider = config.helpFactory.getHelp(
      props.mainKey,
      props.subKey,
      props.pluginId,
      props.lang
    )

    if (!helperProvider) {
      console.error("Can't instanciate edc-client-js helper !")
      setData(failedData)
    } else {
      helperProvider
        .then((helper: Helper) => {
          if (isMounted) {
            setData(
              !helper
                ? failedData
                : {
                    fetched: true,
                    id: id,
                    content: buildContent(config, helper, props),
                    title: helper.label,
                    icon: config.icon || ''
                  }
            )
          }
        })
        .catch((err: Error) => {
          console.error(err)
          const describedFail = { ...failedData }
          describedFail.content = err.name + ': ' + err.message
          if (isMounted) {
            setData(describedFail)
          }
        })
    }
  }
}
