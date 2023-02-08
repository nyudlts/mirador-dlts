import { mount } from 'enzyme';
import { ManifestForm } from '../../../src/components/ManifestForm';

/** create wrapper */
function createWrapper(props) {
  return mount(
    <ManifestForm
      addResource={() => {}}
      t={str => str}
      {...props}
    />,
  );
}

describe('ManifestForm', () => {
  it('renders nothing if it is not open', () => {
    const wrapper = createWrapper({ addResourcesOpen: false });
    expect(wrapper.find('ForwardRef(TextField)[label="addManifestUrl"]').length).toBe(0);
  });

  it('renders the form fields', () => {
    const wrapper = createWrapper({ addResourcesOpen: true });
    expect(wrapper.find('ForwardRef(TextField)[label="addManifestUrl"]').length).toBe(1);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('has a cancel button when a cancel action is provided', () => {
    const onCancel = jest.fn();
    const wrapper = createWrapper({ addResourcesOpen: true, onCancel });
    wrapper.setState({ formValue: 'asdf' });

    expect(wrapper.find('button[onClick]').length).toBe(1);

    wrapper.find('button[onClick]').simulate('click');

    expect(onCancel).toHaveBeenCalled();
    expect(wrapper.state().formValue).toBe('');
  });

  it('triggers an action when the form is submitted', () => {
    const addResource = jest.fn();
    const onSubmit = jest.fn();
    const wrapper = createWrapper({ addResource, addResourcesOpen: true, onSubmit });
    wrapper.setState({ formValue: 'asdf' });

    wrapper.setState({ formValue: 'http://example.com/iiif' });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(addResource).toHaveBeenCalledWith('http://example.com/iiif');
    expect(onSubmit).toHaveBeenCalled();
    expect(wrapper.state().formValue).toBe('');
  });
});
