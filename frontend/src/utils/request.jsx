export async function request(url, method, data) {
  const apiUrl = url.startsWith("/api") ? url : `/api${url}`;

  try {
    const response = await fetch(apiUrl, {
      headers: { "Content-Type": "application/json" },
      method: method || "GET",
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `HTTP Error: ${response.status} ${response.statusText}`,
      }));
      return {
        error: errorData.error || `HTTP Error: ${response.status} ${response.statusText}`,
      };
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return {
        error:
          "Network error: Unable to connect to server. Please check your internet connection.",
      };
    }
    return {
      error: error.message || "An unexpected error occurred",
    };
  }
}
