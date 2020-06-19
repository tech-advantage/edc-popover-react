import { PopoverConfig } from '../config/PopoverConfigProvider'
import React from 'react'
import { Helper, PopoverLabel } from 'edc-client-js'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { HelperFactory } from '../helper/HelperFactory'
import { EdcIconData } from '..'
import { BehaviorData } from '../data/FailBehavior'

const errorProviderIcon = 'fas fa-exclamation-triangle'
const errorDebugIcon = 'fas fa-exclamation-circle'

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

  const behaviorData: BehaviorData = {
    displayIcon: getIcon(config, props) || '',
    errorIcon: errorDebugIcon
  }

  if (!config.helpFactory) {
    behaviorData.errorIcon = errorProviderIcon
    behaviorData.forceBehavior = {
      popover: 'ERROR_SHOWN',
      icon: 'ERROR'
    }
    setData({
      fetched: true,
      triggerError: true,
      id: id,
      content: 'This EdcHelp is not a deep child of a PopoverConfigProvider',
      title: 'Failed to find a provider',
      failBehaviorData: behaviorData
    })
    return
  }

  const failedData: PopoverData = {
    fetched: true,
    triggerError: true,
    id: id,
    content: "Can't fetch data, check your pluginId and docPath !",
    title: 'Error',
    failBehaviorData: behaviorData
  }

  const helperFact = config.helpFactory()

  const helperProvider = helperFact.getHelp(
    props.mainKey,
    props.subKey,
    props.pluginId,
    lang
  )

  const popoverLabels = helperFact.getPopoverLabels(lang, props.pluginId)

  if (!popoverLabels && isMounted) {
    behaviorData.errorIcon = errorDebugIcon
    behaviorData.forceBehavior = {
      popover: 'ERROR_SHOWN',
      icon: 'ERROR'
    }
    setData(failedData)
    return
  }

  popoverLabels
    .then((labels: PopoverLabel) => {
      behaviorData.friendlyMsg = labels.comingSoon
      behaviorData.iconAlt = labels.iconAlt

      failedData.content = labels.errors.failedData || failedData.content

      if (!helperProvider) {
        behaviorData.errorIcon = errorDebugIcon
        behaviorData.forceBehavior = {
          popover: 'ERROR_SHOWN',
          icon: 'ERROR'
        }
        setData(failedData)
        return
      }

      helperProvider
        .then((helper: Helper) => {
          if (isMounted) {
            setData(
              !helper
                ? failedData
                : {
                    fetched: true,
                    triggerError: false,
                    id: id,
                    content: buildContent(
                      config,
                      helperFact,
                      helper,
                      props,
                      labels
                    ),
                    title: helper.label,
                    failBehaviorData: behaviorData
                  }
            )
          }
        })
        .catch((err: Error) => {
          console.error(err)
          if (isMounted) {
            setData(failedData)
          }
        })
    })
    .catch((err: Error) => {
      console.error(err)
      if (isMounted) {
        setData(failedData)
      }
    })
}
