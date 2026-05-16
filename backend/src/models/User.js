class User {
  constructor({ id, name, email, password_hash, skin_type, preferences, created_at, updated_at }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = password_hash;
    this.skinType = skin_type || "normal";
    this.preferences = preferences || {};
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  toPublicJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      skinType: this.skinType,
      preferences: this.preferences,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
