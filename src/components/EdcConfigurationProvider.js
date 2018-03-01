import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export class EdcConfigurationProvider extends Component {
  getChildContext() {
    return {
      pluginId: this.props.pluginId,
      helpPath: this.props.helpPath,
      docPath: this.props.docPath,
      icon: this.props.icon
    };
  }

  render() {
    return Children.only(this.props.children);
  }

  static propTypes = {
    pluginId: PropTypes.string.isRequired,
    helpPath: PropTypes.string.isRequired,
    docPath: PropTypes.string.isRequired,
    icon: PropTypes.string
  };

  static childContextTypes = {
    pluginId: PropTypes.string.isRequired,
    helpPath: PropTypes.string.isRequired,
    docPath: PropTypes.string.isRequired,
    icon: PropTypes.string
  };
}
