export const api = <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
): Promise<T> => fetch(
  'http://localhost:8080' + endpoint,
  {
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    mode: 'cors',
  }
).then(r => r.json());
