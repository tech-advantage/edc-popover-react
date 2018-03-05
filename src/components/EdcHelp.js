import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
import { EdcClient } from 'edc-client-js';
import { EdcPopover } from './EdcPopover';
import './help.css';

const DEFAULT_ICON = 'fa-question-circle-o';

export class EdcHelp extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      helper: {
        label: '',
        description: ''
      }
    };
  }

  componentDidMount() {
    let edcClient = new EdcClient(
      this.context.docPath,
      this.context.pluginId,
      true
    );

    edcClient
      .getHelper(this.props.mainKey, this.props.subKey)
      .then(helper => {
        //console.log('Helper: ' + helper);
        if (helper) {
          //console.log('Title: ' + helper.label);
          // setState will trigger a render with updated state
          this.setState({
            helper
          });
        }
      })
      .catch(error => console.log('Erreur: ' + error));
  }

  render() {
    let { icon } = this.context;

    // check provided value, if undefined then use default
    if (icon === undefined) {
      icon = DEFAULT_ICON;
    }

    // add styling
    icon = 'fa ' + icon + ' help-icon';

    // styling for dark background
    if (this.props.dark) {
      icon = icon + ' on-dark';
    }

    const popover = (
      <EdcPopover
        id="popover-positioned-bottom"
        title={this.state.helper.label}
        content={this.state.helper.description}
      />
    );

    return (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
        overlay={popover}
      >
        <i className={icon} />
      </OverlayTrigger>
    );
  }

  static contextTypes = {
    icon: PropTypes.string,
    pluginId: PropTypes.string.isRequired,
    helpPath: PropTypes.string,
    docPath: PropTypes.string.isRequired
  };

  // mainKey is used because key is reserved in React
  static propTypes = {
    pluginId: PropTypes.string,
    mainKey: PropTypes.string.isRequired,
    subKey: PropTypes.string.isRequired,
    placement: PropTypes.string,
    dark: PropTypes.bool
  };
}
