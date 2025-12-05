CREATE TABLE challenges (
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    title               VARCHAR(255) NOT NULL,
    description         TEXT NOT NULL,
    photo_url           VARCHAR(255) NOT NULL,
    start_date          DATETIME DEFAULT NOW(),
    end_date            DATETIME DEFAULT NOW(),
    is_active           BOOLEAN NOT NULL,
    creator_id          INT NOT NULL REFERENCES users(id)
); 

CREATE TABLE comments (
    id                  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    content             TEXT NOT NULL,
    created             DATETIME DEFAULT NOW(),
    is_hidden           BOOLEAN,
    user_id             INT NOT NULL REFERENCES users(id),
    participation_id    INT NOT NULL REFERENCES participation(id)
);

CREATE TABLE participations (
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    photo_url           VARCHAR(255) NOT NULL,
    created             DATETIME DEFAULT NOW(),
    is_hidden           BOOLEAN,
    challenge_id        INT NOT NULL REFERENCES challenge(id),
    user_id             INT NOT NULL REFERENCES user(id)
);

CREATE TABLE votes (
    id                  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    creativity_note     TINYINT(3) UNSIGNED,
    technical_note      TINYINT(3) UNSIGNED,
    respect_theme_note  TINYINT(3) UNSIGNED,
    created             DATETIME DEFAULT NOW(),
    user_id             INT NOT NULL REFERENCES user(id),
    participation_id    INT NOT NULL REFERENCES participation(id)
);
