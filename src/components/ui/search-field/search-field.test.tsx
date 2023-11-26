import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchField } from './';

jest.mock('next/navigation');
const pushMock = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

(useSearchParams as jest.Mock).mockReturnValue({
  get: () => 'test',
});

describe('Tests for the Search component', () => {
  it('Check that the component retrieves the value from the useSearchParams upon mounting', async () => {
    render(<SearchField />);

    const textbox = await screen.findByRole('textbox');
    expect(textbox).toBeInTheDocument();
    expect(textbox).toHaveValue('test');
  });

  it('Verify that clicking the Search button updates URL query parameter when page changes', async () => {
    render(<SearchField />);

    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, { target: { value: 'searchTerm' } });
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith(
      `/page/1?search=searchTerm&itemqty=test`
    );
  });
});
