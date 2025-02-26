import {
  render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkspaceSelectionDialog } from '../../../src/components/WorkspaceSelectionDialog';

describe('WorkspaceSelectionDialog', () => {
  let handleClose;
  let updateWorkspace;

  /**
   * create wrapper
   * @param {*} props additional properties
   */
  function createWrapper(props) {
    handleClose = jest.fn();
    updateWorkspace = jest.fn();

    return render(
      <WorkspaceSelectionDialog
        classes={{ list: 'list' }}
        open
        handleClose={handleClose}
        updateWorkspace={updateWorkspace}
        workspaceType="elastic"
        {...props}
      />,
    );
  }

  it('renders without an error', () => {
    createWrapper();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /elastic/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /mosaic/ })).toBeInTheDocument();
  });

  it('sends the updateConfig and handleClose props on workspace selection', async () => {
    const user = userEvent.setup();
    createWrapper();

    user.click(screen.getByRole('menuitem', { name: /elastic/ }));
    await waitFor(() => expect(updateWorkspace).toHaveBeenLastCalledWith({ type: 'elastic' }));

    user.click(screen.getByRole('menuitem', { name: /mosaic/ }));
    await waitFor(() => expect(updateWorkspace).toHaveBeenLastCalledWith({ type: 'mosaic' }));
    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(2));
  });

  describe('inital focus', () => {
    it('sets an onEntered prop on the Dialog that focuses the selected item', () => {
      createWrapper();

      const menuItem = screen.getByRole('menuitem', { name: /elastic/ });
      expect(menuItem).toHaveFocus();
    });
  });
});
