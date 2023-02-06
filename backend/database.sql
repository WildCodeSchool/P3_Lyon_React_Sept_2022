DROP TABLE IF EXISTS user_group;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS attached_file;
DROP TABLE IF EXISTS like_table;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS group_detail;
DROP TABLE IF EXISTS user_detail;

set timezone TO 'Europe/Paris';
SET TIME ZONE 'Europe/Paris';

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
    'Spécialiste en cyber-sécurité',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'javier.jpg'
  ),
  (
    'Doroteya',
    'Donova',
    'doroteya@enedis.fr',
    '0628164512',
    'Design specialst',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'doroteya.jpg'
  ),
  (
    'Matthieu',
    'George',
    'matthieu@enedis.fr',
    '0628164513',
    'Admin réseau',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'matthieu.jpg'
  ),
  (
    'Sahrane',
    'Guassemi',
    'sahrane@enedis.fr',
    '0628164514',
    'Directeur technique',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'sahrane.jpg'
  ),
  (
    'Ryan',
    'Beaujot',
    'ryan@enedis.fr',
    '0628164515',
    'Chargé de marketing',
    '$argon2id$v=19$m=65536,t=5,p=1$dKODL61qs2D/2A+iFhTc9w$xJWm4TCgdKNDQdy/2KWF1AQrcKqvrljRO9Ex0byxhps',
    'ryan.jpg'
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
    'solar-groups.jpeg'
  ),
  (
    'Métier',
    'solar-groups.jpeg'
  ),
  (
    'Prévention',
    'solar-groups.jpeg'
  ),
  (
    'Entre nous',
    'solar-groups.jpeg'
  ),
  (
    'Clients',
    'solar-groups.jpeg'
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
    'office.jpg',
    1
  ),
    (
    'La vie des sites',
    'office.jpg',
    1
  ),
    (
    'Affichage réglementaire',
    'office.jpg',
    1
  ),
  (
    'Métier1',
    'office.jpg',
    2
  ),
  (
    'Métier2',
    'office.jpg',
    2
  ),
  (
    'Métier3',
    'office.jpg',
    2
  ),
  (
    'Réseau',
    'office.jpg',
    3
  ),
  (
    'Prev2',
    'office.jpg',
    3
  ),
  (
    'Prev3',
    'office.jpg',
    3
  ),
  (
    'Nous 1',
    'office.jpg',
    4
  ),
  (
    'Mobilité',
    'office.jpg',
    4
  ),
  (
    'Rapports d''activités',
    'office.jpg',
    4
  ),
  (
    'Infos Rhône-Alpes',
    'office.jpg',
    5
  ),
  (
    'Projet régionnal',
    'office.jpg',
    5
  ),
  (
    'Innovation',
    'office.jpg',
    5
  );
  

