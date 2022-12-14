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

export async function verifyAdmin() {
  const resp = await fetch(`${BASE_URL}/api/v1/admins/isAdmin`, {
    method: 'GET',
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    console.log(data);
    return data;
  } else {
    return false;
  }
}

// export async function getUsers() {
//   const resp = await fetch(`${BASE_URL}/api/v1/admins/allUsers`, {
//     method: 'GET',
//     credentials: 'include',
//   });

//   if (resp.ok) {
//     const data = await resp.json();
//     return data;
//   } else {
//     throw new Error('Failed to grab users');
//   }
// }

export async function getVendors() {
  const resp = await fetch(`${BASE_URL}/api/v1/admins/allVendors`, {
    method: 'GET',
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error('Failed to grab vendors');
  }
}

export async function removeVendor(id: bigint) {
  console.log(id);
  const resp = await fetch(
    `${BASE_URL}/api/v1/admins/rmVendor/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (resp.ok) {
    const message = `User: ${id} is no longer a vendor`;
    return message;
  } else {
    throw new Error('Error removing vendor.');
  }
}

export async function addVendor(id: bigint) {
  console.log(id);
  const idObj = {
    id,
  };
  const resp = await fetch(`${BASE_URL}/api/v1/admins/addVendor`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(idObj),
    credentials: 'include',
  });

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error('Error posting vendor.');
  }
}

export async function searchUsersByEmail(searchParams: string) {
  const searchObj = {
    searchParams,
  };
  const resp = await fetch(
    `${BASE_URL}/api/v1/admins/searchByEmail`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(searchObj),
      credentials: 'include',
    }
  );

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    return [];
  }
}
