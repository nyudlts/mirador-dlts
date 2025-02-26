import { shallow } from 'enzyme';
import Slide from '@material-ui/core/Slide';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeftSharp';
import ArrowRightIcon from '@material-ui/icons/ArrowRightSharp';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { CompanionArea } from '../../../src/components/CompanionArea';
import CompanionWindowFactory from '../../../src/containers/CompanionWindowFactory';

/** */
function createWrapper(props) {
  return shallow(
    <CompanionArea
      classes={{ horizontal: 'horizontal' }}
      direction="ltr"
      windowId="abc123"
      position="right"
      companionAreaOpen
      companionWindowIds={['foo', 'baz']}
      t={key => key}
      {...props}
    />,
  );
}

describe('CompanionArea', () => {
  it('should render all <CompanionWindow>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionWindowFactory).length).toBe(2);
    expect(wrapper.find(Slide).prop('direction')).toBe('left');
  });

  it('when rtl, the left slide should be from the right', () => {
    const wrapper = createWrapper({
      direction: 'rtl',
    });
    expect(wrapper.find(CompanionWindowFactory).length).toBe(2);
    expect(wrapper.find(Slide).prop('direction')).toBe('right');
  });

  it('when rtl, the right slide should be from the left', () => {
    const wrapper = createWrapper({
      direction: 'rtl',
      position: 'left',
    });
    expect(wrapper.find(CompanionWindowFactory).length).toBe(2);
    expect(wrapper.find(Slide).prop('direction')).toBe('left');
  });

  it('should add the appropriate classes when the companion area fills the full width', () => {
    const wrapper = createWrapper({ position: 'bottom' });
    expect(wrapper.find('div.horizontal').length).toBe(2);
    expect(wrapper.find(Slide).prop('direction')).toBe('up');
  });

  it('should pass correct props to the <CompanionWindow> components', () => {
    const wrapper = createWrapper();
    const props = wrapper.find(CompanionWindowFactory).at(0).props();
    expect(props.id).toBe('foo');
    expect(props.windowId).toBe('abc123');
  });

  it('has a toggle to show the companion area window in the left position', () => {
    const setCompanionAreaOpen = jest.fn();

    const wrapper = createWrapper({
      companionAreaOpen: false,
      position: 'left',
      setCompanionAreaOpen,
      sideBarOpen: true,
    });

    expect(wrapper.find(MiradorMenuButton).length).toBe(1);
    expect(wrapper.find(MiradorMenuButton).first().children(ArrowRightIcon).length).toBe(1);
    expect(wrapper.find(Slide).prop('direction')).toBe('right');
    expect(wrapper.find(MiradorMenuButton).prop('aria-expanded')).toBe(false);
    expect(wrapper.find('div.mirador-companion-windows').length).toBe(1);
    expect(wrapper.find('div.mirador-companion-windows').props().style.display).toBe('none'); // eslint-disable-line jest-dom/prefer-to-have-style

    wrapper.find(MiradorMenuButton).first().props().onClick(); // Trigger the onClick prop

    expect(setCompanionAreaOpen).toHaveBeenCalledWith('abc123', true);
  });

  it('has a toggle to hide the companion area window in the left position', () => {
    const setCompanionAreaOpen = jest.fn();

    const wrapper = createWrapper({
      companionAreaOpen: true,
      position: 'left',
      setCompanionAreaOpen,
      sideBarOpen: true,
    });

    expect(wrapper.find(MiradorMenuButton).length).toBe(1);
    expect(wrapper.find(MiradorMenuButton).first().children(ArrowLeftIcon).length).toBe(1);
    expect(wrapper.find(MiradorMenuButton).prop('aria-expanded')).toBe(true);

    expect(wrapper.find('div.mirador-companion-windows').length).toBe(1);
    expect(wrapper.find('div.mirador-companion-windows').props().style.display).toBe('flex'); // eslint-disable-line jest-dom/prefer-to-have-style

    wrapper.find(MiradorMenuButton).first().props().onClick(); // Trigger the onClick prop

    expect(setCompanionAreaOpen).toHaveBeenCalledWith('abc123', false);
  });

  it('does not show a toggle if the sidebar is collapsed', () => {
    const wrapper = createWrapper({
      companionAreaOpen: true,
      position: 'left',
      setCompanionAreaOpen: () => {},
      sideBarOpen: false,
    });

    expect(wrapper.find(MiradorMenuButton).length).toBe(0);
  });

  it('does not show a toggle in other positions', () => {
    const wrapper = createWrapper({
      companionAreaOpen: true,
      position: 'whatever',
      setCompanionAreaOpen: () => {},
      sideBarOpen: true,
    });

    expect(wrapper.find(MiradorMenuButton).length).toBe(0);
  });
});
