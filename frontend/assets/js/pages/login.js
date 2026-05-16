document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = document.getElementById("message");
  const formData = new FormData(event.target);

  try {
    const result = await api.post("/auth/login", {
      email: formData.get("email"),
      password: formData.get("password")
    });

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    window.location.href = "./profile.html";
  } catch (error) {
    message.textContent = error.message;
  }
});
