class ApiClient {
constructor(baseUrl = "https://makeup-live.onrender.com/api") {
    this.baseUrl = baseUrl;
  }

  get token() {
    return localStorage.getItem("token");
  }

  async request(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message);
    }

    if (response.status === 204) return null;
    return response.json();
  }

  get(path) {
    return this.request(path);
  }

  post(path, body) {
    return this.request(path, {
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  put(path, body) {
    return this.request(path, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  }

  delete(path) {
    return this.request(path, { method: "DELETE" });
  }
}

const api = new ApiClient();
