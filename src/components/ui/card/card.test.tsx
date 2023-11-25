import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from './';

jest.mock('next/navigation');
const pushMock = jest.fn();
const backMock = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
  back: backMock,
});

(useSearchParams as jest.Mock).mockReturnValue({
  get: () => 'test',
});

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Card
        id={1}
        name="name"
        description="description"
        image="/image/pepe.webp"
        page={1}
      />
    );

    const image = await screen.findByAltText('name');
    const title = screen.getByText('name');
    const description = screen.getByText('description');
    const imgSrc = image.getAttribute('src');

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(imgSrc).toEqual('/_next/image?url=%2Fimage%2Fpepe.webp&w=640&q=75');
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <Card
        id={1}
        name="name"
        description="description"
        image="/image/pepe.webp"
        page={1}
      />
    );

    const linkToDetails = await screen.findByRole('img', { name: 'name' });
    expect(linkToDetails).toBeInTheDocument();

    await userEvent.click(linkToDetails);
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith(
      '/page/1/details/1?search=test&itemqty=test'
    );
  });
});
