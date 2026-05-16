INSERT INTO users (name, email, password_hash, skin_type, preferences) VALUES
('Demo User', 'demo@makeuplive.com', '$2a$10$GRK9nGK/r5khNTfOMx5uO.WA8nNq7I7dW48dUPT0CwGfeclBrccvC', 'mixed', '{"favoriteColor":"rose"}');

INSERT INTO creators (name, bio, avatar_url, instagram_handle) VALUES
('Mia Studio', 'Professional makeup creator focused on natural looks.', 'https://placehold.co/100x100?text=Mia', '@miastudio'),
('Glam by Sol', 'Evening glam and editorial makeup artist.', 'https://placehold.co/100x100?text=Sol', '@glambysol');

INSERT INTO categories (name, description) VALUES
('natural', 'Daily and natural makeup looks'),
('glam', 'Evening and party makeup'),
('skincare', 'Skin preparation and care'),
('eyes', 'Eye shadow, eyeliner and mascara tutorials');

INSERT INTO tutorials (creator_id, category_id, title, description, video_url, thumbnail_url, difficulty, duration_minutes) VALUES
(1, 1, 'Natural Glow for University', 'A quick fresh look for daily routine.', 'https://www.youtube.com/results?search_query=natural+makeup+tutorial', 'https://placehold.co/600x400?text=Natural+Glow', 'beginner', 12),
(2, 2, 'Evening Glam Step by Step', 'Full glam look for special occasions.', 'https://www.youtube.com/results?search_query=evening+glam+makeup', 'https://placehold.co/600x400?text=Evening+Glam', 'intermediate', 25),
(1, 4, 'Soft Smokey Eye', 'Beginner-friendly smokey eye tutorial.', 'https://www.youtube.com/results?search_query=soft+smokey+eye+tutorial', 'https://placehold.co/600x400?text=Smokey+Eye', 'beginner', 18);

INSERT INTO products (name, brand, category, skin_type, price, image_url, description, external_source) VALUES
('Hydra Glow Foundation', 'Luma Beauty', 'foundation', 'dry', 29.99, 'https://placehold.co/400x300?text=Foundation', 'Hydrating foundation with natural finish.', 'local'),
('Matte Velvet Lipstick', 'Rose Lab', 'lipstick', 'all', 15.50, 'https://placehold.co/400x300?text=Lipstick', 'Long-lasting matte lipstick.', 'local'),
('Soft Bronze Palette', 'Glam Kit', 'eyeshadow', 'all', 34.00, 'https://placehold.co/400x300?text=Palette', 'Neutral bronze eyeshadow palette.', 'local'),
('Oil Control Primer', 'Skin Prep', 'primer', 'oily', 19.90, 'https://placehold.co/400x300?text=Primer', 'Primer designed for oily skin.', 'local');

INSERT INTO live_sessions (creator_id, title, description, status, scheduled_at, started_at) VALUES
(1, 'Live Natural Makeup Q&A', 'Ask questions while Mia creates a natural look.', 'live', NOW(), NOW()),
(2, 'Friday Glam Night', 'Upcoming glam tutorial with product recommendations.', 'upcoming', NOW() + INTERVAL '2 days', NULL);

INSERT INTO notifications (user_id, title, body, type) VALUES
(1, 'Welcome to Makeup Live', 'Your account is ready. Explore tutorials and live sessions.', 'welcome');
