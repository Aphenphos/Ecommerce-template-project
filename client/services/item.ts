const BASE_URL = 'http://localhost:7891';
import e from 'express';
import type { CartItem } from '../../common/types';
export async function postItem(
  itemName: string,
  itemDescription: string,
  itemPrice: number
) {
  if (
    itemDescription === null ||
    itemDescription === undefined ||
    itemDescription === ''
  ) {
    itemDescription = '';
  }
  const itemObj = {
    item_name: itemName,
    item_description: itemDescription,
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

export async function getItemById(id: number) {
  console.log(id);
  const resp = await fetch(`${BASE_URL}/api/v1/items/getById/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    return null;
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
    const data = await resp.json();
    return data;
  } else {
    console.log('update failed');
    return null;
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
  let params;
  if (!search) {
    params = 'noSearch';
  } else {
    params = search;
  }
  console.log(params);
  const resp = await fetch(
    `${BASE_URL}/api/v1/items/getBySearch/${params}`,
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
