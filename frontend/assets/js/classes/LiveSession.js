class LiveSession {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.scheduledAt = data.scheduledAt || data.scheduled_at;
    this.creatorName = data.creatorName || data.creator_name;
  }

  render() {
    return `
      <article class="card">
        <h3>${this.title}</h3>
        <p>${this.description || ""}</p>
        <p>${this.creatorName || "Creator"} • ${new Date(this.scheduledAt).toLocaleString()}</p>
        <span class="badge">${this.status}</span>
        <button class="btn primary join-live" data-id="${this.id}" data-title="${this.title}">Join</button>
      </article>
    `;
  }
}
