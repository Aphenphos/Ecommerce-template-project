const BASE_URL = 'http://localhost:7891';

export async function postItem(itemName: string) {
  const itemObj = {
    item_name: itemName,
  };
  console.log(itemObj);
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
