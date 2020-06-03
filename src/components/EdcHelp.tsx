import React, { Component } from 'react'
import './EdcHelp.scss'
import 'font-awesome/scss/font-awesome.scss'

export class EdcHelp extends Component<{}, {}> {
  render() {
    const tmpIcon = 'fa-question-circle-o'
    const finalIcon = tmpIcon + ' help-icon on-dark'
    return <i className={finalIcon} />
  }
}
