const BASE_URL = 'http://localhost:7891';

export async function postImage(imgFile: File) {
  const imgObj = {
    imgFile,
    image_id: 1,
  };
  console.log(imgObj);
}
