import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Post } from "./Post";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with mockPost", () => {
  
  const mockPost = {
    title: 'Test',
    body: 'Test mock text'
  };
  
  act(() => {
    render(<Post post={mockPost}/>, container);
  });
  expect(container.textContent).toContain(mockPost.title);
  expect(container.textContent).toContain(mockPost.body);
});
