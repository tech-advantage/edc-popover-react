import React, { Component } from 'react'
import './EdcHelp.scss'
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'

export class EdcHelp extends Component {
  render() {
    const icon = 'fa fa-question-circle-o help-icon on-dark'
    return <i className={icon} />
  }
}
