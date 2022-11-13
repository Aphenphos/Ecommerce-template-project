const BASE_URL = 'http://localhost:7891';

export async function signUpUser(email: string, password: string) {
  const userObj = {
    email: email,
    password: password,
  };
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
    const user = await resp.json();
    console.log(user);
    return user;
  } else {
    console.error(data.message);
  }
}

export async function signInUser(email: string, password: string) {
  const userObj = {
    email: email,
    password: password,
  };
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
    console.log(user);
    return user;
  }
}
