-- Active: 1762039394514@@127.0.0.1@3306@framelab
CREATE TABLE users (
    id                  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email               VARCHAR(255) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    first_name          VARCHAR(255) NOT NULL,
    is_admin            BOOLEAN DEFAULT FALSE,
    inscription_date     DATETIME DEFAULT NOW()
);

CREATE TABLE challenges (
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    title               VARCHAR(255) NOT NULL,
    description         TEXT NOT NULL,
    photo_url           VARCHAR(255) NOT NULL,
    start_date          DATETIME DEFAULT NOW(),
    end_date            DATETIME DEFAULT NOW(),
    is_active           BOOLEAN DEFAULT TRUE,
    creator_id          INT NOT NULL REFERENCES users(id)
);

CREATE TABLE participations (
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    photo_url           VARCHAR(255) NOT NULL,
    created             DATETIME DEFAULT NOW(),
    is_hidden           BOOLEAN DEFAULT FALSE,
    challenge_id        INT NOT NULL REFERENCES challenges(id),
    user_id             INT NOT NULL REFERENCES users(id)
);
CREATE TABLE comments (
    id                  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    content             TEXT NOT NULL,
    created             DATETIME DEFAULT NOW(),
    is_hidden           BOOLEAN DEFAULT FALSE,
    user_id             INT NOT NULL REFERENCES users(id),
    participation_id    INT NOT NULL REFERENCES participations(id)
);

CREATE TABLE votes (
    id                  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    creativity_note     TINYINT(3) UNSIGNED,
    technical_note      TINYINT(3) UNSIGNED,
    respect_theme_note  TINYINT(3) UNSIGNED,
    created             DATETIME DEFAULT NOW(),
    user_id             INT NOT NULL REFERENCES users(id),
    participation_id    INT NOT NULL REFERENCES participations(id),
    UNIQUE(user_id, participation_id) -- User can vote only one time for one participation
);
