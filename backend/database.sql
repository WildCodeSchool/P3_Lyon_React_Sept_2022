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
    'https://i.imgur.com/lIAKkYJ.jpg'
  ),
  (
    'Doroteya',
    'Donova',
    'doroteya@enedis.fr',
    '0628164512',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://i.imgur.com/mhDBFju.jpg'
  ),
  (
    'Matthieu',
    'Georges',
    'matthieu@enedis.fr',
    '0628164513',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://i.imgur.com/zmIj4mm.jpg'
  ),
  (
    'Sahrane',
    'Guassemi',
    'sahrane@enedis.fr',
    '0628164514',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg'
  ),
  (
    'Ryan',
    'Beaujot',
    'ryan@enedis.fr',
    '0628164515',
    'user',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-371-456323-512.png'
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
FOREIGN KEY(group_id) REFERENCES group_detail(id)
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
CONSTRAINT fk_post_user
FOREIGN KEY(user_id) REFERENCES user_detail(id) ON DELETE CASCADE,
CONSTRAINT fk_post_category
FOREIGN KEY(category_id) REFERENCES category(id)
);

INSERT INTO
  post (title, content, user_id, category_id)
VALUES
  (
    'Organisation repas de Noel !',
    'You are my fire. The one desire. Believe when I say. I want it that way',
    1,
    1
  ),
  (
    'Vacances d''été',
    'Tell me why, ain''t nothing but a heartache. Tell me why, ain''t nothing but a mistake',
    2,
    2
  ),
  (
    'Joyeux anniversaire Margaux!',
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.',
    3,
    3
  ),
  (
    'Secret Santa',
    'Tell me why, I never wanna hear you say. I want it that way',
    4,
    4
  ),
    (
    'Michael Jackson',
    'Don''t stop until you get enough',
    5,
    5
  ),
    (
    'Ron Steward',
    'Have you ever seen the rain?',
    1,
    6
  ),
    (
    'Mick Jagger',
    'Please allow me to introduce myself, I''m a man of wealth and taste',
    2,
    7
  ),
    (
    'Sash',
    '¡ ECUADOR !',
    3,
    8
  ),
    (
    'Lenny Kravitz',
    'Are you gona go my way ?',
    4,
    9
  ),
    (
    'The Police',
    'You don''t have to put on that red light',
    5,
    10
  ),
  (
    'Arctic Monkeys',
    'I''ve seen your frown and it''s like looking down the barrel of a gun',
    1,
    11
  ),
  (
    'Pink Floyd',
    'Money, it''s a gas. Grab that cash with both hands and make a stash',
    2,
    12
  ),
    (
    'David Bowie',
    'If you say run, I''ll run with you and if you say hide, we''ll hide',
    3,
    13
  ),
(
    'Derek & The Dominos',
    'What will you do when you get lonely? No one waiting by your side?',
    4,
    15
  ),
    (
    'The Mamas & The Papas',
    'All the leaves are brown and the sky is gray.',
    5,
    1
  ),
    (
    'Dire Straits',
    'And Harry doesn''t mind if he doesn''t make the scene. He''s got a daytime job, he''s doing alright',
    1,
    2
  ),
    (
    'The Doors',
    'Come on, baby, light my fire',
    2,
    3
  ),
    (
    'Pixies',
    'With your feet on the air and your head on the ground. Try this trick and spin it, yeah ',
    3,
    4
  ),
    (
    'J.J. Cale',
    'If you want to hang out. You''ve got to take her out, cocaine',
    4,
    5
  ),
    (
    'KISS',
    'I was made for loving you, baby. You were made for loving me',
    5,
    6
  ),
    (
    'Guns N'' Roses',
    'Take me down to the Paradise City, where the grass is green and the girls are pretty',
    1,
    7
  ),
    (
    'Thin Lizzy',
    'The boys are back in town',
    2,
    8
  ),
  (
    'Organisation repas de Noël !',
    'You are my fire. The one desire. Believe when I say. I want it that way',
    3,
    9
  ),
    (
    'Vacances d''été',
    'Tell me why, ain''t nothing but a heartache. Tell me why, ain''t nothing but a mistake',
    4,
    10
  ),
    (
    'Joyeux anniversaire Margaux!',
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.',
    5,
    11
  ),
    (
    'Secret Santa',
    'Tell me why, I never wanna hear you say. I want it that way',
    1,
    12
  ),
    (
    'Michael Jackson',
    'Don''t stop until you get enough',
    2,
    13
  ),
    (
    'Ron Steward',
    'Have you ever seen the rain?',
    3,
    14
  ),
    (
    'Mick Jagger',
    'Please allow me to introduce myself, I''m a man of wealth and taste',
    4,
    15
  ),
    (
    'Sash',
    '¡ ECUADOR !',
    5,
    1
  ),
    (
    'Lenny Kravitz',
    'Are you gona go my way ?',
    1,
    2
  ),
    (
    'The Police',
    'You don''t have to put on that red light',
    2,
    3
  ),
  (
    'Arctic Monkeys',
    'I''ve seen your frown and it''s like looking down the barrel of a gun',
    3,
    4
  ),
  (
    'Pink Floyd',
    'Money, it''s a gas. Grab that cash with both hands and make a stash',
    4,
    5
  ),
    (
    'David Bowie',
    'If you say run, I''ll run with you and if you say hide, we''ll hide',
    5,
    6
  ),
    (
    'Derek & The Dominos',
    'What will you do when you get lonely? No one waiting by your side?',
    1,
    7
  ),
    (
    'The Mamas & The Papas',
    'All the leaves are brown and the sky is gray.',
    2,
    8
  ),
    (
    'Dire Straits',
    'And Harry doesn''t mind if he doesn''t make the scene. He''s got a daytime job, he''s doing alright',
    3,
    9
  ),
    (
    'The Doors',
    'Come on, baby, light my fire',
    4,
    10
  ),
    (
    'Pixies',
    'With your feet on the air and your head on the ground. Try this trick and spin it, yeah ',
    5,
    11
  ),
    (
    'J.J. Cale',
    'If you want to hang out. You''ve got to take her out, cocaine',
    1,
    12
  ),
    (
    'KISS',
    'I was made for loving you, baby. You were made for loving me',
    2,
    13
  ),
    (
    'Guns N'' Roses',
    'Take me down to the Paradise City, where the grass is green and the girls are pretty',
    3,
    14
  ),
    (
    'Thin Lizzy',
    'The boys are back in town',
    4,
    15
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
FOREIGN KEY(post_id) REFERENCES post(id)
);

CREATE TABLE comment(
id serial primary key not null,
content text not null,
post_id int not null,
user_id int not null,
CONSTRAINT fk_comment_post
FOREIGN KEY(post_id) REFERENCES post(id),
CONSTRAINT fk_comment_user
FOREIGN KEY(user_id) REFERENCES user_detail(id)
);


