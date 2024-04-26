import { render, fireEvent } from '@testing-library/react';
import AddCollection from '../components/Sidebar/AddCollection';

describe('AddCollection', () => {
  let showInput, setShowInput, inputRef;

  beforeEach(() => {
    showInput = true;
    setShowInput = jest.fn();
    inputRef = {
      current: {
        contains: jest.fn()
      }
    };
  });

  it('should call setShowInput with false when clicked outside', () => {
    const { getByTestId } = render(<AddCollection />);
    fireEvent.click(getByTestId('outside'));
    expect(setShowInput).toHaveBeenCalledWith(false);
  });

  it('should not call setShowInput when clicked inside', () => {
    inputRef.current.contains.mockReturnValue(true);
    const { getByTestId } = render(<AddCollection />);
    fireEvent.click(getByTestId('inside'));
    expect(setShowInput).not.toHaveBeenCalled();
  });

  it('should not call setShowInput when showInput is false', () => {
    showInput = false;
    const { getByTestId } = render(<AddCollection />);
    fireEvent.click(getByTestId('outside'));
    expect(setShowInput).not.toHaveBeenCalled();
  });

  it('should not call setShowInput when inputRef is null', () => {
    inputRef = null;
    const { getByTestId } = render(<AddCollection />);
    fireEvent.click(getByTestId('outside'));
    expect(setShowInput).not.toHaveBeenCalled();
  });
});