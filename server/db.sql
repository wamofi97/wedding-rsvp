CREATE DATABASE weddingrsvp;

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- insert fake users
INSERT INTO users (username, email, password) VALUES ('dot', 'wamofitest@gmail.com', 'test123');