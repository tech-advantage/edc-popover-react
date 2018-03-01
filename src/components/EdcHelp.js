import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
import { EdcClient } from 'edc-client-js/dist/edc-client.js';
import 'font-awesome/css/font-awesome.min.css';
import './help.css';
import { EdcPopover } from './EdcPopover';

const DEFAULT_ICON = 'fa-question-circle-o';

export class EdcHelp extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      helper: { label: 'Hello' }
    };
  }

  componentDidMount() {
    const _this = this;

    let edcClient = new EdcClient(
      this.context.docPath,
      this.context.pluginId,
      true
    );

    edcClient
      .getHelper(this.props.mainKey, this.props.subKey)
      .then(helper => {
        console.log('Helper: ' + helper);
        if (helper) {
          console.log('Title: ' + helper.label);
          _this.setState({
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

    // TODO il faudrait passer les données async par une fonction
    // ex: onMount={contentProvider}
    const popovr = (
      <EdcPopover
        id="popover-positioned-bottom"
        title={this.state.helper.label}
        contentH={this.state.helper.description}
      />
    );

    return (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
        overlay={popovr}
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
