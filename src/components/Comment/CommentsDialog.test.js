import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'

import CommentsDialog from "./CommentsDialog";

const mockComments = [
  {
    name: 'Test',
    email: 'test@test.com',
    body: 'Test mock text'
  }, {
    name: 'Test1',
    email: 'test1@test.com',
    body: 'Test1 mock text'
  }
];
const mockPost = {
  title: 'TestPost',
  body: 'TestPost body',
  comments: mockComments
};

test('loads and displays commentsdialog', async () => {
  const onCloseFunc = jest.fn();
  render(<CommentsDialog post={mockPost} onAddComment={() => {}} onDialogClose={onCloseFunc}/>)

  const commentInput = screen.getByTestId(/comment-input/i).getElementsByTagName('input')[0];
  fireEvent.change(commentInput, {
    target: {value: 'test'},
  })
  expect(commentInput.value).toBe('test')

  fireEvent.click(screen.getByTestId(/comment-button/i));
  setTimeout(() => {
    expect(commentInput.value).toBe('');  
  }, 100);

  const closeButton = screen.getByTestId(/close-button/i);
  fireEvent.click(closeButton);
  expect(onCloseFunc).toBeCalled();
})
