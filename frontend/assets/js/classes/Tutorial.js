class Tutorial {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnailUrl = data.thumbnailUrl || data.thumbnail_url;
    this.difficulty = data.difficulty;
    this.durationMinutes = data.durationMinutes || data.duration_minutes;
    this.creatorName = data.creatorName || data.creator_name;
  }

  render() {
    return `
      <article class="card">
        <img src="${this.thumbnailUrl || "https://placehold.co/600x400?text=Tutorial"}" alt="${this.title}">
        <h3>${this.title}</h3>
        <p>${this.description || ""}</p>
        <p>${this.creatorName || "Creator"} • ${this.difficulty} • ${this.durationMinutes} min</p>
        <button class="btn secondary favorite-btn" data-type="tutorial" data-id="${this.id}">Favorite</button>
      </article>
    `;
  }
}
