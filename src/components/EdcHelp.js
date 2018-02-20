import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './help.css'

const DEFAULT_ICON = "fa-question-circle-o"

export class EdcHelp extends Component {

  render() {
    let {icon} = this.context

    // check provided value, if undefined then use default
    if(icon === undefined) {
      icon = DEFAULT_ICON
    }

    // add styling
    icon = 'fa ' + icon + ' help-icon'

    // styling for dark background
    if(this.props.dark) {
      icon = icon + ' on-dark'
    }

    return <i className={icon}/>
  }

  static contextTypes = {
    icon: PropTypes.string,
  }

  // mainKey is used because key is reserved in React
  static propTypes = {
    pluginId: PropTypes.string,
    mainKey: PropTypes.string.isRequired,
    subKey: PropTypes.string.isRequired,
    placement: PropTypes.string,
    dark: PropTypes.bool,
  }
}
