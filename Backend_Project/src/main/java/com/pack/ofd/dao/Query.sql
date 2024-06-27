create database Online_Food_Delivery;

use Online_Food_Delivery;

-- tables:

show tables;
-- user
-- restaurant
-- category
-- food
-- food_order
-- cart
-- order_item
-- order_delivery
-- delivery_person

select * from admin;
select * from user; 
select * from restaurant;
select * from category;		
select * from food;
select * from food_order;		
select * from cart;
select * from order_item;
select * from order_delivery;
select * from delivery_person;

-- drop table order_delivery_seq;

-- describe
desc admin;
desc user;
desc restaurant;
desc category;
desc food;
desc food_order;
desc cart;
desc order_item;
desc order_delivery;
desc delivery_person;

ALTER TABLE user ADD UNIQUE (email_id); 
ALTER TABLE user ADD UNIQUE (phone_number);

-- ALTER TABLE user drop column user_type; -- drop column in the table

-- alter table restaurant rename column first_name to restaurant_name ;
-- alter table restaurant rename column last_name to owner_name ;

-- alter table food rename column catergory_id to category_id;

ALTER TABLE admin ADD UNIQUE(email_id);

-- delete from admin where password="pass";
-- SET SQL_SAFE_UPDATES = 0;  // Uses to 'off' safe mode while deleting data in the table.
-- SET SQL_SAFE_UPDATES = 1;  // Uses to 'on' safe mode to prevent the data from deleting.

ALTER TABLE restaurant ADD UNIQUE (email_id);
ALTER TABLE restaurant ADD UNIQUE (phone_number);

ALTER TABLE category ADD PRIMARY KEY(name);
ALTER TABLE category ADD UNIQUE(category_id);

SELECT * FROM restaurant WHERE restaurant_id = 1;

SHOW CREATE TABLE food;

ALTER TABLE food MODIFY category_Name VARCHAR(255);
ALTER TABLE food ADD FOREIGN KEY (category_Name) REFERENCES category(name);
ALTER TABLE food ADD FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id);
ALTER TABLE food MODIFY COLUMN food_img_url2 VARCHAR(5000); -- Adjust the length as per your requirement

-- To find foreign key constraint name
select * from INFORMATION_SCHEMA.key_column_usage where table_name ='food';

-- To find primary key constraint name
SELECT CONSTRAINT_NAME  
FROM   INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE  TABLE_NAME = 'category'  -- Table Name
       AND TABLE_SCHEMA = 'online_food_delivery'  -- change it if table is in some other schema 
       AND CONSTRAINT_TYPE = 'PRIMARY KEY';
       
-- To delete foreign to a particular column
-- ALTER TABLE food DROP CONSTRAINT food_ibfk_1;

-- To delete primary key 
-- ALTER TABLE category DROP PRIMARY key;

ALTER TABLE food_order ADD FOREIGN KEY (customer_id) REFERENCES user(user_id);

ALTER TABLE cart ADD FOREIGN KEY (customer_id) REFERENCES user(user_id);
ALTER TABLE cart ADD FOREIGN KEY (food_id) REFERENCES food(food_id);

ALTER TABLE order_item ADD FOREIGN KEY (order_id) REFERENCES food_order(order_id);
ALTER TABLE order_item ADD FOREIGN KEY (food_id) REFERENCES food(food_id);
ALTER TABLE order_item ADD FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id);

ALTER TABLE delivery_person ADD UNIQUE (email_id);
ALTER TABLE delivery_person ADD UNIQUE (phone_number);
ALTER TABLE delivery_person ADD FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id);

ALTER TABLE order_delivery ADD FOREIGN KEY (order_id) REFERENCES food_order(order_id);
ALTER TABLE order_delivery ADD FOREIGN KEY (delivery_person_id) REFERENCES delivery_person(delivery_person_id);

select *from restaurant;

-- ALTER TABLE restaurant 
-- DROP COLUMN user_id;

-- ALTER TABLE food_order 
-- DROP COLUMN user_id;

-- ALTER TABLE delivery_person 
-- DROP COLUMN user_id;


-- select * from user_info;
-- drop table user_info;
-- create table User_info(
-- User_Id int primary key auto_increment,
-- User_Type varchar(200) not null,
-- First_Name varchar(200) not null,
-- Last_Name varchar(200) not null,
-- Email_Id varchar(200) unique not null,
-- Phone_Number bigint unique not null,
-- Street varchar(200),
-- City varchar(200),
-- Pin_Code varchar(30),
-- Password varchar(100) not null
-- 

select * from user where email_id="Email@gmail.com" && password="pass";
