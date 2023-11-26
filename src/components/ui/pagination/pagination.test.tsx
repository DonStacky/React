import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from './pagination';

jest.mock('next/navigation');
const pushMock = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

(useSearchParams as jest.Mock).mockReturnValue({
  get: () => '',
});

describe('Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    render(<Pagination currentPage={1} lastPage={3} />);

    const firstPage = screen.getByRole('button', { name: '<<' });
    const prevPage = screen.getByRole('button', { name: '<' });
    const nextPage = screen.getByRole('button', { name: '>' });
    const lastPage = screen.getByRole('button', { name: '>>' });

    await userEvent.click(firstPage);
    expect(pushMock).toHaveBeenCalledWith(`/page/1?search=&itemqty=`);

    await userEvent.click(nextPage);
    expect(pushMock).toHaveBeenCalledWith(`/page/2?search=&itemqty=`);

    await userEvent.click(lastPage);
    expect(pushMock).toHaveBeenCalledWith(`/page/3?search=&itemqty=`);

    await userEvent.click(prevPage);
    expect(pushMock).toHaveBeenCalledWith(`/page/2?search=&itemqty=`);
  });
});
