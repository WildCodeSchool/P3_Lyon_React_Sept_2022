DROP TABLE IF EXISTS user_group;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS attached_file;
DROP TABLE IF EXISTS like_table;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS group_detail;
DROP TABLE IF EXISTS user_detail;

CREATE TABLE user_detail(
id serial primary key not null,
firstname varchar(250) not null,
lastname varchar(250) not null,
email varchar(250) unique not null,
phone_number varchar(250) unique not null,
role varchar(250) not null DEFAULT 'user',
is_admin boolean not null DEFAULT false,
user_password varchar(400) not null,
avatar text
);

INSERT INTO
  user_detail (firstname, lastname, email, phone_number, role, user_password, avatar)
VALUES
  (
    'Javier',
    'Lopez',
    'javier@enedis.fr',
    '0628164511',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://i.imgur.com/Ajb5Q8V.png'
  ),
  (
    'Doroteya',
    'Donova',
    'doroteya@enedis.fr',
    '0628164512',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://i.imgur.com/vJKyNZ2.jpg'
  ),
  (
    'Matthieu',
    'George',
    'matthieu@enedis.fr',
    '0628164513',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://i.imgur.com/QFlGPRB.jpg'
  ),
  (
    'Sahrane',
    'Guassemi',
    'sahrane@enedis.fr',
    '0628164514',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://i.imgur.com/DixnvgV.jpg'
  ),
  (
    'Ryan',
    'Beaujot',
    'ryan@enedis.fr',
    '0628164515',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://i.imgur.com/lIAKkYJ.jpg'
  );

UPDATE user_detail SET is_admin = true WHERE id = 3;

CREATE TABLE group_detail(
id serial primary key not null,
group_name varchar(80),
image varchar(250)
);

INSERT INTO
  group_detail (group_name, image)
VALUES
  (
    'Communication Agence',
    'https://i.imgur.com/CDXh5eB.jpg'
  ),
  (
    'Métier',
    'https://i.imgur.com/CDXh5eB.jpg'
  ),
  (
    'Prévention',
    'https://i.imgur.com/CDXh5eB.jpg'
  ),
  (
    'Entre nous',
    'https://i.imgur.com/CDXh5eB.jpg'
  ),
  (
    'Clients',
    'https://i.imgur.com/CDXh5eB.jpg'
  );

CREATE TABLE category(
id serial primary key not null,
category_name varchar(200) not null,
image varchar(250),
group_id int not null,
CONSTRAINT fk_category_group
FOREIGN KEY(group_id) REFERENCES group_detail(id) ON DELETE CASCADE
);

INSERT INTO
  category (category_name, image, group_id)
VALUES
  (
    'Actualités',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    1
  ),
    (
    'La vie des sites',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    1
  ),
    (
    'Affichage réglementaire',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    1
  ),
  (
    'Métier1',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    2
  ),
  (
    'Métier2',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    2
  ),
  (
    'Métier3',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    2
  ),
  (
    'Prev1',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    3
  ),
  (
    'Prev2',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    3
  ),
  (
    'Prev3',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    3
  ),
  (
    'Nous 1',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    4
  ),
  (
    'Nous 2',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    4
  ),
  (
    'Nous 3',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    4
  ),
  (
    'Client 1',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    5
  ),
  (
    'Client 2',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    5
  ),
  (
    'Client 3',
    'https://i.imgur.com/3Qdp5Tz.jpg',
    5
  );
  

