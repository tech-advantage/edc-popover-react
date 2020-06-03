import React, { Component } from 'react'
import './EdcHelp.scss'
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'

export class EdcHelp extends Component<{}, {}> {
  render() {
    const tmpIcon = 'fa-question-circle-o'
    const finalIcon = 'fa ' + tmpIcon + ' help-icon on-dark'
    return <i className={finalIcon} />
  }
}
