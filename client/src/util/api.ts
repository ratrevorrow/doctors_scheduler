import axios from 'axios';

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // if (response.status === 401) {
      //   logout();
      // }
      // console.log('data');
      // console.log(data);
      const error = data || response.statusText;
      // console.log('error');
      // console.log(error);
      return Promise.reject(error);
    }

    return data;
  });
}

export const getProtocol = (uri: string) =>
  axios
    .get(uri)
    .then((res) => res.data)
    .catch((err) => err);

export const postProtocol = (uri: string, data: any) =>
  fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data }),
  })
    .then(handleResponse)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
