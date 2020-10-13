import React, { ChangeEvent, Component, FunctionComponent } from 'react'
import { EdcHelp } from './EdcHelp'
import { EdcIconData, EdcPopoverProvider, FailBehavior } from '..'
import { HelperFactory } from '../helper/HelperFactory'
import { AnimationType, PopoverPlacement } from 'edc-popover-utils'
import { EdcIPopoverOptions } from './EdcIPopoverOptions'

export default { title: 'EdcHelp' }

type ProviderProps = {
  pluginId?: string
  helpPath?: string
  docPath?: string
  i18nPath?: string
  icon?: EdcIconData
  lang?: string
  options?: EdcIPopoverOptions
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
      <EdcPopoverProvider
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
        <style>
          {`h6 {
            font-size: 1.0em;
          }`}
        </style>
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
      </EdcPopoverProvider>
    )
  }
}

class DarkSwitcher extends Component<{}> {
  dark: boolean

  constructor(props: Readonly<{}>) {
    super(props)
    this.dark = false
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    this.dark = event.target.value === 'true'
    this.forceUpdate(() => console.log('Dark mode updated'))
  }

  render(): JSX.Element {
    return (
      <DefaultProvider>
        <style>
          {this.dark
            ? `body {
            color: white;
            background-color: black;
          }`
            : `body {
            color: black;
            background-color: white;
          }`}
        </style>
        Dark mode enabled:
        <select onChange={this.handleChange}>
          <option value='false'>false</option>
          <option value='true'>true</option>
        </select>
        <br />
        <br />
        <EdcHelp
          mainKey='fr.techad.edc'
          subKey='help.center'
          options={{ dark: this.dark }}
        />
      </DefaultProvider>
    )
  }
}

export const withDefaultIcon: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
  </DefaultProvider>
)

export const withCustomIconClass: FunctionComponent = () => (
  <DefaultProvider icon='fas fa-ad'>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
  </DefaultProvider>
)

export const withCustomIconSVG: FunctionComponent = () => (
  <DefaultProvider icon={{ type: 'url', content: '/icon.svg' }}>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
  </DefaultProvider>
)

export const withCustomIconPNG: FunctionComponent = () => (
  <DefaultProvider icon={{ type: 'url', content: '/icon.png' }}>
    <h4>lang: 'fr'</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' lang='fr' />
  </DefaultProvider>
)

export const withLanguageOverride: FunctionComponent = () => (
  <DefaultProvider>
    <h4>lang: 'fr'</h4>
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' lang='fr' />
  </DefaultProvider>
)

export const withDarkMode: FunctionComponent = () => <DarkSwitcher />

export const withCustomPlacements: FunctionComponent = () => (
  <DefaultProvider>
    <style>
      {`#root {
            margin-left: 35%;
            margin-top: 10%;
            margin-bottom: 50%;
          }`}
    </style>
    <h4>Auto</h4>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='help.center'
      options={{ placement: PopoverPlacement.AUTO }}
    />
    <h4>Top</h4>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='help.center'
      options={{ placement: PopoverPlacement.TOP }}
    />
    <h4>Bottom</h4>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='help.center'
      options={{ placement: PopoverPlacement.BOTTOM }}
    />
    <h4>Left</h4>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='help.center'
      options={{ placement: PopoverPlacement.LEFT }}
    />
    <h4>Right</h4>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='help.center'
      options={{ placement: PopoverPlacement.RIGHT }}
    />
  </DefaultProvider>
)

export const withHoverTrigger: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='help.center'
      options={{ trigger: 'mouseenter' }}
    />
  </DefaultProvider>
)

