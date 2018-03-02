import React, { Component } from 'react';
import { Popover } from 'react-bootstrap';

export class EdcPopover extends Component {
  render() {
    return <Popover {...this.props}>{this.props.content}</Popover>;
  }
}
