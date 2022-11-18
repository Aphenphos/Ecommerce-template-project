import e from 'express';

const BASE_URL = 'http://localhost:7891';

export async function postItem(itemName: string) {
  const itemObj = {
    item_name: itemName,
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

  const data = await resp.json();
  if (resp.ok) {
    console.log('added item');
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
