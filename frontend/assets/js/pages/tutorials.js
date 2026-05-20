const grid = document.getElementById("tutorialGrid");

function buildYoutubeSearchUrl(title) {
  const query = encodeURIComponent(`${title} makeup tutorial`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

async function loadTutorials() {
  const difficulty = document.getElementById("difficultyFilter").value;
  const query = difficulty ? `?difficulty=${difficulty}` : "";

  const tutorials = await api.get(`/tutorials${query}`);

  grid.innerHTML = tutorials.map(item => {
    const title = item.title || "Makeup tutorial";
    const description = item.description || "";
    const creator = item.creator_name || item.creatorName || item.creator || "Creator";
    const difficulty = item.difficulty || "beginner";
    const duration = item.duration_minutes || item.durationMinutes || "";
    const thumbnail = item.thumbnail_url || item.thumbnailUrl || "../assets/img/tutorial-placeholder.jpg";
    const videoUrl = item.video_url || item.videoUrl || buildYoutubeSearchUrl(title);

    return `
      <article class="card tutorial-card" data-video-url="${videoUrl}">
        <img src="${thumbnail}" alt="${title}" />

        <span class="tag">${difficulty}</span>

        <h3>${title}</h3>

        <p>${description}</p>

        <p class="muted">
          ${creator}${duration ? ` • ${duration} min` : ""}
        </p>

        <div class="tutorial-actions">
          <a 
            href="${videoUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn primary watch-video"
          >
            Watch video
          </a>

          <button 
            class="btn secondary favorite-btn" 
            data-type="tutorial" 
            data-id="${item.id}"
          >
            Favorite
          </button>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".tutorial-card").forEach(card => {
    card.addEventListener("click", event => {
      if (
        event.target.closest(".favorite-btn") ||
        event.target.closest(".watch-video")
      ) {
        return;
      }

      const videoUrl = card.dataset.videoUrl;

      if (videoUrl) {
        window.open(videoUrl, "_blank", "noopener,noreferrer");
      }
    });
  });

  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", async event => {
      event.stopPropagation();

      await api.post("/favorites", {
        entity_type: btn.dataset.type,
        entity_id: Number(btn.dataset.id)
      });

      btn.textContent = "Saved";
    });
  });
}

document.getElementById("applyFilters").addEventListener("click", loadTutorials);

loadTutorials().catch(error => {
  grid.innerHTML = `<p>${error.message}</p>`;
});
const youtubeQuery = document.getElementById("youtubeQuery");
const youtubeEventType = document.getElementById("youtubeEventType");
const loadYouTubeVideosBtn = document.getElementById("loadYouTubeVideos");
const youtubeVideosGrid = document.getElementById("youtubeVideosGrid");

async function loadYouTubeVideos() {
  if (!youtubeVideosGrid) return;

  const query = youtubeQuery.value.trim() || "soft glam makeup tutorial";
  const eventType = youtubeEventType.value;

  const params = new URLSearchParams();
  params.append("q", query);
  params.append("maxResults", "8");

  if (eventType) {
    params.append("eventType", eventType);
  }

  youtubeVideosGrid.innerHTML = `<p class="muted">Loading YouTube videos...</p>`;

  try {
    const videos = await api.get(`/youtube/search?${params.toString()}`);

    if (!videos.length) {
      youtubeVideosGrid.innerHTML = `<p class="muted">No YouTube videos found.</p>`;
      return;
    }

    youtubeVideosGrid.innerHTML = videos.map(video => `
      <article class="card tutorial-card external-product-card">
        ${
          video.thumbnail_url
            ? `<img class="card-img" src="${video.thumbnail_url}" alt="${video.title}" />`
            : `<div class="external-image-fallback"><span>YouTube Video</span></div>`
        }

        <span class="tag">YouTube API</span>

        <h3>${video.title}</h3>

        <p class="muted">${video.channel_title || "YouTube creator"}</p>

        <p class="muted">
          ${video.description ? video.description.slice(0, 120) + "..." : ""}
        </p>

        <a 
          href="${video.video_url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn primary"
        >
          Watch on YouTube
        </a>
      </article>
    `).join("");
  } catch (error) {
    youtubeVideosGrid.innerHTML = `<p>${error.message}</p>`;
  }
}

if (loadYouTubeVideosBtn) {
  loadYouTubeVideosBtn.addEventListener("click", loadYouTubeVideos);
}