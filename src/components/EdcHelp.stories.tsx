import React, { FunctionComponent } from 'react'
import { EdcHelp } from './EdcHelp'
import { EdcIconData, FailBehavior, PopoverProvider } from '..'
import { HelperFactory } from '../helper/HelperFactory'

export default { title: 'EdcHelp' }

type ProviderProps = {
  pluginId?: string
  helpPath?: string
  docPath?: string
  i18nPath?: string
  icon?: EdcIconData
  lang?: string
  failBehavior?: FailBehavior
  helpFactory?: Function
}

function DefaultProvider(
  props: ProviderProps & { children: React.ReactNode }
): JSX.Element {
  return (
    <PopoverProvider
      {...{
        ...{
          pluginId: 'edc',
          docPath: './doc',
          helpPath: 'https://demo.easydoccontents.com/help',
          i18nPath: './doc/i18n',
          lang: 'en'
        },
        ...props
      }}
    >
      {props.children}
    </PopoverProvider>
  )
}

export const withDefaultIcon: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withCustomIconClass: FunctionComponent = () => (
  <DefaultProvider icon='fas fa-ad'>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withCustomIconSVG: FunctionComponent = () => (
  <DefaultProvider icon={{ type: 'url', content: '/icon.svg' }}>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withCustomIconPNG: FunctionComponent = () => (
  <DefaultProvider icon={{ type: 'url', content: '/icon.png' }}>
    <h4>lang: 'fr'</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' lang='fr' />
  </DefaultProvider>
)

export const withCustomLanguage: FunctionComponent = () => (
  <DefaultProvider>
    <h4>lang: 'fr'</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' lang='fr' />
  </DefaultProvider>
)

export const withCustomPlacements: FunctionComponent = () => (
  <DefaultProvider>
    <h4>lang: 'fr'</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' lang='fr' />
  </DefaultProvider>
)

export const withHoverTrigger: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='documentation_type'
      trigger='hover'
    />
  </DefaultProvider>
)

export const withHoverFocusTrigger: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='documentation_type'
      trigger={['hover', 'focus']}
    />
  </DefaultProvider>
)

export const withErrorsBehavior: FunctionComponent = () => (
  <>
    <h3>When no error happen (all popovers must be acting as usual)</h3>
    <h6>popover:ERROR_SHOWN icon:SHOWN</h6>
    <DefaultProvider failBehavior={{ popover: 'ERROR_SHOWN', icon: 'SHOWN' }}>
      <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
    </DefaultProvider>
    <h6>popover:FRIENDLY_MSG icon:DISABLED</h6>
    <DefaultProvider
      failBehavior={{ popover: 'FRIENDLY_MSG', icon: 'DISABLED' }}
    >
      <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
    </DefaultProvider>
    <h6>popover:NO_POPOVER icon:HIDDEN</h6>
    <DefaultProvider failBehavior={{ popover: 'NO_POPOVER', icon: 'HIDDEN' }}>
      <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
    </DefaultProvider>
    <hr />
    <h3>When error happen</h3>
    <h6>popover:ERROR_SHOWN icon:SHOWN</h6>
    <DefaultProvider failBehavior={{ popover: 'ERROR_SHOWN', icon: 'SHOWN' }}>
      <EdcHelp mainKey='main' subKey='sub' />
    </DefaultProvider>
    <h6>popover:FRIENDLY_MSG icon:DISABLED</h6>
    <DefaultProvider
      failBehavior={{ popover: 'FRIENDLY_MSG', icon: 'DISABLED' }}
    >
      <EdcHelp mainKey='main' subKey='sub' />
    </DefaultProvider>
    <h6>popover:NO_POPOVER icon:HIDDEN</h6>
    <DefaultProvider failBehavior={{ popover: 'NO_POPOVER', icon: 'HIDDEN' }}>
      <EdcHelp mainKey='main' subKey='sub' />
    </DefaultProvider>
    <h6>popover:ERROR_SHOWN icon:ERROR</h6>
    <DefaultProvider failBehavior={{ popover: 'ERROR_SHOWN', icon: 'ERROR' }}>
      <EdcHelp mainKey='main' subKey='sub' />
    </DefaultProvider>
  </>
)

export const withMultipleEdcHelpSameProvider: FunctionComponent = () => (
  <DefaultProvider>
    <h4>Default language</h4>
    <h4>lang: default</h4>
    <EdcHelp mainKey='fr.techad.edc.editor' subKey='parameters' />
    <hr />
    <h4>lang: 'fr'</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' lang='fr' />
    <hr />
    <h4>Custom icon and fallback language</h4>
    <h4>lang: 'zz'</h4>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='documentation_type'
      lang='zz'
      icon='fab fa-angular'
    />
    <hr />
  </DefaultProvider>
)

export const withNoProvider: FunctionComponent = () => (
  <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
)

export const withFailingDocPath: FunctionComponent = () => (
  <DefaultProvider
    docPath='nonexistingdocpath'
    helpPath='ohno'
    i18nPath='ohnono'
    helpFactory={(): HelperFactory => new HelperFactory()}
  >
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withWrongKeys: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp mainKey='fr.techad.edc' subKey='nonexistingkey' />
  </DefaultProvider>
)
