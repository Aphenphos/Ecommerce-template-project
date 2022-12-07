const BASE_URL = 'http://localhost:7891';

export async function postImage(imgFile: File, itemId: bigint) {
  const formdata = new FormData();
  formdata.append('imgForm', imgFile);
  formdata.append('id', '1');
  const resp = await fetch(
    `${BASE_URL}/api/v1/itemImages/uploadImage/${itemId}`,
    {
      method: 'POST',
      body: formdata,
    }
  );
}
export async function rmImage(img_url: string) {
  const resp = await fetch(
    `${BASE_URL}/api/v1/itemImages/rmImage/${encodeURIComponent(
      img_url
    )}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (resp.ok) {
    console.log('image deleted');
  } else {
    console.log('error deleting image');
  }
}
