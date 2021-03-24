import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'

import { PostCard } from "./PostCard";

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

test('loads and displays postCard', async () => {
  const onCommentsFunc = jest.fn();
  render(<PostCard post={mockPost} onCommentsClicked={onCommentsFunc} />)

  fireEvent.click(screen.getByRole('comments-button'))
  expect(onCommentsFunc).toBeCalled();
})
