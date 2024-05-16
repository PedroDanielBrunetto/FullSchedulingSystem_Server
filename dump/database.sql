CREATE DATABASE DrDanielMartinez;

USE DrDanielMartinez;

CREATE TABLE IF NOT EXISTS MainUser (
id_user INT NOT NULL,
nm_user VARCHAR(60) NOT NULL,
email_user VARCHAR(180) NOT NULL,
cel_user CHAR(11) NOT NULL,
cpf_user CHAR(11) NOT NULL,
cep_user CHAR(9) NOT NULL,
password_user VARCHAR(255) NOT NULL,
recoveryCode VARCHAR(255),
recoveryCodeExpiry DATETIME,
CONSTRAINT PRIMARY KEY (id_user),
UNIQUE (id_user, email_user, cel_user, cpf_user)
);

CREATE TABLE IF NOT EXISTS patient(
id_patient INT NOT NULL auto_increment,
first_name VARCHAR(60) NOT NULL,
second_name VARCHAR(60) NOT NULL,
cpf_patient CHAR(11) NOT NULL,
cep_patient CHAR(9) NOT NULL,
email_patient VARCHAR(180),
cel_patient CHAR(11),
about_patient VARCHAR(200),
CONSTRAINT PRIMARY KEY (id_patient),
UNIQUE (id_patient, cpf_patient, email_patient)
);

CREATE TABLE IF NOT EXISTS agenda(
id_scheduling INT NOT NULL auto_increment,
display_name VARCHAR(60) NOT NULL,
initial DATETIME NOT NULL,
final DATETIME NOT NULL,
message VARCHAR(180),
id_patient INT NOT NULL,
CONSTRAINT PRIMARY KEY (id_scheduling),
CONSTRAINT fk_patient
	FOREIGN KEY (id_patient)
	REFERENCES patient (id_patient)
);

CREATE TABLE IF NOT EXISTS settings(
id INT NOT NULL PRIMARY KEY,
url_message VARCHAR(255),
timetable_message TIME,
sending_interval INT
);

INSERT INTO MainUser VALUES (1, "Daniel Martinez", "pedrodanielbm@hotmail.com", "13992043766", "50096888830", "11088160", "30112251", null, null);  