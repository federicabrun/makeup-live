const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

const savedSkinType = localStorage.getItem("suggested_skin_type");
const skinTypeSelect = document.querySelector('select[name="skin_type"]');

if (savedSkinType && skinTypeSelect) {
  skinTypeSelect.value = savedSkinType;
}

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    await api.post("/auth/register", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      skin_type: formData.get("skin_type")
    });

    message.textContent = "Account created. You can now login.";

    localStorage.removeItem("suggested_skin_type");

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 900);
  } catch (error) {
    message.textContent = error.message;
  }
});