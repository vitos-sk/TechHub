export function request(url, method, data) {
  const apiUrl = url.startsWith("http://localhost:3002/api")
    ? url
    : `http://localhost:3002/api${url}`;

  return fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  }).then((res) => res.json());
}