export const withHoverFocusTrigger: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='help.center'
      options={{ trigger: 'mouseenter focus' }}
    />
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
      {`.edc-help-icon {
          color: #ab3794;
        }

        .edc-help-icon-disabled {
          color: #ab3794;
        }

        .edc-help-icon-hidden {
          color: #ab3794;
        }

        .edc-help-icon-error {
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
      subKey='help.center'
      lang='zz'
      icon='fab fa-angular'
    />
    <hr />
  </DefaultProvider>
)

export const withNoProvider: FunctionComponent = () => (
  <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
)

export const withFailingDocPath: FunctionComponent = () => (
  <DefaultProvider
    docPath='nonexistingdocpath'
    helpPath='ohno'
    i18nPath='ohnono'
    helpFactory={(): HelperFactory => new HelperFactory()}
  >
    <EdcHelp mainKey='fr.techad.edc' subKey='help.center' />
  </DefaultProvider>
)

export const withWrongKeys: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp mainKey='fr.techad.edc' subKey='nonexistingkey' />
  </DefaultProvider>
)

/* Display options */
class DisplaySwitcher extends Component<{}> {
  state: {
    displayArticles: boolean
    displayRelatedTopics: boolean
    displayTitle: boolean
    displayPopover: boolean
    displayTooltip: boolean
    displaySeparator: boolean
  }

  constructor() {
    // @ts-ignore
    super()
    this.state = {
      displayArticles: true,
      displayRelatedTopics: true,
      displayTitle: true,
      displayPopover: true,
      displayTooltip: true,
      displaySeparator: true
    }
  }

  render(): JSX.Element {
    return (
      <DefaultProvider>
        <div>
          Display articles:
          <input
            id='articles'
            type='checkbox'
            checked={this.state.displayArticles}
            onChange={(): void =>
              this.setState({ displayArticles: !this.state.displayArticles })
            }
          />
        </div>
        <br />
        <div>
          Display related topics:
          <input
            id='relatedTopics'
            type='checkbox'
            checked={this.state.displayRelatedTopics}
            onChange={(): void =>
              this.setState({
                displayRelatedTopics: !this.state.displayRelatedTopics
              })
            }
          />
        </div>
        <div>
          Display Title:
          <input
            id='displayTitle'
            type='checkbox'
            checked={this.state.displayTitle}
            onChange={(): void =>
              this.setState({ displayTitle: !this.state.displayTitle })
            }
          />
        </div>
        <div>
          Display Popover:
          <input
            id='displayPopover'
            type='checkbox'
            checked={this.state.displayPopover}
            onChange={(): void =>
              this.setState({ displayPopover: !this.state.displayPopover })
            }
          />
        </div>
        <div>
          Display Tooltip:
          <input
            id='displayTooltip'
            type='checkbox'
            checked={this.state.displayTooltip}
            onChange={(): void =>
              this.setState({ displayTooltip: !this.state.displayTooltip })
            }
          />
        </div>
        <div>
          Display Separator:
          <input
            id='displaySeparator'
            type='checkbox'
            checked={this.state.displaySeparator}
            onChange={(): void =>
              this.setState({ displaySeparator: !this.state.displaySeparator })
            }
          />
        </div>
        <br />
        <br />
        <EdcHelp
          mainKey='fr.techad.edc'
          subKey='help.center'
          options={{
            displayArticles: this.state.displayArticles,
            displayRelatedTopics: this.state.displayRelatedTopics,
            displayTitle: this.state.displayTitle,
            displayPopover: this.state.displayPopover,
            displayTooltip: this.state.displayTooltip,
            displaySeparator: this.state.displaySeparator
          }}
        />
      </DefaultProvider>
    )
  }
}
export const withDisplayOptions: FunctionComponent = () => <DisplaySwitcher />

/* Animations */
class AnimationsSwitcher extends Component<{}> {
  options: string[] = []
  state: { animation: AnimationType | undefined; delay: number } = {
    animation: undefined,
    delay: 200
  }

  constructor(props: Readonly<{}>) {
    super(props)
    this.options = Object.keys(AnimationType).map((key: string) => key)
  }

  getOptions(): React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[] {
    return this.options.map(
      (
        opt: string,
        index: number
      ): React.DetailedHTMLProps<
        React.OptionHTMLAttributes<HTMLOptionElement>,
        HTMLOptionElement
      > => (
        <option value={AnimationType[opt]} key={`option${index}`}>
          {opt}
        </option>
      )
    )
  }

  render(): JSX.Element {
    return (
      <DefaultProvider>
        <div>
          Animation mode:
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
              this.setState({ animation: event.target.value })
            }
          >
            {this.getOptions()}
          </select>
        </div>
        <br />
        <div>
          Delay in milliseconds:
          <input
            type='number'
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              this.setState({ delay: Number(event.target.value) })
            }
          />
        </div>
        <br />
        <EdcHelp
          mainKey='fr.techad.edc'
          subKey='help.center'
          options={{ animation: this.state.animation, delay: this.state.delay }}
        />
      </DefaultProvider>
    )
  }
}
export const withAnimationOptions: FunctionComponent = () => (
  <AnimationsSwitcher />
)
