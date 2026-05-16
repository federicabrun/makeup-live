class NotificationManager {
  constructor(container) {
    this.container = container;
    this.unread = 0;
  }

  show(notification) {
    this.unread += 1;
    const item = document.createElement("div");
    item.textContent = `${notification.title}: ${notification.body}`;
    this.container.prepend(item);
  }
}
