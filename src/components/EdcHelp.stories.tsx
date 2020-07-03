import React, { ChangeEvent, FunctionComponent } from 'react'
import { EdcHelp } from './EdcHelp'
import { EdcIconData, FailBehavior, PopoverProvider } from '..'
import { HelperFactory } from '../helper/HelperFactory'
import { Placement } from 'react-bootstrap/Overlay'

export default { title: 'EdcHelp' }

type ProviderProps = {
  pluginId?: string
  helpPath?: string
  docPath?: string
  i18nPath?: string
  icon?: EdcIconData
  placement?: Placement
  dark?: boolean
  lang?: string
  failBehavior?: FailBehavior
  helpFactory?: Function
}

class DefaultProvider extends React.Component<ProviderProps> {
  props: ProviderProps & { children: React.ReactNode }
  lang: string

  constructor(props: ProviderProps & { children: React.ReactNode }) {
    super(props)
    this.props = props

    this.handleChange = this.handleChange.bind(this)
    this.lang = 'en'
  }

  handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    this.lang = event.target.value
    this.forceUpdate(() => console.log('Lang updated'))
  }

  render(): JSX.Element {
    return (
      <PopoverProvider
        {...{
          ...{
            pluginId: 'edc',
            docPath: './doc',
            helpPath: 'https://demo.easydoccontents.com/help',
            i18nPath: './doc/i18n',
            lang: this.lang
          },
          ...this.props
        }}
      >
        Language:
        <select onChange={this.handleChange}>
          <option value='en'>en</option>
          <option value='fr'>fr</option>
          <option value='es'>es</option>
          <option value='zh'>zh</option>
        </select>
        <br />
        <br />
        {this.props.children}
      </PopoverProvider>
    )
  }
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

export const withLanguageOverride: FunctionComponent = () => (
  <DefaultProvider>
    <h4>lang: 'fr'</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' lang='fr' />
  </DefaultProvider>
)

export const withDarkMode: FunctionComponent = () => (
  <DefaultProvider dark>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withCustomPlacements: FunctionComponent = () => (
  <DefaultProvider>
    <h4>Auto</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' placement='auto' />
    <h4>Top</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' placement='top' />
    <h4>Bottom</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' placement='bottom' />
    <h4>Left</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' placement='left' />
    <h4>Right</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' placement='right' />
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

export const withCustomCss: FunctionComponent = () => (
  <DefaultProvider>
    <style>
      {`.popover-title, .popover-desc {
          color: #ab3794;
        }

        .popover-header {
          background-color: #dbefff;
          border-bottom: 0;
        }

        .popover-body {
          background-color: #dbefff;
          border: 3px solid #ff2233;
        }`}
    </style>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withErrorsBehavior: FunctionComponent = () => (
  <>
    <h2>Custom style</h2>
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
    <h6>Default behavior (should be popover:FRIENDLY_MSG icon:SHOWN)</h6>
    <DefaultProvider>
      <EdcHelp mainKey='main' subKey='sub' />
    </DefaultProvider>
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
    <br style={{ marginBottom: 200 }} />
  </>
)

export const withErrorsBehaviorCustomStyle: FunctionComponent = () => (
  <>
    <style>
      {`.help-icon {
          color: #ab3794;
        }

        .help-icon-disabled {
          color: #ab3794;
        }

        .help-icon-hidden {
          color: #ab3794;
        }

        .help-icon-error {
          color: #ff0000;
        }`}
    </style>
    <h2>Custom style</h2>
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
    <h6>Default behavior (should be popover:FRIENDLY_MSG icon:SHOWN)</h6>
    <DefaultProvider>
      <EdcHelp mainKey='main' subKey='sub' />
    </DefaultProvider>
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
    <br style={{ marginBottom: 200 }} />
  </>
)

export const withMultipleEdcHelpSameProvider: FunctionComponent = () => (
  <DefaultProvider>
    <h4>Default language</h4>
    <h4>lang: default ('en')</h4>
    <EdcHelp mainKey='fr.techad.edc.editor' subKey='parameters' />
    <hr />
    <h4>lang: As selected</h4>
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
