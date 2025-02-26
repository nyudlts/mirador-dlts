import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getWindowIds, getWindowTitles } from '../state/selectors';
import { WindowList } from '../components/WindowList';
import { withWorkspaceContext } from '../contexts/WorkspaceContext';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  focusWindow: actions.focusWindow,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    titles: getWindowTitles(state),
    windowIds: getWindowIds(state),
  }
);

const enhance = compose(
  withTranslation(),
  withWorkspaceContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowList'),
);

export default enhance(WindowList);
