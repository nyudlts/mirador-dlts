import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { WorkspaceAdd } from '../../../src/components/WorkspaceAdd';
import ManifestListItem from '../../../src/containers/ManifestListItem';
import ManifestForm from '../../../src/containers/ManifestForm';
import { IIIFDropTarget } from '../../../src/components/IIIFDropTarget';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceAdd
      setWorkspaceAddVisibility={() => {}}
      catalog={[
        { manifestId: 'bar' },
        { manifestId: 'foo' },
      ]}
      classes={{}}
      t={str => str}
      {...props}
    />,
  );
}

describe('WorkspaceAdd', () => {
  it('renders a list item for each manifest in the state', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(ManifestListItem).length).toBe(2);
  });

  it('focuses on the first manifest item', () => {
    const el = { focus: jest.fn() };
    const wrapper = createWrapper();
    expect(wrapper.find(ManifestListItem).at(1).prop('buttonRef')).toBe(undefined);
    wrapper.find(ManifestListItem).at(0).prop('buttonRef')(el);

    expect(el.focus).toHaveBeenCalled();
  });

  it('without manifests, renders an empty message', () => {
    const wrapper = createWrapper({ catalog: [] });
    expect(wrapper.find(ManifestListItem).length).toEqual(0);
    expect(wrapper.find(Typography).first().children().text()).toEqual('emptyResourceList');
  });

  it('toggles the workspace visibility', () => {
    const setWorkspaceAddVisibility = jest.fn();
    const wrapper = createWrapper({ setWorkspaceAddVisibility });

    wrapper.find(ManifestListItem).first().props().handleClose();
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(false);
  });

  it('has a button to add new resources', () => {
    const wrapper = createWrapper();

    expect(wrapper.find(Fab).length).toBe(1);
    wrapper.find(Fab).simulate('click');
    expect(wrapper.state().addResourcesOpen).toBe(true);
    expect(wrapper.find(Fab).props().disabled).toBe(true);
  });

  it('has a toggle-able drawer to add new resources', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find(Drawer).props().open).toBe(true);
    expect(wrapper.find(Drawer).find(Typography).dive().dive()
      .text()).toBe('addResource');

    wrapper.find(Drawer).find(AppBar).simulate('click');
    expect(wrapper.find(Drawer).find(Typography).props().open).not.toBe(true);
  });

  it('passes a submit action through to the form', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find(Drawer).find(ManifestForm).length).toBe(1);
    wrapper.find(Drawer).find(ManifestForm).props().onSubmit();
    expect(wrapper.find(Drawer).props().open).toBe(false);
  });

  it('scrolls to the top after an item is added', () => {
    const ref = { current: { scrollTo: jest.fn() } };
    const wrapper = createWrapper();
    wrapper.instance().ref = ref;
    wrapper.instance().onSubmit();

    expect(ref.current.scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', left: 0, top: 0 });
  });

  it('passes a cancel action through to the form', () => {
    const wrapper = createWrapper();
    wrapper.setState({ addResourcesOpen: true });

    expect(wrapper.find(Drawer).find(ManifestForm).length).toBe(1);
    wrapper.find(Drawer).find(ManifestForm).props().onCancel();
    expect(wrapper.find(Drawer).props().open).toBe(false);
  });

  describe('drag and drop', () => {
    it('adds a new catalog entry from a manifest', () => {
      const manifestId = 'manifest.json';
      const manifestJson = { data: '123' };

      const addResource = jest.fn();

      const wrapper = createWrapper({ addResource });

      wrapper.find(IIIFDropTarget).simulate('drop', { manifestId, manifestJson });

      expect(addResource).toHaveBeenCalledWith(manifestId, manifestJson, { provider: 'file' });
    });

    it('adds a new catalog entry from a manifestId', () => {
      const manifestId = 'manifest.json';

      const addResource = jest.fn();

      const wrapper = createWrapper({ addResource });

      wrapper.find(IIIFDropTarget).simulate('drop', { manifestId });

      expect(addResource).toHaveBeenCalledWith(manifestId);
    });
  });
});
