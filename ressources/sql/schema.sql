-- ChâTop Database Schema
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS chatop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE chatop_db;

-- Table USERS
CREATE TABLE IF NOT EXISTS USERS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table RENTALS
CREATE TABLE IF NOT EXISTS RENTALS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    surface DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    picture VARCHAR(500),
    description TEXT NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES USERS(id) ON DELETE CASCADE,
    INDEX idx_owner (owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table MESSAGES
CREATE TABLE IF NOT EXISTS MESSAGES (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rental_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rental_id) REFERENCES RENTALS(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
    INDEX idx_rental (rental_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Données de test (optionnel)
-- INSERT INTO USERS (email, name, password) VALUES
-- ('test@test.com', 'Test User', '$2b$10$dummyhashpassword');

-- INSERT INTO RENTALS (name, surface, price, picture, description, owner_id) VALUES
-- ('Appartement Paris', 50.00, 1200.00, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'Bel appartement au coeur de Paris', 1);
