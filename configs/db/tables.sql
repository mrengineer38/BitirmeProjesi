DROP TABLE  IF EXISTS admin_user CASCADE;
DROP TABLE  IF EXISTS admin_type CASCADE;
DROP TABLE  IF EXISTS admin_passwords CASCADE; 

DROP TABLE  IF EXISTS user_telephone CASCADE;
DROP TABLE  IF EXISTS user_address CASCADE;
DROP TABLE  IF EXISTS user_payment CASCADE;
DROP TABLE  IF EXISTS user_account CASCADE;
DROP TABLE  IF EXISTS user_passwords CASCADE; 
DROP TABLE  IF EXISTS sepet CASCADE;

DROP TABLE  IF EXISTS product_category CASCADE;
DROP TABLE  IF EXISTS product_inventory CASCADE;
DROP TABLE  IF EXISTS discount CASCADE;
DROP TABLE  IF EXISTS product CASCADE;
DROP TABLE  IF EXISTS images CASCADE;




--USER MANAGEMENT TABLES

CREATE TABLE IF NOT EXISTS admin_type (
    id                  uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    admin_type          VARCHAR(20) UNIQUE,
    permission          VARCHAR(100),
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_user (
    id       			uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    email               VARCHAR(75)  NOT NULL UNIQUE,
    pass                VARCHAR(100) NOT NULL,
    first_name          VARCHAR(25)  NOT NULL,
    last_name           VARCHAR(25)  NOT NULL,
    type_id             uuid         NOT NULL,
    is_active           BOOLEAN DEFAULT TRUE,
    last_login          TIMESTAMP WITH TIME ZONE,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_admin_type
		FOREIGN KEY ( type_id )
			REFERENCES admin_type(id)
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin_passwords (
    id SERIAL           PRIMARY KEY,
    admin_id            uuid         NOT NULL,
    pass                VARCHAR(100) NOT NULL,
    is_active           BOOLEAN DEFAULT FALSE,

    
    CONSTRAINT fk_admin_account
        FOREIGN KEY (admin_id)
            REFERENCES admin_user(id)
);




CREATE TABLE IF NOT EXISTS user_account (
    id       			uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    email               VARCHAR(70)  NOT NULL UNIQUE,
    pass                VARCHAR(100) NOT NULL,
    is_active           BOOLEAN                  DEFAULT TRUE,
    first_name          VARCHAR(20)  NOT NULL,
    last_name           VARCHAR(20)  NOT NULL,
    last_login          TIMESTAMP WITH TIME ZONE,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS sepet (
	id       			SERIAL           PRIMARY KEY,
    card_owner          uuid NOT NULL,
	product_id			INT NOT NULL,
    quantity            INT CHECK (quantity >= 0 ) DEFAULT 0, 
	title 				VARCHAR(50)  NOT NULL,
    descript            VARCHAR(500) NOT NULL,
    price               NUMERIC      NOT NULL,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    discount_id         INT,

     CONSTRAINT fk_user_account
		FOREIGN KEY (card_owner)
			REFERENCES user_account(id)
);

CREATE TABLE IF NOT EXISTS user_passwords (
    id SERIAL           PRIMARY KEY,
    user_id             uuid         NOT NULL,
    pass                VARCHAR(100) NOT NULL,
    is_active           BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_user_account
        FOREIGN KEY (user_id)
            REFERENCES user_account(id)
);

CREATE TABLE IF NOT EXISTS user_address (
    id SERIAL 			PRIMARY KEY,
    user_id             uuid         NOT NULL,
    address_delivery    VARCHAR(150) NOT NULL,
    address_billing     VARCHAR(100) NOT NULL,
    city                VARCHAR(50)  NOT NULL,
    postal_code         VARCHAR(50)  NOT NULL,
    country             VARCHAR(50)  NOT NULL,
    telephone           INT          NOT NULL,

    CONSTRAINT fk_user_account
		FOREIGN KEY (user_id)
			REFERENCES user_account(id)
			ON DELETE CASCADE
       
);

CREATE TABLE IF NOT EXISTS user_telephone (
    id SERIAL           PRIMARY KEY,
    user_id             INT NOT NULL,
    phone_number        INT UNIQUE,

    CONSTRAINT fk_user_address
        FOREIGN KEY (user_id)
            REFERENCES user_address(id)
             ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_payment (
    id SERIAL 			PRIMARY KEY,
    user_id             uuid         NOT NULL,
    fullname            VARCHAR(50)  NOT NULL,
    payment_type        VARCHAR(20)  NOT NULL,
    payment_provider    VARCHAR(20)  NOT NULL,
    card_no             INT          NOT NULL,
    expiry             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_account
		FOREIGN KEY (user_id)
			REFERENCES user_account(id)
            ON DELETE CASCADE
);

--PRODUCT MANAGEMENT TABLES

CREATE TABLE IF NOT EXISTS product_category (
	id SERIAL 			PRIMARY KEY,
	title 				VARCHAR(50)	  UNIQUE NOT NULL,
    descript	        VARCHAR(50)	  UNIQUE NOT NULL,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    path ltree
);

create index tree_path_product_category on product_category using gist (path);




CREATE TABLE IF NOT EXISTS product(
    id                  SERIAL PRIMARY KEY,
    title 				VARCHAR  NOT NULL,
    descript            VARCHAR  NOT NULL,
    price               NUMERIC  NOT NULL,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category_id         INT          NOT NULL,
    discount_id         INT,
    inventory_id        INT UNIQUE   NOT NULL,

    CONSTRAINT fk_category
		FOREIGN KEY (category_id)
			REFERENCES product_category(id)
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS images(
    id                  SERIAL PRIMARY KEY,
    product_id          INT     NOT NULL,
    image_name          VARCHAR NOT NULL,
    byte_data           VARCHAR NOT NULL,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
		FOREIGN KEY (product_id)
			REFERENCES product(id)
            ON DELETE CASCADE 
)

CREATE TABLE IF NOT EXISTS product_inventory (
	id SERIAL 			PRIMARY KEY,
    product_id          INT UNIQUE NOT NULL,
    quantity            INT DEFAULT 0,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product
		FOREIGN KEY (product_id)
			REFERENCES product(id)
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS discount (
	id SERIAL 			PRIMARY KEY,
    product_id          INT UNIQUE NOT NULL,
    descript	        VARCHAR(50)	  UNIQUE NOT NULL,
    discount_percent    INT CHECK (discount_percent >= 0 AND discount_percent <= 90),
    is_active           BOOLEAN DEFAULT TRUE,
    created             TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finish              TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_product
		FOREIGN KEY (product_id)
			REFERENCES product(id)
            ON DELETE CASCADE
);



--SHOPPING PROCESS TABLES


