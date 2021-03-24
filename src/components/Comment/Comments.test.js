import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Comments } from "./Comments";

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

it("renders with mockComments", () => {
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
  act(() => {
    render(<Comments comments={mockComments}/>, container);
  });
  expect(container.textContent).toContain(mockComments[0].name);
  expect(container.textContent).toContain(mockComments[0].body);
});
