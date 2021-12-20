
CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_name varchar(255) NOT NULL UNIQUE,
    user_password varchar(255) NOT NULL,
    user_gmail varchar(255) NOT NULL,
    user_tel varchar(255) NOT NULL,
    is_admin varchar(255) NOT NULL
);

INSERT INTO users(user_name, user_password,user_gmail,user_tel,is_admin) VALUES('superadmin', 'superadmin@123','s@gmail.com','+998979999997','super');

INSERT INTO users(user_name, user_password,user_gmail,user_tel,is_admin) VALUES('Sherali', 'Sherali@123','sh@gmail.com','+99897634666','user');
INSERT INTO users(user_name, user_password,user_gmail,user_tel,is_admin) VALUES('Shakhzod', 'Shakh@123','sh@gmail.com','+998979999997','admin');

INSERT INTO users(user_name, user_password,user_gmail,user_tel,is_admin) VALUES('Murod', 'm@123','m@gmail.com','+998979999887','admin');

CREATE TABLE clinics(
    clinic_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    clinic_name varchar(255) NOT NULL,
    clinic_lacation varchar(255) NOT NULL,
    clinic_img text NOT NULL,
    clinic_tel varchar(20) NOT NULL,
    clinic_admin uuid NOT NULL,
    FOREIGN KEY (clinic_admin)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

INSERT INTO clinics(clinic_name, clinic_lacation,clinic_img,clinic_tel, clinic_admin) VALUES('CITY MED', 'Beruniy metro station','https://avatars.mds.yandex.net/get-altay/1938975/2a00000170a215801a4b69e183ed4de380e2/XXL','+998-78-777-03-03', '8b835606-c050-48fc-af0c-0cd2be8f49d1');

INSERT INTO clinics(clinic_name, clinic_lacation,clinic_img,clinic_tel, clinic_admin) VALUES('EURO MED', 'Denov district','https://avatars.mds.yandex.net/get-altay/1705560/2a0000016e787e135e756969ec61dbcc5b07/XXL','+998-71-233-55-98', '8836f232-c989-4acf-8aa9-eb21ebb8589f');

CREATE TABLE services(
    service_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    service_title varchar(255) NOT NULL,
    service_img varchar(500) NOT NULL,
    doctor_name varchar(200) NOT NULL,
    doctor_tel varchar(20) NOT NULL,
    ref_clinic uuid NOT NULL,
    FOREIGN KEY (ref_clinic)
        REFERENCES clinics(clinic_id)
        ON DELETE CASCADE
);

INSERT INTO services(service_title,service_img,doctor_name,doctor_tel,ref_clinic) VALUES('Lor', 'https://healthinfo.healthengine.com.au/assets/iStock-1051318054-1024x683.jpg', 'Gulnora Ashurova', '+998-94-255-34-55', 'dc8c3f4d-8a95-4919-b0d1-a41f702cda1c');

INSERT INTO services(service_title,service_img,doctor_name,doctor_tel,ref_clinic) VALUES('Kardiologist', 'https://healthinfo.healthengine.com.au/assets/iStock-1051318054-1024x683.jpg', 'Gulnora Ashurova', '+998-94-255-34-55', '48b232b9-243a-4698-9203-18b5c0257a41');

CREATE TABLE orders(
    order_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    order_service uuid NOT NULL,
    order_owner uuid NOT NULL,
    order_time timestamptz DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_service)
        REFERENCES services(service_id)
        ON DELETE CASCADE,
    FOREIGN KEY (order_owner)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE old_orders(
    order_id uuid,
    order_service uuid,
    order_owner uuid,
    order_time timestamptz
);

INSERT INTO orders(order_service, order_owner) VALUES('968f00a1-d304-43cb-a04a-3faa78661957', 'fd60dcb3-66b0-40d2-a95d-711f39c49daf');


CREATE OR REPLACE FUNCTION deleteOrder()
RETURNS TRIGGER
LANGUAGE plpgsql
AS 
$$ 

BEGIN
    INSERT INTO old_orders(order_id,order_service,order_owner,order_time) VALUES(OLD.order_id, OLD.order_service, OLD.order_owner, OLD.order_time);
    RETURN OLD;

END

$$;

CREATE TRIGGER deleteTrg

BEFORE DELETE
ON orders
FOR EACH ROW
EXECUTE PROCEDURE deleteOrder();








