import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
//import { EdcClient } from 'edc-client-js';
import 'font-awesome/css/font-awesome.min.css';
import './help.css';
import { EdcPopover } from './EdcPopover';

const DEFAULT_ICON = 'fa-question-circle-o';

export class EdcHelp extends Component {
  state = {
    title: 'Title'
  };

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

    //let edcClient = new EdcClient('/doc/')
    //edcClient.getContext().then((json) => this.state.title = json.fr.techad.edc.help.center.label)

    const popovr = (
      //  <Popover id="popover-positioned-bottom" title="Popover Bottom">
      //    <strong>Need some help?</strong> Check this info.
      //  </Popover>
      <EdcPopover id="popover-positioned-bottom" title={this.state.title} />
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
    icon: PropTypes.string
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
