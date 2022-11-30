const BASE_URL = 'http://localhost:7891';

export async function getCart() {
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

export async function addToCart(
  item_id: bigint,
  item_quantity: bigint
) {
  const itemObj = {
    item_id,
    item_quantity,
  };
  const resp = await fetch(`${BASE_URL}/api/v1/carts/addToCart`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(itemObj),
    credentials: 'include',
  });

  const data = await resp.json();
  if (resp.ok) {
    console.log(data);
    return data;
  } else {
    console.error('Error adding item to cart.');
  }
}
