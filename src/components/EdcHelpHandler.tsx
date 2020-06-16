import { PopoverConfig } from '../config/PopoverConfigProvider'
import React from 'react'
import { Helper, PopoverLabel } from 'edc-client-js'
import { EdcHelpProps, EdcIconData, PopoverData } from './EdcHelpData'
import { HelperFactory } from '../helper/HelperFactory'

function open(link?: string): void {
  if (link) {
    window.open(link, 'help', 'scrollbars=1,resizable=1,height=750,width=1200')
  }
}

function getLang(
  config: PopoverConfig,
  props: EdcHelpProps
): string | undefined {
  return props.lang || config.lang
}

export function getId(props: EdcHelpProps): string {
  return `popover ${props.pluginId ? `${props.pluginId} ` : ''}${
    props.mainKey
  } ${props.subKey}`
}

export function getIcon(
  config: PopoverConfig,
  props: EdcHelpProps
): EdcIconData | undefined {
  return props.icon || config.icon
}

export function buildContent(
  config: PopoverConfig,
  helperFactory: HelperFactory,
  helper: Helper,
  props: EdcHelpProps,
  labels: PopoverLabel
): JSX.Element {
  const lang = getLang(config, props)
  return (
    <div className='popover-content'>
      <article className='popover-desc'>{helper.description}</article>
      <div className='popover-section'>
        {helper.articles && helper.articles.length > 0 && (
          <div className='popover-need-more'>
            <span className='popover-section-title'>{labels.articles}</span>
            <ul>
              {helper.articles.map((value, index) => {
                // Loads url whilst loading popover, instead of loading during onClick
                const url = helperFactory.getContextUrl(
                  props.mainKey,
                  props.subKey,
                  index,
                  lang,
                  props.pluginId
                )
                return (
                  <li key={index}>
                    <span
                      className='popover-section-item'
                      onClick={(): void => open(url)}
                    >
                      {value.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {helper.links && helper.links.length > 0 && (
          <div className='popover-related-topics'>
            <span className='popover-section-title'>{labels.links}</span>
            <ul>
              {helper.links.map((value, index) => {
                // Loads url whilst loading popover, instead of loading during onClick
                const url = helperFactory.getDocumentationUrl(value.id, lang)
                return (
                  <li key={index}>
                    <span
                      className='popover-section-item'
                      onClick={(): void => open(url)}
                    >
                      {value.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
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
  const lang = getLang(config, props)
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
    const helperFact = config.helpFactory()

    const helperProvider = helperFact.getHelp(
      props.mainKey,
      props.subKey,
      props.pluginId,
      lang
    )

    const popoverLabels = helperFact.getPopoverLabels(lang, props.pluginId)

    if (!helperProvider) {
      console.error("Can't instanciate edc-client-js helper !")
      setData(failedData)
    } else {
      Promise.all([helperProvider, popoverLabels])
        .then((values) => {
          const helper = values[0]
          if (isMounted) {
            setData(
              !helper
                ? failedData
                : {
                    fetched: true,
                    id: id,
                    content: buildContent(
                      config,
                      helperFact,
                      helper,
                      props,
                      values[1]
                    ),
                    title: helper.label,
                    icon: getIcon(config, props) || ''
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
