import axios from 'axios';

function handleResponse(response: Response) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      let error;
      if (response.status === 500) {
        error = 'Internal Server';
      } else {
        error = data || response.statusText;
      }
      return Promise.reject(error);
    }
    return data;
  });
}

const getAuthorization = (): Record<string, string> => {
  const token: string = localStorage.getItem('token') || '';
  // const isToken = localStorage.getItem('token') ? true : false;
  // const token: string | null = JSON.parse(isToken ? localStorage.getItem('token') : '');
  return token ? { Authorization: 'Token ' + token } : {};
};

export const getProtocol = (uri: string) =>
  axios
    .get(uri)
    .then((res) => res.data)
    .catch((err) => err);

export const postProtocol = (uri: string, data: any) =>
  fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthorization() },
    body: JSON.stringify({ ...data }),
  })
    .then(handleResponse)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
