import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import WorkspaceMosaic from '../../../src/containers/WorkspaceMosaic';
import WorkspaceElastic from '../../../src/containers/WorkspaceElastic';
import Window from '../../../src/containers/Window';
import { Workspace } from '../../../src/components/Workspace';
import { IIIFDropTarget } from '../../../src/components/IIIFDropTarget';

/**
 * Utility function to create a Worksapce
 * component with all required props set
*/
function createWrapper(props) {
  return shallow(
    <Workspace
      classes={{}}
      isWorkspaceControlPanelVisible
      windowIds={['1', '2']}
      workspaceId="foo"
      workspaceType="mosaic"
      t={k => k}
      {...props}
    />,
  );
}

describe('Workspace', () => {
  describe('if workspace type is elastic', () => {
    it('should render <WorkspaceElastic/> properly', () => {
      const wrapper = createWrapper({ workspaceType: 'elastic' });

      expect(wrapper.matchesElement(
        <IIIFDropTarget>
          <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
            <Typography>miradorViewer</Typography>
            <WorkspaceElastic />
          </div>
        </IIIFDropTarget>,
      )).toBe(true);
    });
  });
  describe('if workspace type is mosaic', () => {
    it('should render <WorkspaceMosaic/> properly', () => {
      const wrapper = createWrapper();

      expect(wrapper.matchesElement(
        <IIIFDropTarget>
          <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
            <Typography>miradorViewer</Typography>
            <WorkspaceMosaic />
          </div>
        </IIIFDropTarget>,
      )).toBe(true);
    });
  });
  describe('if workspace type is unknown', () => {
    it('should render <Window/> components as list', () => {
      const wrapper = createWrapper({ workspaceType: 'bubu' });
      expect(wrapper.matchesElement(
        <IIIFDropTarget>
          <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
            <Typography>miradorViewer</Typography>
            <Window windowId="1" />
            <Window windowId="2" />
          </div>
        </IIIFDropTarget>,
      )).toBe(true);
    });
  });
  describe('if any windows are maximized', () => {
    it('should render only maximized <Window/> components', () => {
      const wrapper = createWrapper({ maximizedWindowIds: ['1'] });
      expect(wrapper.matchesElement(
        <IIIFDropTarget>
          <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
            <Typography>miradorViewer</Typography>
            <Window windowId="1" className="mirador-workspace-maximized-window" />
          </div>
        </IIIFDropTarget>,
      )).toBe(true);
    });
  });

  describe('if there are no windows', () => {
    it('should render placeholder content', () => {
      const wrapper = createWrapper({ windowIds: [] });

      expect(wrapper.find(Typography).at(1).matchesElement(
        <Typography>welcome</Typography>,
      )).toBe(true);
    });
  });

  describe('when the workspace control panel is displayed', () => {
    it('has the *-with-control-panel class applied', () => {
      const wrapper = createWrapper();

      expect(wrapper.find('.mirador-workspace-with-control-panel').length).toBe(1);
    });
  });

  describe('when the workspace control panel is not displayed', () => {
    it('does not have the *-with-control-panel class applied', () => {
      const wrapper = createWrapper({ isWorkspaceControlPanelVisible: false });

      expect(wrapper.find('.mirador-workspace-with-control-panel').length).toBe(0);
    });
  });

  describe('drag and drop', () => {
    it('adds a new window', () => {
      const canvasId = 'canvasId';
      const manifestId = 'manifest.json';
      const manifestJson = { data: '123' };

      const addWindow = jest.fn();

      const wrapper = createWrapper({ addWindow });

      wrapper.find(IIIFDropTarget).simulate('drop', { canvasId, manifestId, manifestJson });

      expect(addWindow).toHaveBeenCalledWith({ canvasId, manifest: manifestJson, manifestId });
    });

    it('is a no-op if allowNewWindows is off', () => {
      const canvasId = 'canvasId';
      const manifestId = 'manifest.json';
      const manifestJson = { data: '123' };

      const addWindow = jest.fn();
      const wrapper = createWrapper({ addWindow, allowNewWindows: false });
      wrapper.find(IIIFDropTarget).simulate('drop', { canvasId, manifestId, manifestJson });

      expect(addWindow).not.toHaveBeenCalled();
    });
  });
});
