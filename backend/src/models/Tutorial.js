class Tutorial {
  constructor({ id, creator_id, category_id, title, description, video_url, thumbnail_url, difficulty, duration_minutes, created_at }) {
    this.id = id;
    this.creatorId = creator_id;
    this.categoryId = category_id;
    this.title = title;
    this.description = description;
    this.videoUrl = video_url;
    this.thumbnailUrl = thumbnail_url;
    this.difficulty = difficulty;
    this.durationMinutes = duration_minutes;
    this.createdAt = created_at;
  }

  isBeginnerFriendly() {
    return this.difficulty === "beginner";
  }
}

module.exports = Tutorial;
