import { EdcPopoverConfig } from '../config/PopoverConfigProvider'
import React from 'react'
import { Helper, PopoverLabel, Article, Link } from 'edc-client-js'
import { EdcHelpProps, PopoverData } from '../data/EdcHelpData'
import { HelperFactory } from '../helper/HelperFactory'
import { EdcIconData } from '..'
import { BehaviorData } from '../data/FailBehavior'
import { PopoverContent, PopoverItem } from 'edc-popover-js'

const errorProviderIcon = 'fas fa-exclamation-triangle'
const errorDebugIcon = 'fas fa-exclamation-circle'

function getLang(
  config: EdcPopoverConfig,
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
  config: EdcPopoverConfig,
  props: EdcHelpProps
): EdcIconData | undefined {
  return props.icon || config.icon
}

export function buildContent(
  config: EdcPopoverConfig,
  helperFactory: HelperFactory,
  helper: Helper,
  props: EdcHelpProps
): PopoverContent {
  const lang = getLang(config, props)
  const content = new PopoverContent(helper.label, helper.description)
  content.articles = helper.articles
    ? helper.articles.map((value: Article, index: number) => {
        return new PopoverItem(
          value.label,
          helperFactory.getContextUrl(
            props.mainKey,
            props.subKey,
            index,
            lang,
            props.pluginId
          ) || ''
        )
      })
    : []
  content.links = helper.links
    ? helper.links.map((value: Link) => {
        return new PopoverItem(
          value.label,
          helperFactory.getDocumentationUrl(value.id, lang) || ''
        )
      })
    : []

  return content
}

export function buildData(
  config: EdcPopoverConfig,
  props: EdcHelpProps,
  setData: React.Dispatch<React.SetStateAction<PopoverData>>,
  isMounted: boolean
): void {
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
      triggerError: true,
      content: new PopoverContent(
        'Failed to find a provider',
        'This EdcHelp is not a deep child of a PopoverConfigProvider'
      ),
      labels: {},
      failBehaviorData: behaviorData
    })
    return
  }

  const helperFact = config.helpFactory()

  const helperProvider = helperFact.getHelp(
    props.mainKey,
    props.subKey,
    props.pluginId,
    lang
  )

  const failedData: PopoverData = {
    triggerError: true,
    content: new PopoverContent(
      'Error',
      "Can't fetch any data, check your pluginId and docPath !"
    ),
    labels: {},
    failBehaviorData: behaviorData
  }

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
      const popoverLabels = {
        articles: labels.articles,
        links: labels.links,
        comingSoon: labels.comingSoon
      }
      behaviorData.iconAlt = labels.iconAlt

      failedData.content = new PopoverContent(
        labels.errorTitle || failedData.content.title,
        labels.errors.failedData || failedData.content.description
      )

      failedData.labels = popoverLabels

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
                    triggerError: false,
                    content: buildContent(config, helperFact, helper, props),
                    labels: popoverLabels,
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
      // Very important error, must be shown
      failedData.failBehaviorData.forceBehavior = {
        popover: 'ERROR_SHOWN',
        icon: 'ERROR'
      }
      if (isMounted) {
        setData(failedData)
      }
    })
}
