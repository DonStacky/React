import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import DetailedCard from '../../../../pages/page/[number]/details/[id]';
import { detailedPageData, pageData } from '../../../shared/test-data';

jest.mock('next/router', () => require('next-router-mock'));

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

describe('Tests for the Detailed Card component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(<DetailedCard detailsData={detailedPageData} pageData={pageData} />);

    const name = await screen.findByRole('heading', {
      name: 'Bulbasaur',
      level: 2,
    });
    const height = await screen.findByRole('heading', { name: 'Height' });
    const weight = await screen.findByRole('heading', { name: 'Weight' });
    const img = await screen.findByRole('img', { name: 'Bulbasaur' });

    expect(name).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    const imgSrc = img.getAttribute('src');
    const heightInfo = screen.getByText('0.7 m');
    const weightInfo = screen.getByText('6.9 kg');
    const typesInfo = screen.getByText('grass, poison');

    expect(imgSrc).toEqual(
      '/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2FPokeAPI%2Fsprites%2Fmaster%2Fsprites%2Fpokemon%2Fother%2Fofficial-artwork%2F1.png&w=640&q=75'
    );
    expect(heightInfo).toBeInTheDocument();
    expect(weightInfo).toBeInTheDocument();
    expect(typesInfo).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(<DetailedCard detailsData={detailedPageData} pageData={pageData} />);

    const detailedCard = screen.getByRole('heading', {
      name: 'Stage of evolution',
    });
    expect(detailedCard).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', { name: 'x' });
    await userEvent.click(closeButton);
    expect(backMock).toHaveBeenCalled();
  });
});
