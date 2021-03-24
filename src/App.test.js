import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';

import { Provider } from "react-redux";
import store from "./redux/store";

test('renders App', async () => {
  render(<Provider store={store}><App /></Provider>);

  await waitForElementToBeRemoved(screen.getByRole('progressbar'), { timeout: 3000 })

  const items = await screen.findAllByRole('comments-button')
  expect(items).toHaveLength(100)

  fireEvent.click(items[0])
  expect(screen.getAllByRole('dialog')).toHaveLength(1)
});
