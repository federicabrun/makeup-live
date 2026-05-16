const authLink = document.getElementById("authLink");
if (authLink && localStorage.getItem("token")) {
  authLink.textContent = "Profile";
  authLink.href = "./pages/profile.html";
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}
