const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (!loginForm) {
  console.error("loginForm not found");
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  loginMessage.textContent = "Logging in...";

  try {
    const data = await api.post("/auth/login", {
      email,
      password
    });

    if (!data.token) {
      throw new Error("Login response did not include token");
    }

    localStorage.setItem("token", data.token);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    loginMessage.textContent = "Login successful. Redirecting...";

    setTimeout(() => {
      window.location.href = "./profile.html";
    }, 500);
  } catch (error) {
    console.error("Login error:", error);
    loginMessage.textContent = error.message || "Login failed";
  }
});

window.handleGoogleCredentialResponse = async function (response) {
  loginMessage.textContent = "Logging in with Google...";

  try {
    const data = await api.post("/auth/google", {
      credential: response.credential
    });

    if (!data.token) {
      throw new Error("Google login response did not include token");
    }

    localStorage.setItem("token", data.token);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    loginMessage.textContent = "Google login successful. Redirecting...";

    setTimeout(() => {
      window.location.href = "./profile.html";
    }, 500);
  } catch (error) {
    console.error("Google login error:", error);
    loginMessage.textContent = error.message || "Google login failed";
  }
};