CREATE TABLE post(
id serial primary key not null,
title varchar(200) not null,
content text not null,
user_id int not null,
category_id int not null,
post_date timestamptz,
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
    'waterEolienne.jpg'
  ),
  (
    'Vacances d''été',
    'Tell me why, ain''t nothing but a heartache. Tell me why, ain''t nothing but a mistake',
    2,
    2,
    '2022-11-02T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
  (
    'Joyeux anniversaire Margaux!',
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.',
    3,
    3,
    '2022-11-03T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
  (
    'Secret Santa',
    'Tell me why, I never wanna hear you say. I want it that way',
    4,
    4,
    '2022-11-04T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Michael Jackson',
    'Don''t stop until you get enough',
    5,
    5,
    '2022-11-05T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Ron Steward',
    'Have you ever seen the rain?',
    1,
    6,
    '2022-11-06T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Mick Jagger',
    'Please allow me to introduce myself, I''m a man of wealth and taste',
    2,
    7,
    '2022-11-07T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Sash',
    '¡ ECUADOR !',
    3,
    8,
    '2022-11-08T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Lenny Kravitz',
    'Are you gona go my way ?',
    4,
    9,
    '2022-11-08T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'The Police',
    'You don''t have to put on that red light',
    5,
    10,
    '2022-11-09T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
  (
    'Arctic Monkeys',
    'I''ve seen your frown and it''s like looking down the barrel of a gun',
    1,
    11,
    '2022-11-10T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
  (
    'Pink Floyd',
    'Money, it''s a gas. Grab that cash with both hands and make a stash',
    2,
    12,
    '2022-11-11T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'David Bowie',
    'If you say run, I''ll run with you and if you say hide, we''ll hide',
    3,
    13,
    '2022-11-12T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
(
    'Derek & The Dominos',
    'What will you do when you get lonely? No one waiting by your side?',
    4,
    15,
    '2022-11-13T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'The Mamas & The Papas',
    'All the leaves are brown and the sky is gray.',
    5,
    1,
    '2022-11-14T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Dire Straits',
    'And Harry doesn''t mind if he doesn''t make the scene. He''s got a daytime job, he''s doing alright',
    1,
    2,
    '2022-11-15T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'The Doors',
    'Come on, baby, light my fire',
    2,
    3,
    '2022-11-16T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Pixies',
    'With your feet on the air and your head on the ground. Try this trick and spin it, yeah ',
    3,
    4,
    '2022-11-17T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'J.J. Cale',
    'If you want to hang out. You''ve got to take her out, cocaine',
    4,
    5,
    '2022-11-18T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'KISS',
    'I was made for loving you, baby. You were made for loving me',
    5,
    6,
    '2022-11-19T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Guns N'' Roses',
    'Take me down to the Paradise City, where the grass is green and the girls are pretty',
    1,
    7,
    '2022-11-20T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Thin Lizzy',
    'The boys are back in town',
    2,
    8,
    '2022-11-21T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
  (
    'Organisation repas de Noël !',
    'You are my fire. The one desire. Believe when I say. I want it that way',
    3,
    9,
    '2022-11-22T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Vacances d''été',
    'Tell me why, ain''t nothing but a heartache. Tell me why, ain''t nothing but a mistake',
    4,
    10,
    '2022-11-23T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Joyeux anniversaire Margaux!',
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.',
    5,
    11,
    '2022-11-24T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Secret Santa',
    'Tell me why, I never wanna hear you say. I want it that way',
    1,
    12,
    '2022-11-25T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Michael Jackson',
    'Don''t stop until you get enough',
    2,
    13,
    '2022-11-26T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Ron Steward',
    'Have you ever seen the rain?',
    3,
    14,
    '2022-11-27T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Mick Jagger',
    'Please allow me to introduce myself, I''m a man of wealth and taste',
    4,
    15,
    '2022-11-28T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Sash',
    '¡ ECUADOR !',
    5,
    1,
    '2022-11-29T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Lenny Kravitz',
    'Are you gona go my way ?',
    1,
    2,
    '2022-11-30T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'The Police',
    'You don''t have to put on that red light',
    2,
    3,
    '2022-12-01T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
  (
    'Arctic Monkeys',
    'I''ve seen your frown and it''s like looking down the barrel of a gun',
    3,
    4,
    '2022-12-02T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
  (
    'Pink Floyd',
    'Money, it''s a gas. Grab that cash with both hands and make a stash',
    4,
    5,
    '2022-12-03T11:04:06.163Z',
    'waterEolienne.jpg'
  ),
    (
    'Qui sommes-nous ? | Enedis',
    'Nos 38 000 salariés répartis dans chacune des régions de France œuvrent au quotidien pour vous garantir l''accès à une alimentation électrique de qualité.',
    1,
    6,
    '2022-12-04',
    'téléchargement.jpeg'
  ),
    (
    'Projets raccordement Electrique',
    'Enedis est une entreprise de service public, gestionnaire du réseau de distribution d''électricité. Elle développe, exploite, modernise le réseau électrique et gère les données associées. Elle facilite la transition énergétique des territoires en les accompagnant dans le développement et la planification de leur production d''électricité d''origine renouvelable.',
    5,
    7,
    '2022-12-05T11:04:06.163Z',
    ''
  ),
    (
    'Enedis au coeur de la transition énergétique',
    'Entreprise de service public de distribution d''électricité, Enedis tire le bilan de dix ans d''expertise dans l''accompagnement des territoires et lance des projets toujours plus innovants en Auvergne-Rhône-Alpes.',
    2,
    14,
    '2022-12-06T11:04:06.163Z',
    ''
  ),
    (
    'Mise à niveau numérique',
    'Spécialisée dans le développement d''outils de conception, de simulation et de supervision 3D pour l''industrie, la société toulousaine Virtual IT s''embarque pour le CES de Las Vegas avec une nouvelle solution qui permet d''adapter l''utilisation de maquettes numériques à des interventions de terrain. Démonstration avec Enedis.',
    3,
    15,
    '2022-12-07T11:04:06.163Z',
    ''
  ),
    (
    'Développement de la mobilité électrique',
    'La flotte électrique d''entreprise d''Enedis est la 2e en France avec 1880 voitures destinées aux interventions. Cette flotte est un véritable laboratoire de la mobilité électrique à grande échelle : elle permet à Enedis d''acquérir une expérience réelle, tant du point de vue technologique que d''un point de vue humain.',
    4,
    11,
    '2022-12-08T11:04:06.163Z',
    'voitures.jpg'
  ),
    (
    'Rapport d''activité',
    'Voici rapport de synthèse des usines de Val de Loire',
    5,
    11,
    '2022-12-09T11:04:06.163Z',
    'synthèse Matthieu GEORGE.pdf'
  ),
    (
    'Le compteur Linky vous facilite la vie',
    'Le compteur Linky apporte de nouveaux services. Il simplifie vos démarches et vous permet de maîtriser votre consommation et votre facture d''électricité.',
    1,
    15,
    '2022-12-10T11:04:06.163Z',
    'linky.png'
  ),
    (
    'Plan de restructuration en Rhône-Alpes',
    'La crise sanitaire frappe durement l''activité des petits commerçants et artisans, entraînant une augmentation de la vacance dans les territoires fragiles et, notamment, dans beaucoup de centres-villes. Or, les commerces de proximité participent à l’attractivité des territoires et à la qualité de vie de leurs habitants.',
    2,
    13,
    '2022-12-11T11:04:06.163Z',
    ''
    
  ),
    (
    'Le futur de l''Auvergne',
    'Un nouveau projet s''aprêtte à voir le jour aux alentours de Clermont-ferrand pour le plus grand bonheur de la régions qui estime une baisse du coup de l''électricité dans la régons de 10% sur 5 ans ',
    4,
    14,
    '2022-12-12T11:04:06.163Z',
    'panneaux.jpg'
  ),
    (
    'À la conquête de l''océan',
    'Après de nombreuses recherches il semblerait qu''il suffirait de recouvrir seulement 2% de la surface de l''océan d''éolienne pour subvenir au besoins de toute l''humanité en électricité, propre et renouvelable de sûrcroit !',
    3,
    15,
    '2022-12-13T11:04:06.163Z',
    'waterEolienne.jpg'
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
comment_date timestamptz,
CONSTRAINT fk_comment_post
FOREIGN KEY(post_id) REFERENCES post(id) ON DELETE CASCADE,
CONSTRAINT fk_comment_user
FOREIGN KEY(user_id) REFERENCES user_detail(id) ON DELETE CASCADE
);

INSERT INTO
  comment (content, post_id, user_id)
VALUES ('J''adore !', 1, 2);




CREATE TABLE user_group
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  CONSTRAINT fk_user_group_user_detail
    FOREIGN KEY (user_id) REFERENCES user_detail (id) ON DELETE CASCADE,
  CONSTRAINT fk_user_group_group_detail
    FOREIGN KEY (group_id) REFERENCES group_detail (id) ON DELETE CASCADE,
  CONSTRAINT unique_user_group UNIQUE (user_id, group_id)
);

INSERT INTO
  user_group (user_id, group_id)
VALUES (1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (2, 5), (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (4, 1), (4, 2), (4, 5), (5, 1), (5, 2), (5, 3);

