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
    throw new Error('Failed fetching cart.');
  }
}

export async function addToCart(
  item_id: bigint,
  item_quantity: number
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

  if (resp.ok) {
    const message = 'Item Added To Cart';
    return message;
  } else {
    const message = 'Error adding to Cart';
    return message;
  }
}

export async function removeFromCart(id: bigint) {
  const resp = await fetch(`${BASE_URL}/api/v1/carts/rmItem/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (resp.ok) {
    const data = resp.json();
    return data;
  } else {
    const message = 'Error removing item from cart.';
    return message;
  }
}

export async function updateQuant(cartId: number, quant: number) {
  const updateObj = {
    quant,
  };
  const resp = await fetch(
    `${BASE_URL}/api/v1/carts/upCart/${cartId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateObj),
      credentials: 'include',
    }
  );
  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error('Error updating cart.');
  }
}
