create table users (
    id serial primary key,
    account_name varchar(100) NOT NULL UNIQUE, 
    email varchar(200) NOT NULL UNIQUE,
    password varchar(200) NOT NULL,
    created DATE NOT NULL DEFAULT (CURRENT_DATE),
    lastlog TIMESTAMP,
    notifications boolean
);