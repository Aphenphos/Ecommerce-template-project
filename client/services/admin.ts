import e from 'express';

const BASE_URL = 'http://localhost:7891';

export async function deleteUser(id: string) {
  const resp = await fetch(`${BASE_URL}/api/v1/admins/rmUser/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (resp.ok) {
    console.log('deleted user');
  } else {
    console.log('uhoh');
  }
}

export async function verifyAdmin() {
  const resp = await fetch(`${BASE_URL}/api/v1/admins/isAdmin`, {
    method: 'GET',
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    console.log(data);
    return data;
  } else {
    return false;
  }
}
