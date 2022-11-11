const BASE_URL = 'http://localhost:7891';

export async function signUpUser(email: string, password: string) {
  const userObj = {
    email: email,
    password: password,
  };
  const response = await fetch(`${BASE_URL}/api/v1/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userObj),
    credentials: 'include',
  });

  const data = await response.json();
  if (response.ok) {
    console.log(`OK! ${data}`);
  } else {
    console.error(data.message);
  }
}
