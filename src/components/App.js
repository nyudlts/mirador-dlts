import { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import PluginProvider from '../extend/PluginProvider';
import AppProviders from '../containers/AppProviders';

const WorkspaceArea = lazy(() => import('../containers/WorkspaceArea'));

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export class App extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { dndManager, plugins } = this.props;

    return (
      <PluginProvider plugins={plugins}>
        <AppProviders dndManager={dndManager}>
          <Suspense
            fallback={<div />}
          >
            <WorkspaceArea />
          </Suspense>
        </AppProviders>
      </PluginProvider>
    );
  }
}

App.propTypes = {
  dndManager: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  plugins: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  dndManager: undefined,
  plugins: [],
};

export default App;
