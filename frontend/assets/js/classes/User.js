class User {
  constructor({ id, name, email, skinType, preferences }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.skinType = skinType;
    this.preferences = preferences || {};
  }

  getDisplayName() {
    return this.name || this.email;
  }
}
