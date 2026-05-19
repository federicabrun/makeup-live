DROP TABLE IF EXISTS notifications, messages, favorites, looks, live_sessions, products, tutorials, categories, creators, users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  skin_type VARCHAR(40) DEFAULT 'normal',
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE creators (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  instagram_handle VARCHAR(80),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tutorials (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES creators(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  difficulty VARCHAR(30) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  duration_minutes INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  brand VARCHAR(100),
  category VARCHAR(80),
  skin_type VARCHAR(40) DEFAULT 'all',
  price NUMERIC(10,2) DEFAULT 0,
  image_url TEXT,
  description TEXT,
  external_source VARCHAR(80) DEFAULT 'local',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE looks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type VARCHAR(30) NOT NULL CHECK (entity_type IN ('product', 'tutorial')),
  entity_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

CREATE TABLE live_sessions (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES creators(id) ON DELETE SET NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  status VARCHAR(30) CHECK (status IN ('upcoming', 'live', 'finished')) DEFAULT 'upcoming',
  scheduled_at TIMESTAMP NOT NULL,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  live_session_id INTEGER NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(160) NOT NULL,
  body TEXT NOT NULL,
  type VARCHAR(40) DEFAULT 'system',
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tutorials_category ON tutorials(category_id);
CREATE INDEX idx_products_filters ON products(category, brand, skin_type, price);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_messages_live_session ON messages(live_session_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, read_at);

