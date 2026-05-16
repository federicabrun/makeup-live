document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = document.getElementById("message");
  const formData = new FormData(event.target);

  try {
    await api.post("/auth/register", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      skin_type: formData.get("skin_type")
    });

    message.textContent = "Account created. You can now login.";
    event.target.reset();
  } catch (error) {
    message.textContent = error.message;
  }
});
