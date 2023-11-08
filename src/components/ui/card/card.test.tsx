import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Card } from './card';

test('render card', () => {
  render(
    <Router>
      <Card
        id={1}
        name="name"
        description="description"
        image="image"
        page={1}
      />
    </Router>
  );

  const image = screen.getByAltText('name');
  const title = screen.getByText('name');
  const description = screen.getByText('description');
  const imgSrc = image.getAttribute('src');

  expect(image).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(imgSrc).toEqual('image');
});
