import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Hypno Pharmacy app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check if the app renders without errors
  expect(document.body).toBeInTheDocument();
});

test('renders navigation sidebar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check if navigation is present
  const navElement = document.querySelector('.side-nav');
  expect(navElement).toBeTruthy();
});

test('renders main content area', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check if main content area exists
  const mainElement = document.querySelector('.main-content');
  expect(mainElement).toBeTruthy();
});
