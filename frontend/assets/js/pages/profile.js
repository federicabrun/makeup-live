const form = document.getElementById("profileForm");
const message = document.getElementById("message");

async function loadProfile() {
  const profile = await api.get("/profile");
  document.getElementById("name").value = profile.name;
  document.getElementById("skin_type").value = profile.skinType;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  try {
    const updated = await api.put("/profile", {
      name: formData.get("name"),
      skin_type: formData.get("skin_type")
    });
    localStorage.setItem("user", JSON.stringify(updated));
    message.textContent = "Profile updated.";
  } catch (error) {
    message.textContent = error.message;
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../index.html";
});

loadProfile().catch((error) => message.textContent = error.message);
