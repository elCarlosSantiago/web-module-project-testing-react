import React from 'react';
import { render, screen, wait, waitFor } from '@testing-library/react';
import Display from './../Display';
import userEvent from '@testing-library/user-event';
import { fetchShow as mockFetchShow } from './../../api/fetchShow';

jest.mock('./../../api/fetchShow');

const testShow = {
  name: 'Stranger Things',
  image: {
    medium:
      'https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg',
    original:
      'https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg',
  },
  summary:
    "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
  seasons: [
    {
      id: 0,
      name: 'Season 1',
      episodes: [],
    },
    {
      id: 1,
      name: 'Season 2',
      episodes: [],
    },
    {
      id: 2,
      name: 'Season 3',
      episodes: [],
    },
    {
      id: 3,
      name: 'Season 4',
      episodes: [],
    },
  ],
};

test('renders without props without error', () => {
  render(<Display />);
});

test('show component will display after fetch button is pressed', async () => {
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce(testShow);

  const button = screen.getByRole('button');
  userEvent.click(button);

  await waitFor(() => {
    const showContainer = screen.queryByTestId(/show-container/i);
    expect(showContainer).toBeInTheDocument();
    const h1ShowName = screen.getByRole('heading');
    expect(h1ShowName).toHaveTextContent(/stranger things/i);
  });
});

test('when fetch button is pressed select options equals seasons in test data', async () => {
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce(testShow);

  const button = screen.getByRole('button');
  userEvent.click(button);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId(/season-option/i);
    expect(seasonOptions.length).toEqual(testShow.seasons.length);
  });
});

test('functional prop passed function is called when button is pressed', async () => {
  //Arrange
  const mockDisplayFunc = jest.fn();
  render(<Display displayFunc={mockDisplayFunc} />);
  mockFetchShow.mockResolvedValueOnce(testShow);

  //Act
  const button = screen.getByRole('button');
  userEvent.click(button);

  await waitFor(() => {
    expect(mockDisplayFunc).toHaveBeenCalled();
    expect(mockDisplayFunc).toHaveBeenCalledTimes(1);
  });
});

///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
