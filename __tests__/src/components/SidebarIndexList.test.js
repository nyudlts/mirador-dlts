import { shallow } from 'enzyme';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Utils } from 'manifesto.js';
import { SidebarIndexList } from '../../../src/components/SidebarIndexList';
import SidebarIndexItem from '../../../src/containers/SidebarIndexItem';
import manifestJson from '../../fixtures/version-2/019.json';

/**
 * Helper function to create a shallow wrapper around SidebarIndexList
 */
function createWrapper(props) {
  const canvases = Utils.parseManifest(manifestJson).getSequences()[0].getCanvases();

  return shallow(
    <SidebarIndexList
      id="asdf"
      canvases={canvases}
      classes={{}}
      t={key => key}
      windowId="xyz"
      setCanvas={() => {}}
      config={{ canvasNavigation: { height: 100 } }}
      updateVariant={() => {}}
      selectedCanvasIds={[canvases[1].id]}
      {...props}
    />,
  );
}

describe('SidebarIndexList', () => {
  let setCanvas;

  beforeEach(() => {
    setCanvas = jest.fn();
  });

  it('renders all needed elements for the thumbnail view', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(MenuList).length).toBe(1);
    expect(wrapper.find(MenuItem).length).toBe(3);
    expect(wrapper.find(MenuItem).first().props().component).toEqual('li');
    expect(wrapper.find(MenuItem).at(1).props().selected).toBe(true);
    expect(wrapper.find(MenuList).find(SidebarIndexItem).length).toBe(3);
  });

  it('renders all needed elements for the item view', () => {
    const wrapper = createWrapper({ variant: 'item' });
    expect(wrapper.find(MenuList).length).toBe(1);
    expect(wrapper.find(MenuItem).length).toBe(3);
    expect(wrapper.find(MenuItem).first().props().component).toEqual('li');
    expect(wrapper.find(MenuList).find(SidebarIndexItem).length).toBe(3);
  });

  it('should call the onClick handler of a list item', () => {
    const wrapper = createWrapper({ setCanvas });
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(1);
  });

  describe('getIdAndLabelOfCanvases', () => {
    it('should return id and label of each canvas in manifest', () => {
      const canvases = Utils
        .parseManifest(manifestJson)
        .getSequences()[0]
        .getCanvases();
      const wrapper = createWrapper({ canvases });
      const received = wrapper.instance().getIdAndLabelOfCanvases(canvases);
      const expected = [
        {
          id: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json',
          label: 'Test 19 Canvas: 1',
        },
        {
          id: 'https://purl.stanford.edu/fr426cg9537/iiif/canvas/fr426cg9537_1',
          label: 'Image 1',
        },
        {
          id: 'https://purl.stanford.edu/rz176rt6531/iiif/canvas/rz176rt6531_1',
          label: 'Image 2',
        },
      ];
      expect(received).toEqual(expected);
    });

    it('should return empty array if canvas if empty', () => {
      const wrapper = createWrapper({ canvases: [] });
      const received = wrapper.instance().getIdAndLabelOfCanvases([]);
      expect(received).toEqual([]);
    });
  });
});