CREATE TABLE post(
id serial primary key not null,
title varchar(200) not null,
content text not null,
user_id int not null,
category_id int not null,
post_date timestamp,
post_image varchar(250),
CONSTRAINT fk_post_user
FOREIGN KEY(user_id) REFERENCES user_detail(id) ON DELETE CASCADE,
CONSTRAINT fk_post_category
FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO
  post (title, content, user_id, category_id, post_date, post_image)
VALUES
  (
    'Organisation repas de Noel !',
    'You are my fire. The one desire. Believe when I say. I want it that way',
    1,
    1,
    '2022-11-01T11:04:06.163Z',
    'https://www.choisir.com/medias/b2380444-ligne-enedis.jpg'
  ),
  (
    'Vacances d''été',
    'Tell me why, ain''t nothing but a heartache. Tell me why, ain''t nothing but a mistake',
    2,
    2,
    '2022-11-02T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
  (
    'Joyeux anniversaire Margaux!',
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.',
    3,
    3,
    '2022-11-03T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
  (
    'Secret Santa',
    'Tell me why, I never wanna hear you say. I want it that way',
    4,
    4,
    '2022-11-04T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Michael Jackson',
    'Don''t stop until you get enough',
    5,
    5,
    '2022-11-05T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Ron Steward',
    'Have you ever seen the rain?',
    1,
    6,
    '2022-11-06T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Mick Jagger',
    'Please allow me to introduce myself, I''m a man of wealth and taste',
    2,
    7,
    '2022-11-07T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Sash',
    '¡ ECUADOR !',
    3,
    8,
    '2022-11-08T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Lenny Kravitz',
    'Are you gona go my way ?',
    4,
    9,
    '2022-11-08T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'The Police',
    'You don''t have to put on that red light',
    5,
    10,
    '2022-11-09T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
  (
    'Arctic Monkeys',
    'I''ve seen your frown and it''s like looking down the barrel of a gun',
    1,
    11,
    '2022-11-10T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
  (
    'Pink Floyd',
    'Money, it''s a gas. Grab that cash with both hands and make a stash',
    2,
    12,
    '2022-11-11T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'David Bowie',
    'If you say run, I''ll run with you and if you say hide, we''ll hide',
    3,
    13,
    '2022-11-12T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
(
    'Derek & The Dominos',
    'What will you do when you get lonely? No one waiting by your side?',
    4,
    15,
    '2022-11-13T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'The Mamas & The Papas',
    'All the leaves are brown and the sky is gray.',
    5,
    1,
    '2022-11-14T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Dire Straits',
    'And Harry doesn''t mind if he doesn''t make the scene. He''s got a daytime job, he''s doing alright',
    1,
    2,
    '2022-11-15T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'The Doors',
    'Come on, baby, light my fire',
    2,
    3,
    '2022-11-16T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Pixies',
    'With your feet on the air and your head on the ground. Try this trick and spin it, yeah ',
    3,
    4,
    '2022-11-17T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'J.J. Cale',
    'If you want to hang out. You''ve got to take her out, cocaine',
    4,
    5,
    '2022-11-18T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'KISS',
    'I was made for loving you, baby. You were made for loving me',
    5,
    6,
    '2022-11-19T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Guns N'' Roses',
    'Take me down to the Paradise City, where the grass is green and the girls are pretty',
    1,
    7,
    '2022-11-20T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Thin Lizzy',
    'The boys are back in town',
    2,
    8,
    '2022-11-21T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
  (
    'Organisation repas de Noël !',
    'You are my fire. The one desire. Believe when I say. I want it that way',
    3,
    9,
    '2022-11-22T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Vacances d''été',
    'Tell me why, ain''t nothing but a heartache. Tell me why, ain''t nothing but a mistake',
    4,
    10,
    '2022-11-23T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Joyeux anniversaire Margaux!',
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.',
    5,
    11,
    '2022-11-24T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Secret Santa',
    'Tell me why, I never wanna hear you say. I want it that way',
    1,
    12,
    '2022-11-25T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Michael Jackson',
    'Don''t stop until you get enough',
    2,
    13,
    '2022-11-26T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Ron Steward',
    'Have you ever seen the rain?',
    3,
    14,
    '2022-11-27T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Mick Jagger',
    'Please allow me to introduce myself, I''m a man of wealth and taste',
    4,
    15,
    '2022-11-28T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Sash',
    '¡ ECUADOR !',
    5,
    1,
    '2022-11-29T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Lenny Kravitz',
    'Are you gona go my way ?',
    1,
    2,
    '2022-11-30T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'The Police',
    'You don''t have to put on that red light',
    2,
    3,
    '2022-12-01T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
  (
    'Arctic Monkeys',
    'I''ve seen your frown and it''s like looking down the barrel of a gun',
    3,
    4,
    '2022-12-02T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
  (
    'Pink Floyd',
    'Money, it''s a gas. Grab that cash with both hands and make a stash',
    4,
    5,
    '2022-12-03T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'David Bowie',
    'If you say run, I''ll run with you and if you say hide, we''ll hide',
    5,
    6,
    '2022-12-04T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Derek & The Dominos',
    'What will you do when you get lonely? No one waiting by your side?',
    1,
    7,
    '2022-12-05T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'The Mamas & The Papas',
    'All the leaves are brown and the sky is gray.',
    2,
    8,
    '2022-12-06T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Dire Straits',
    'And Harry doesn''t mind if he doesn''t make the scene. He''s got a daytime job, he''s doing alright',
    3,
    9,
    '2022-12-07T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'The Doors',
    'Come on, baby, light my fire',
    4,
    10,
    '2022-12-08T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Pixies',
    'With your feet on the air and your head on the ground. Try this trick and spin it, yeah ',
    5,
    11,
    '2022-12-09T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'J.J. Cale',
    'If you want to hang out. You''ve got to take her out, cocaine',
    1,
    12,
    '2022-12-10T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'KISS',
    'I was made for loving you, baby. You were made for loving me',
    2,
    13,
    '2022-12-11T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Guns N'' Roses',
    'Take me down to the Paradise City, where the grass is green and the girls are pretty',
    3,
    14,
    '2022-12-12T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  ),
    (
    'Thin Lizzy',
    'The boys are back in town',
    4,
    15,
    '2022-12-13T11:04:06.163Z',
    ' https://www.choisir.com/medias/b2380444-ligne-enedis.jpg '
  );

CREATE TABLE like_table(
post_id int not null,
user_id int not null,
CONSTRAINT fk_like_table_post
FOREIGN KEY(post_id) REFERENCES post(id),
CONSTRAINT fk_like_table_user_detail
FOREIGN KEY(user_id) REFERENCES user_detail(id)
);

CREATE TABLE attached_file(
image varchar(250),
pdf varchar(250),
post_id int not null,
CONSTRAINT fk_attached_file_post
FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE
);

CREATE TABLE comment(
id serial primary key not null,
content text not null,
post_id int not null,
user_id int not null,
CONSTRAINT fk_comment_post
FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE,
CONSTRAINT fk_comment_user
FOREIGN KEY(user_id) REFERENCES user_detail(id) ON DELETE CASCADE
);

INSERT INTO
  comment (content, post_id, user_id)
VALUES ('YOLOOO', 1, 2);

CREATE TABLE user_group
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  CONSTRAINT fk_user_group_user_detail
    FOREIGN KEY (user_id) REFERENCES user_detail (id) ON DELETE CASCADE,
  CONSTRAINT fk_user_group_group_detail
    FOREIGN KEY (group_id) REFERENCES group_detail (id) ON DELETE CASCADE
);


INSERT INTO
  user_group (user_id, group_id)
VALUES (1, 2);

