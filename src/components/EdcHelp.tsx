import React, { Component, ReactNode } from 'react'
import './EdcHelp.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

export class EdcHelp extends Component {
  render(): ReactNode {
    const icon = 'far fa-question-circle help-icon on-dark'
    return <i className={icon} />
  }
}
