import { mount } from 'enzyme';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

/** create wrapper */
function createWrapper(props) {
  return mount(
    <WindowSideBarButtons
      addCompanionWindow={() => {}}
      {...props}
      panels={{
        annotations: true,
        attribution: true,
        canvas: true,
        info: true,
        search: false,
        ...props.panels,
      }}
    />,
  );
}

describe('WindowSideBarButtons (shallow)', () => {
  const windowId = 'test123';
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({ windowId });
  });

  it('renders without an error', () => {
    expect(wrapper.find(Tabs).length).toBe(1);
  });

  it('triggers the addCompanionWindow prop on click', () => {
    const addCompanionWindow = jest.fn();
    wrapper = createWrapper({ addCompanionWindow, windowId });

    wrapper.find(Tabs).props().onChange({ target: { removeAttribute: () => {}, setAttribute: () => {} } }, 'info');
    expect(addCompanionWindow).toHaveBeenCalledTimes(1);
    expect(addCompanionWindow).toHaveBeenCalledWith('info');
  });

  it('has a badge indicating if the annotations panel has annotations', () => {
    let tab;
    wrapper = createWrapper({ hasAnnotations: true, windowId });
    tab = wrapper.find(Tab).find('[value="annotations"]');
    expect(tab.find(Badge).props().invisible).toBe(false);

    wrapper = createWrapper({ hasAnnotations: false, hasAnyAnnotations: true, windowId });
    tab = wrapper.find(Tab).find('[value="annotations"]');

    expect(tab.find(Badge).props().invisible).toBe(true);
  });

  it('hides the annotation panel if there are no annotations', () => {
    wrapper = createWrapper({ hasAnyAnnotations: false, windowId });
    expect(wrapper.find('WithStyles(Tab)[value="annotations"]').length).toEqual(0);
  });

  it('can hide annotation panel when configured to do so', () => {
    wrapper = createWrapper({ hasAnnotations: true, panels: { annotations: false }, windowId });
    expect(wrapper.find('WithStyles(Tab)[value="annotations"]').length).toEqual(0);
  });

  describe('search', () => {
    it('by default is off', () => {
      expect(wrapper.find('WithStyles(Tab)[value="search"]').length).toEqual(0);
    });

    it('can be configured to be on', () => {
      wrapper = createWrapper({ hasSearchService: true, panels: { search: true }, windowId });
      expect(wrapper.find('WithStyles(ForwardRef(Tab))[value="search"]').length).toEqual(1);
    });

    it('has a badge indicating if the search panel has active annotations', () => {
      let tab;
      wrapper = createWrapper({
        hasSearchResults: true,
        hasSearchService: true,
        panels: {
          search: true,
        },
        windowId,
      });
      tab = wrapper.find(Tab).find('[value="search"]');
      expect(tab.find(Badge).props().invisible).toBe(false);

      wrapper = createWrapper({
        hasSearchResults: false,
        hasSearchService: true,
        panels: {
          search: true,
        },
        windowId,
      });
      tab = wrapper.find(Tab).find('[value="search"]');

      expect(tab.find(Badge).props().invisible).toBe(true);
    });
  });

  describe('layers', () => {
    it('by default is off', () => {
      expect(wrapper.find('WithStyles(Tab)[value="layers"]').length).toEqual(0);
    });

    it('can be configured to be on', () => {
      wrapper = createWrapper({ hasAnyLayers: true, panels: { layers: true }, windowId });
      expect(wrapper.find('WithStyles(ForwardRef(Tab))[value="layers"]').length).toEqual(1);
    });

    it('has a badge indicating if there are currently any layers', () => {
      let tab;
      wrapper = createWrapper({
        hasAnyLayers: true,
        hasCurrentLayers: true,
        panels: {
          layers: true,
        },
        windowId,
      });
      tab = wrapper.find(Tab).find('[value="layers"]');
      expect(tab.find(Badge).props().invisible).toBe(false);

      wrapper = createWrapper({
        hasAnyLayers: true,
        hasCurrentLayers: false,
        panels: {
          layers: true,
        },
        windowId,
      });
      tab = wrapper.find(Tab).find('[value="layers"]');

      expect(tab.find(Badge).props().invisible).toBe(true);
    });
  });
});
