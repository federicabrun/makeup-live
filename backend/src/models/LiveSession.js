class LiveSession {
  constructor({ id, creator_id, title, description, status, scheduled_at, started_at, ended_at, created_at }) {
    this.id = id;
    this.creatorId = creator_id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.scheduledAt = scheduled_at;
    this.startedAt = started_at;
    this.endedAt = ended_at;
    this.createdAt = created_at;
  }

  isLive() {
    return this.status === "live";
  }
}

module.exports = LiveSession;
