const BASE_URL = 'http://localhost:7891';

export async function getItems() {
  const resp = await fetch(`${BASE_URL}/api/v1/carts/getCart`, {
    method: 'GET',
    credentials: 'include',
  });
  if (resp.ok) {
    const items = await resp.json();
    return items;
  } else {
    console.error('Failed to fetch items');
  }
}
