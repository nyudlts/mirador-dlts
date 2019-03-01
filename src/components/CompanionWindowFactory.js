import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindowSideBarAnnotationsPanel from '../containers/WindowSideBarAnnotationsPanel';
import WindowSideBarInfoPanel from '../containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../containers/WindowSideBarCanvasPanel';

/**
 * Render a companion window using the appropriate component for the content
 */
export class CompanionWindowFactory extends Component {
  /** */
  render() {
    const { content, windowId, id } = this.props;

    switch (content) {
      case 'info':
        return (<WindowSideBarInfoPanel id={id} windowId={windowId} />);
      case 'canvas_navigation':
        return (<WindowSideBarCanvasPanel id={id} windowId={windowId} />);
      case 'annotations':
        return <WindowSideBarAnnotationsPanel id={id} windowId={windowId} />;
      default:
        return (<></>);
    }
  }
}

CompanionWindowFactory.propTypes = {
  content: PropTypes.string,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

CompanionWindowFactory.defaultProps = {
  content: null,
};
