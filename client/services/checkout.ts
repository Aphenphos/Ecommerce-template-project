const BASE_URL = 'http://localhost:7891';

export async function checkoutUser(itemArr: Array<any>) {
  const toCheckout = [];

  for (let i = 0; i < itemArr.length; i++) {
    const itemObj = {
      id: itemArr[i].item_id,
      quantity: itemArr[i].item_quantity,
    };
    toCheckout.push(itemObj);
    console.log(itemObj);
  }
  const resp = await fetch(`${BASE_URL}/api/v1/stripe/checkout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(toCheckout),
    credentials: 'include',
  });

  if (resp.ok) {
    const link = await resp.json();
    return window.open(link.url, '_blank');
  } else {
    console.error('could not checkout');
  }
}
