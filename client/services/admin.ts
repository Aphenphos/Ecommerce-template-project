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
