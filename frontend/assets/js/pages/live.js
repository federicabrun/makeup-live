const liveGrid = document.getElementById("liveGrid");
const liveRoom = document.getElementById("liveRoom");
const liveTitle = document.getElementById("liveTitle");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const notifications = document.getElementById("notifications");

async function loadLiveSessions() {
  const sessions = await api.get("/live-sessions");

  liveGrid.innerHTML = sessions.map(session => {
    const title = session.title || "Live session";
    const description = session.description || "";
    const creator = session.creator_name || session.creatorName || session.creator || "Creator";
    const status = session.status || "upcoming";
    const scheduledAt = session.scheduled_at || session.scheduledAt || "";
    const liveUrl = session.live_url || session.liveUrl || "";

    return `
      <article class="card live-session-card">
        <span class="tag">${status}</span>

        <h3>${title}</h3>

        <p>${description}</p>

        <p class="muted">
          ${creator}${scheduledAt ? ` • ${new Date(scheduledAt).toLocaleString()}` : ""}
        </p>

        <div class="live-actions">
          <button 
            class="btn primary join-live-btn" 
            data-title="${title}"
            data-url="${liveUrl}"
          >
            Join room
          </button>

          ${
            liveUrl
              ? `
                <a 
                  href="${liveUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn secondary watch-live-btn"
                >
                  Find live now
                </a>
              `
              : ""
          }
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".join-live-btn").forEach(button => {
    button.addEventListener("click", () => {
      const title = button.dataset.title;
      const liveUrl = button.dataset.url;

      openLiveRoom(title, liveUrl);
    });
  });
}

function openLiveRoom(title, liveUrl) {
  liveRoom.style.display = "block";
  liveTitle.textContent = title;

  notifications.innerHTML = `
    <p><strong>User joined:</strong> Guest joined the live session</p>
  `;

  chatMessages.innerHTML = `
    <p><strong>Mia Studio:</strong> Welcome to the live room 💄</p>
    <p><strong>Guest:</strong> Hi! I am ready for the live class ✨</p>
    ${
      liveUrl
        ? `
          <p class="live-stream-link">
            <a 
              href="${liveUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn primary"
            >
              Open live stream
            </a>
          </p>
        `
        : `
          <p><strong>System:</strong> This creator has not added a live stream link yet.</p>
        `
    }
  `;

  liveRoom.scrollIntoView({ behavior: "smooth" });
}

if (chatForm) {
  chatForm.addEventListener("submit", event => {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) return;

    chatMessages.innerHTML += `
      <p><strong>You:</strong> ${message}</p>
    `;

    chatInput.value = "";
  });
}

document.querySelectorAll(".reactions button").forEach(button => {
  button.addEventListener("click", () => {
    const emoji = button.dataset.emoji;

    notifications.innerHTML = `
      <p><strong>Reaction sent:</strong> ${emoji}</p>
    ` + notifications.innerHTML;
  });
});

loadLiveSessions().catch(error => {
  liveGrid.innerHTML = `<p>${error.message}</p>`;
});