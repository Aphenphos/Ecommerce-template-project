import { act, render, screen, waitFor } from '@testing-library/react';
import catListFn from './cat-list'
import {afterEach, expect, jest, describe, it} from '@jest/globals'

// TODO: Make mocking sane.
global.fetch = jest.fn((..._args) => {
  return (Promise.resolve({
    status: 200,
    json: () => {
      return Promise.resolve([{name: 'Aracts'}])
    },
  }))
})

describe('CatList', () => {
  // Can we set this globally for all tests? That would be the swellest.
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays a list of cats from a request', async () => {
    const CatList = catListFn()
    // When testing useEffect and other async operations, use act + waitFor like
    // in this test.
    act(() => {
      render(
        <CatList />
      )
    })
    // We must wait for the results to come back. Because we have this
    // distinction, we can test loading UI (sans waitFor) and results (with
    // waitFor).
    await waitFor(() => {
      const el = screen.getByTestId('cat-0')
      expect(el.textContent).toEqual('Aracts')
    })
  })

  // If we don't wait, we can see the loading text.
  it('displays a loading message when cats have not arrived', async () => {
    const CatList = catListFn(true)
    render(
      <CatList />
    )
    const el = screen.getByTestId('cat-loader')
    expect(el.textContent).toEqual('Loading Cats!')
  })

})
