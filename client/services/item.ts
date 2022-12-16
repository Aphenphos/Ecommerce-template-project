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
  const resp = await fetch(`/api/v1/items/addItem`, {
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
    return data;
  } else {
    throw new Error('Failed to add item.');
  }
}

export async function deleteItem(id: number) {
  const resp = await fetch(`/api/v1/items/rmItem/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error('Failed to delete item.');
  }
}

export async function getItemById(id: number) {
  const resp = await fetch(`/api/v1/items/getById/${id}`, {
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
  const resp = await fetch(`/api/v1/items/upItem/${id}`, {
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
    throw new Error('Failed to update item.');
  }
}

export async function getAllItems() {
  const resp = await fetch(`/api/v1/items/getAll`, {
    method: 'GET',
    credentials: 'include',
  });
  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error('Failed to fetch items.');
  }
}

export async function getArrOfItems(items: Array<CartItem>) {
  const toGet: Array<number> = [];
  for (let i = 0; i < items.length; i++) {
    const itemId = items[i]!.item_id;
    toGet.push(itemId);
  }
  const resp = await fetch(`/api/v1/items/getByArr`, {
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
    throw new Error('Failed to fetch items.');
  }
}

export async function getItemByVendor() {
  const resp = await fetch(`/api/v1/items/getByVendor`, {
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

export async function getItemBySearch(search: string) {
  let params;
  if (!search || search === '' || search === undefined) {
    params = 'noSearch';
  } else {
    params = search;
  }
  const resp = await fetch(`/api/v1/items/getBySearch/${params}`, {
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
