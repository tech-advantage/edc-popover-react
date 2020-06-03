import React, { Component } from 'react'
import { PopoverConfig } from './PopoverConfig'

export const ConfigContext = React.createContext<PopoverConfig>(
  new PopoverConfig()
)

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
          new PopoverConfig(
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
