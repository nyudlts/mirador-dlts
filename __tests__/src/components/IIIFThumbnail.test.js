import { shallow } from 'enzyme';
import { InView } from 'react-intersection-observer';
import Typography from '@material-ui/core/Typography';
import { IIIFThumbnail } from '../../../src/components/IIIFThumbnail';

/**
 * Helper function to create a shallow wrapper around IIIFThumbnail
 */
function createWrapper(props) {
  return shallow(
    <IIIFThumbnail
      {...props}
    />,
  );
}

describe('IIIFThumbnail', () => {
  let wrapper;
  const url = 'http://example.com/iiif/image';
  const thumbnail = { height: 120, url, width: 100 };
  beforeEach(() => {
    wrapper = createWrapper({ thumbnail });
  });

  it('renders properly', () => {
    expect(wrapper.matchesElement(
      <div>
        <InView onChange={wrapper.instance().handleIntersection}>
          <img alt="" />
        </InView>
      </div>,
    )).toBe(true);
  });

  it('renders a placeholder if there is no image', () => {
    wrapper = createWrapper({});
    expect(wrapper.matchesElement(
      <div>
        <InView onChange={wrapper.instance().handleIntersection}>
          <img alt="" />
        </InView>
      </div>,
    )).toBe(true);
    expect(wrapper.find('img').props().src).toMatch(/data:image\/png;base64/);
  });

  it('defaults using the placeholder image', () => {
    expect(wrapper.find('img').props().src).toMatch(/data:image\/png;base64/);
  });

  it('when handleIntersection is called, loads the image', () => {
    wrapper.instance().handleIntersection({ isIntersecting: true });
    expect(wrapper.find('img').props().src).toEqual(url);
  });

  it('can be constrained by maxHeight', () => {
    wrapper = createWrapper({ maxHeight: 100, thumbnail });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 100, width: 'auto' });
  });

  it('can be constrained by maxWidth', () => {
    wrapper = createWrapper({ maxWidth: 80, thumbnail });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 'auto', width: 80 });
  });

  it('can be constrained by maxWidth and maxHeight', () => {
    wrapper = createWrapper({ maxHeight: 90, maxWidth: 50, thumbnail });

    expect(wrapper.find('img').props().style).toMatchObject({ height: 60, width: 50 });
  });

  it('constrains what it can when the image dimensions are unknown', () => {
    wrapper = createWrapper({ maxHeight: 90, thumbnail: { height: 120, url } });
    expect(wrapper.find('img').props().style).toMatchObject({ height: 90, width: 'auto' });
  });

  it('renders a provided label', () => {
    wrapper = createWrapper({
      classes: { label: 'label' }, label: 'Some label', labelled: true, thumbnail,
    });
    expect(
      wrapper.find('div.label').at(0).matchesElement(
        <div className="label"><Typography>Some label</Typography></div>,
      ),
    ).toBe(true);
  });

  it('renders children', () => {
    wrapper = createWrapper({ children: <span id="hi" />, thumbnail });
    expect(wrapper.find('span').length).toEqual(1);
  });
});
