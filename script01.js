import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SportsNewsSection from './sports-news-section';

describe('SportsNewsSection', () => {
  test('renders main components', () => {
    render(<SportsNewsSection />);
    
    expect(screen.getByAltText('Sports News Logo')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByText('Top News')).toBeInTheDocument();
    expect(screen.getByText('Week 2 Schedule')).toBeInTheDocument();
    expect(screen.getByText('© JW\'s Pick\'em League 2024')).toBeInTheDocument();
  });

  test('renders correct number of news items', () => {
    render(<SportsNewsSection />);
    const newsItems = screen.getAllByRole('article');
    expect(newsItems.length).toBe(6); // 3 featured items + 3 news grid items
  });

  test('renders team logos', () => {
    render(<SportsNewsSection />);
    const teamLogos = screen.getAllByAltText(/Team logo/);
    expect(teamLogos.length).toBe(6);
  });

  test('renders schedule list', () => {
    render(<SportsNewsSection />);
    const scheduleList = screen.getByRole('list', { name: /Week 2 Schedule/i });
    const scheduleItems = within(scheduleList).getAllByRole('listitem');
    expect(scheduleItems.length).toBe(17); // Assuming 17 games in the schedule
  });
});

function toggleMenu() {
  var menuContent = document.getElementById("menu-content");
  if (menuContent.style.display === "block") {
    menuContent.style.display = "none";
  } else {
    menuContent.style.display = "block";
  }
}