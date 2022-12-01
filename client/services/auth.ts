const BASE_URL = 'http://localhost:7891';

export async function signUpUser(
  type: string,
  email: string,
  password: string
) {
  const userObj = {
    email: email,
    password: password,
  };
  if (type === 'sign-up') {
    const resp = await fetch(`${BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userObj),
      credentials: 'include',
    });

    const data = await resp.json();
    if (resp.ok) {
      const user = data;
      return user;
    } else {
      console.error(data.message);
    }
  }
  if (type === 'sign-in') {
    const resp = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
      credentials: 'include',
    });
    if (resp.ok) {
      const user = await resp.json();
      return user;
    }
  }
}

export async function getUser() {
  const resp = await fetch(`${BASE_URL}/api/v1/users/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (resp.ok) {
    const user = await resp.json();
    return user;
  } else {
    return null;
  }
}

export async function logoutUser() {
  const resp = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (resp.ok) {
    console.log('logged out');
  }
}

export async function verifyVendor() {
  const resp = await fetch(`${BASE_URL}/api/v1/users/isVendor`, {
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
