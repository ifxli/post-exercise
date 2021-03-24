import React from "react";
import { render } from '@testing-library/react'

import { PostList } from "./PostList";

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

const mockPosts = [
  {
    title: 'TestPost',
    body: 'TestPost body',
    comments: mockComments
  }, {
    title: 'TestPost1',
    body: 'TestPost1 body',
    comments: mockComments
  }
];

test('loads and displays postlist', async () => {
  const onCommentsFunc = jest.fn();
  render(<PostList posts={mockPosts} onCommentsClickedAt={onCommentsFunc} />)
})
