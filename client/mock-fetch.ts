
export const mockFetch = (status: number, body: unknown) => {
  global.fetch = jest.fn((..._args: any) => {
    return (Promise.resolve({
      status: status,
      json: (): any => {
        return Promise.resolve(body)
      },
    }) as Promise<Response>)
  })
}
