CREATE DATABASE weddingrsvp;

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    has_wedding BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weddings (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    wedding_title VARCHAR(100) NOT NULL,
    groom_name VARCHAR(100) NOT NULL,
    bride_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100) NOT NULL,
    mother_name VARCHAR(100) NOT NULL,  
    wedding_date DATE NOT NULL,
    wedding_time TIME NOT NULL;
    location VARCHAR(255) NOT NULL,
    googlemapcode VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rsvps (
    id SERIAL PRIMARY KEY,
    wedding_id INT REFERENCES weddings(id) ON DELETE CASCADE, -- Foreign key linking to the weddings table
    guest_name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    response BOOLEAN NOT NULL,
    numpeople INT,
    relationship VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert fake users
INSERT INTO users (username, email, password) VALUES ('dot', 'wamofitest@gmail.com', 'test123');