DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS items CASCADE;


CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE vendors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
  vendor_id BIGINT NOT NULL,
  FOREIGN KEY (vendor_id) REFERENCES users(id)
);

CREATE TABLE admins (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
  admin_id BIGINT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES users(id)
);

CREATE TABLE items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
  item_name VARCHAR NOT NULL,
  item_price BIGINT NOT NULL,
  vendor_id BIGINT NOT NULL,
  FOREIGN KEY (vendor_id) REFERENCES users(id)
);

INSERT INTO users (
  email,
  password_hash
)
VALUES (
  'admin@admin.com',
  '$argon2id$v=19$m=65536,t=4,p=4$8HiGW7N8akOX5VonwiWt1Q$3c9T9TaYv/XGDrGogMkI14Yo11avM7+T2kcgNeDwiKQ'
);

INSERT INTO vendors (
  vendor_id
)
VALUES (
  '1'
);

INSERT INTO admins (
  admin_id
)
VALUES 
  ('1');

INSERT INTO items (
  item_name,
  item_price,
  vendor_id
)
VALUES 
  ('Test Item','1000','1'),
  ('Another Item','10000','1');