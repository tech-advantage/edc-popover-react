import React, { Component } from 'react';
import { Popover } from 'react-bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';

export class EdcPopover extends Component {
  render() {
    return <Popover {...this.props}>{this.props.contentH}</Popover>;
  }
}
