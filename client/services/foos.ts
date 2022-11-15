import { type Foo } from '../../common/foo'
import { type ServiceResponse } from './service-utils'

export const getFoos = (): Promise<ServiceResponse<ReadonlyArray<Foo>>> => {
  return fetch('/api/v1/foos').then((res) => {
    return res.json().then((json) => {
      return {
        json: json as ReadonlyArray<Foo>,
        status: res.status,
      }
    })
  })
}

export const updateFoo = (foo: Foo): Promise<ServiceResponse<unknown>> => {
  return fetch(
    `/api/v1/foos/${foo.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foo),
    },
  ).then((res) => {
    return {
      json: null,
      status: res.status,
    }
  })
}

export const deleteFoo = (id: string): Promise<ServiceResponse<unknown>> => {
  return fetch(`/api/v1/foos/${id}`, { method: 'DELETE' }).then((res) => {
    return {
      json: null,
      status: res.status,
    }
  })
}
