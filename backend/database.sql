DROP TABLE IF EXISTS attached_file;
DROP TABLE IF EXISTS like_table;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user_group;
DROP TABLE IF EXISTS group_detail;
DROP TABLE IF EXISTS user_detail;

CREATE TABLE user_detail(
id serial primary key not null,
firstname varchar(50),
lastname varchar(50),
email varchar(80) not null,
isAdmin boolean not null,
user_password varchar(80) not null,
avatar varchar(250)
);

CREATE TABLE group_detail(
id serial primary key not null,
group_name varchar(80),
image varchar(250)
);

CREATE TABLE user_group(
user_id int not null,
group_id int not null,
CONSTRAINT fk_user_group_user_detail
FOREIGN KEY(user_id) REFERENCES user_detail(id),
CONSTRAINT fk_user_group_group_detail
FOREIGN KEY(group_id) REFERENCES group_detail(id)
);

CREATE TABLE category(
id serial primary key not null,
category_name varchar(200) not null,
image varchar(250),
group_id int not null,
CONSTRAINT fk_category_group
FOREIGN KEY(group_id) REFERENCES group_detail(id)
);

CREATE TABLE post(
id serial primary key not null,
title varchar(200) not null,
content text not null,
user_id int not null,
category_id int not null,
CONSTRAINT fk_post_user
FOREIGN KEY(user_id) REFERENCES user_detail(id),
CONSTRAINT fk_post_category
FOREIGN KEY(category_id) REFERENCES category(id)
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







