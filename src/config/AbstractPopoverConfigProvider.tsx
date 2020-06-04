import React, { Component, ReactNode } from 'react'
import { PopoverConfigHandler } from './PopoverConfigHandler'

export const ConfigContext = React.createContext<PopoverConfigHandler>(
  new PopoverConfigHandler()
)

export abstract class AbstractPopoverConfigProvider extends Component {
  abstract getPluginId(): string

  abstract getHelpPath(): string

  abstract getDocPath(): string

  abstract getI18nPath(): string

  getIcon(): string {
    return 'far fa-question-circle'
  }

  render(): ReactNode {
    return (
      <ConfigContext.Provider
        value={
          new PopoverConfigHandler(
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
