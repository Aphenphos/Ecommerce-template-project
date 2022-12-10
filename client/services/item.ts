const BASE_URL = 'http://localhost:7891';
import type { CartItem } from '../../common/types';
export async function postItem(itemName: string, itemPrice: number) {
  console.log(itemPrice);
  const itemObj = {
    item_name: itemName,
    item_price: itemPrice,
  };
  const resp = await fetch(`${BASE_URL}/api/v1/items/addItem`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(itemObj),
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    console.log('added item');
    return data;
  } else {
    console.log('item not added');
  }
}

export async function deleteItem(id: number) {
  const resp = await fetch(`${BASE_URL}/api/v1/items/rmItem/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (resp.ok) {
    console.log('item deleted');
  } else {
    console.log('item not deleted');
  }
}

export async function updateItem(id: number, data: string) {
  const updateObj = {
    item_name: data,
  };
  const resp = await fetch(`${BASE_URL}/api/v1/items/upItem/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateObj),
    credentials: 'include',
  });
  if (resp.ok) {
    console.log(resp.json);
    console.log('updated!');
    return resp.json();
  } else {
    console.log('update failed');
  }
}

export async function getAllItems() {
  const resp = await fetch(`${BASE_URL}/api/v1/items/getAll`, {
    method: 'GET',
    credentials: 'include',
  });
  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    return console.error('Error Fetching Items');
  }
}

export async function getArrOfItems(items: Array<CartItem>) {
  const toGet: Array<number> = [];
  for (let i = 0; i < items.length; i++) {
    const itemId = items[i]!.item_id;
    toGet.push(itemId);
  }
  const resp = await fetch(`${BASE_URL}/api/v1/items/getByArr`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(toGet),
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    return console.error('Error Fetching Items');
  }
}

export async function getItemByVendor() {
  const resp = await fetch(`${BASE_URL}/api/v1/items/getByVendor`, {
    method: 'GET',
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    console.log(data);
    return data;
  } else {
    return console.error('Error Fetching Items');
  }
}

export async function getItemBySearch(search: string) {
  const resp = await fetch(
    `${BASE_URL}/api/v1/items/getBySearch/${search}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error('Failed to search items');
  }
}
