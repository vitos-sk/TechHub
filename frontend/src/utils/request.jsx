export function request(url, method, data) {
  const apiUrl = url.startsWith("http://5.129.251.89:5000/api")
    ? url
    : `http://5.129.251.89:5000/api${url}`;

  return fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  }).then((res) => res.json());
}
