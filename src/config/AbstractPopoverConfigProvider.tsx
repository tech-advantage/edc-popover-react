import React, { Component } from 'react'
import { EdcConfig } from './EdcConfig'

export const ConfigContext = React.createContext<EdcConfig>(new EdcConfig())

export abstract class AbstractPopoverConfigProvider extends Component {
  abstract getPluginId(): string

  abstract getHelpPath(): string

  abstract getDocPath(): string

  abstract getI18nPath(): string

  getIcon(): string {
    return 'fa-question-circle-o'
  }

  render() {
    return (
      <ConfigContext.Provider
        value={
          new EdcConfig(
            this.getPluginId(),
            this.getHelpPath(),
            this.getDocPath(),
            this.getI18nPath(),
            this.getIcon()
          )
        }
      >
        {this.props.children}
      </ConfigContext.Provider>
    )
  }
}
