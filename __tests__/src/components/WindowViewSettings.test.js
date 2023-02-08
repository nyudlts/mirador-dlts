import { mount } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { WindowViewSettings } from '../../../src/components/WindowViewSettings';

/** create wrapper */
function createWrapper(props) {
  return mount(
    <WindowViewSettings
      classes={{}}
      windowId="xyz"
      setWindowViewType={() => {}}
      viewTypes={['single', 'book', 'scroll', 'gallery']}
      windowViewType="single"
      {...props}
    />,
  );
}

describe('WindowViewSettings', () => {
  it('renders all elements correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(ListSubheader).length).toBe(1);
    const labels = wrapper.find(FormControlLabel);
    expect(labels.length).toBe(4);
    expect(labels.at(0).props().value).toBe('single');
    expect(labels.at(1).props().value).toBe('book');
    expect(labels.at(2).props().value).toBe('scroll');
    expect(labels.at(3).props().value).toBe('gallery');
  });

  it('should set the correct label active (by setting the secondary color)', () => {
    let wrapper = createWrapper({ windowViewType: 'single' });
    expect(wrapper.find(FormControlLabel).at(0).props().control.props.color).toEqual('secondary');
    expect(wrapper.find(FormControlLabel).at(1).props().control.props.color).not.toEqual('secondary');

    wrapper = createWrapper({ windowViewType: 'book' });
    expect(wrapper.find(FormControlLabel).at(1).props().control.props.color).toEqual('secondary');

    wrapper = createWrapper({ windowViewType: 'scroll' });
    expect(wrapper.find(FormControlLabel).at(2).props().control.props.color).toEqual('secondary');

    wrapper = createWrapper({ windowViewType: 'gallery' });
    expect(wrapper.find(FormControlLabel).at(3).props().control.props.color).toEqual('secondary');
  });

  it('updates state when the view config selection changes', () => {
    const setWindowViewType = jest.fn();
    const wrapper = createWrapper({ setWindowViewType });
    wrapper.find(MenuItem).at(0).simulate('click');
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'single');
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'book');
    wrapper.find(MenuItem).at(2).simulate('click');
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'scroll');
    wrapper.find(MenuItem).at(3).simulate('click');
    expect(setWindowViewType).toHaveBeenCalledWith('xyz', 'gallery');
  });

  it('sets autofocus on the selected MenuItem', () => {
    const wrapper = mount(
      <WindowViewSettings
        classes={{}}
        windowId="xyz"
        setWindowViewType={() => {}}
        viewTypes={['single', 'book', 'scroll', 'gallery']}
        windowViewType="book"
      />,
    );

    expect(
      wrapper.find(MenuItem).at(1).prop('autoFocus'),
    ).toEqual(true);
  });
});
