import axios from 'axios';

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
  }).then((response) => response.json());
