import React from "react";
import { render } from '@testing-library/react'
import { Header } from "./Header";

test('header render', async () => {
  render(<Header />)
})
