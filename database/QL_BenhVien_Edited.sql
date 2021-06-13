/*==============================================================*/
/* DBMS name:      ORACLE Version 11g, 18c                      */
/* Created on:     3/28/2021 12:17:09 AM                        */
/* Creator:         Nhom 22 - ATBM HTTT							*/
/*          	18120606 - Tran Thi Trang						*/
/*          18120609 - Ho Khac Minh Tri							*/
/*        18120634 - Nguyen Le Anh Tuan							*/
/*==============================================================*/

/* ------------------------ TAO CAC BANG ---------------------- */

/*==============================================================*/
/* 1. Table: EMPLOYEES (Nhan vien, bac si)                      */
/*==============================================================*/
CREATE TABLE Employees (
	Emp_Id            INTEGER NOT NULL,
	Unit_Id           INTEGER NOT NULL, -- Don vi lam viec
	Emp_Name          NVARCHAR2(50) NOT NULL,
	Emp_Age           INTEGER NOT NULL,
	Emp_Address       NVARCHAR2(100),
	Emp_Phone         CHAR(10),
	Emp_Basic_Salary  FLOAT NOT NULL,  -- luong co ban
	Emp_Allowance     FLOAT NOT NULL,  -- tro cap  
	Emp_Speciality    NVARCHAR2(100) NOT NULL, -- chuyen mon
	Emp_Experience    INTEGER DEFAULT 0 NOT NULL,
	Emp_Type          INTEGER NOT NULL,
	CONSTRAINT Pk_Employees PRIMARY KEY ( Emp_Id ),
	CONSTRAINT Ck_Employees_Type CHECK ( Emp_Type >= 0 ),
	CONSTRAINT Ck_Employees_Experience CHECK ( Emp_Experience >= 0 )
);

/*==============================================================*/
/* 2. Table: DEPARTMENT (Phong kham)                            */
/*==============================================================*/
CREATE TABLE Departments (
	Dep_Id    INTEGER NOT NULL,
	Dep_Name  NVARCHAR2(50) NOT NULL,
	Dep_Type  INTEGER DEFAULT 0,
	CONSTRAINT Pk_Department PRIMARY KEY ( Dep_Id ),
	CONSTRAINT Ck_Department_Type CHECK ( Dep_Type >= 0 )
);

/*==============================================================*/
/* 3. Table: UNIT_WORK (Don vi lam viec cua nhan vien)          */
/*==============================================================*/
CREATE TABLE Unit_Works (
	Unit_Id    INTEGER NOT NULL,
	Unit_Name  NVARCHAR2(50) NOT NULL,
	CONSTRAINT Pk_Part_Work PRIMARY KEY ( Unit_Id )
);

/*==============================================================*/
/* 4. Table: SHIFTS  (Ca lam viec)                              */
/*==============================================================*/
CREATE TABLE Shifts (
	Shift_Id    INTEGER NOT NULL,
	Emp_Id      INTEGER NOT NULL, -- Nhan vien truc ca
	Dep_Id      INTEGER NOT NULL, -- Phong ban duoc truc
	Start_Time  TIMESTAMP NOT NULL,
	End_Time    TIMESTAMP NOT NULL,
	CONSTRAINT Pk_Shifts PRIMARY KEY ( Shift_Id ),
	CONSTRAINT U_Shifts UNIQUE ( Emp_Id, Start_Time )
);

/*==============================================================*/
/* 5. Table: MEDICINES (Thuoc)                                  */
/*==============================================================*/
CREATE TABLE Medicines (
	Medicine_Id     INTEGER NOT NULL,
	Medicine_Name   NVARCHAR2(100) NOT NULL,
	Medicine_Group  INTEGER NOT NULL,
	Medicine_Price  INTEGER NOT NULL,
	Medicine_Stock  SMALLINT NOT NULL,
	Medicine_Desc   NVARCHAR2(256) NOT NULL,
	Manufacture_Date DATE NOT NULL,
	Exp_Date DATE NOT NULL,
	CONSTRAINT Pk_Medicines PRIMARY KEY ( Medicine_Id ),
	CONSTRAINT Ck_Medicines_Stock Check(Medicine_Stock >= 0),
	CONSTRAINT Ck_Medicines_Price Check(Medicine_Price >= 0),
	CONSTRAINT Ck_Medicines_Group Check(Medicine_Group >= 0),
	CONSTRAINT Ck_Medicines_Exp_Date Check(Exp_Date >= Manufacture_Date)
);

/*==============================================================*/
/* 6. Table: PATIENTS                                           */
/*==============================================================*/
CREATE TABLE Patients (
	Patient_Id       INTEGER NOT NULL,
	Patient_Name     NVARCHAR2(50) NOT NULL,
	Patient_Age      INTEGER NOT NULL,
	Patient_Phone    CHAR(10),
	Patient_Address  NVARCHAR2(100) NOT NULL,
	Health_Insurance_Id VARCHAR(14),
	CONSTRAINT Pk_Patients PRIMARY KEY ( Patient_Id ),
	CONSTRAINT U_Patient UNIQUE(Patient_Name, Patient_Address)
);

/*==============================================================*/
/* 7. Table: ANAMNESIS  (Ho so benh an)                         */
/*==============================================================*/
CREATE TABLE Anamnesis (
	Anamnesis_Id      INTEGER NOT NULL,
	Patient_Id        INTEGER NOT NULL,
	Exam_Date         TIMESTAMP DEFAULT Current_Timestamp NOT NULL,
	Coordinator_Id    INTEGER NOT NULL, -- Nhan vien dieu phoi
	Resp_Doctor_Id    INTEGER NOT NULL, -- Bac si chiu trach nhiem dieu tri
	Disease_Symptoms  NVARCHAR2(256) NOT NULL, -- Trieu chung benh
	Diagnosis         NVARCHAR2(256), -- Chan doan cua bac si dieu tri
	Re_Exam_Date      TIMESTAMP,
	Note              NVARCHAR2(256),
	CONSTRAINT Pk_Anamnesis PRIMARY KEY ( Anamnesis_Id ),
	CONSTRAINT U_Anamnesis UNIQUE ( Patient_Id, Exam_Date )
);

/*==============================================================*/
/* 8. Table: SERVICES (Dich vu kham benh)                       */
/*==============================================================*/
CREATE TABLE Services (
	Service_Id    INTEGER NOT NULL,
	Service_Name  NVARCHAR2(50) NOT NULL,
	Service_Cost  INTEGER NOT NULL,
	Service_Desc  NVARCHAR2(256),
	CONSTRAINT Pk_Services PRIMARY KEY ( Service_Id ),
	CONSTRAINT Ck_Services_Cost CHECK ( Service_Cost >= 0 )
);

/*==============================================================*/
/* 9. Table: Health_Exams (Kiem tra suc khoe)                   */
/*==============================================================*/
CREATE TABLE Health_Exams (
	Exam_Id       INTEGER NOT NULL,
	Anamnesis_Id  INTEGER NOT NULL,
	Service_Id    INTEGER NOT NULL,
	Doctor_Id     INTEGER NOT NULL, -- Bac si kham dich vu
	Dep_Id        INTEGER NOT NULL, -- Phong kham
	Exam_Date     TIMESTAMP DEFAULT Current_Timestamp NOT NULL,
	Exam_Result   NVARCHAR2(256),
	CONSTRAINT Pk_Health_Exams PRIMARY KEY ( Exam_Id ),
	CONSTRAINT U_Health_Exams UNIQUE ( Anamnesis_Id, Service_Id )
);

/*==============================================================*/
/* 10. Table: PRESCRIPTIONS (Don thuoc)                         */
/*==============================================================*/
CREATE TABLE Prescriptions (
	Pres_Id           INTEGER NOT NULL,
	Anamnesis_Id      INTEGER NOT NULL,
	Medicine_Id       INTEGER NOT NULL,
	Amount            INTEGER NOT NULL,
	Quantity_Per_Day  INTEGER NOT NULL,
	Note              NVARCHAR2(256),
	CONSTRAINT Pk_Prescriptions PRIMARY KEY ( Pres_Id ),
	CONSTRAINT Un_Prescriptions UNIQUE ( Anamnesis_Id, Medicine_Id )
);

/*==============================================================*/
/* 11. Table: INVOICES                                          */
/*==============================================================*/
CREATE TABLE Invoices (
	Anamnesis_Id  INTEGER NOT NULL,
	Total_Price   INTEGER NOT NULL,
	CONSTRAINT Pk_Invoices PRIMARY KEY ( Anamnesis_Id )
);

/* --------------- TAO RANG BUOC CAC KHOA NGOAI --------------- */
ALTER TABLE Employees
	ADD CONSTRAINT Fk_Employees_Unit_Works FOREIGN KEY ( Unit_Id )
		REFERENCES Unit_Works ( Unit_Id );
		
ALTER TABLE Shifts
	ADD CONSTRAINT Fk_Shifts_Employees FOREIGN KEY ( Emp_Id )
		REFERENCES Employees ( Emp_Id );
		
ALTER TABLE Shifts
	ADD CONSTRAINT Fk_Shifts_Departments FOREIGN KEY ( Dep_Id )
		REFERENCES Departments ( Dep_Id );

ALTER TABLE Anamnesis
	ADD CONSTRAINT Fk_Anamnesis_Patients FOREIGN KEY ( Patient_Id )
		REFERENCES Patients ( Patient_Id );

ALTER TABLE Anamnesis
	ADD CONSTRAINT Fk_Anamnesis_Coordinator FOREIGN KEY ( Coordinator_Id )
		REFERENCES Employees ( Emp_Id );

ALTER TABLE Anamnesis
	ADD CONSTRAINT Fk_Ana_Resp_Doctor FOREIGN KEY ( Resp_Doctor_Id )
		REFERENCES Employees ( Emp_Id );

ALTER TABLE Health_Exams
	ADD CONSTRAINT Fk_Exam_Anamnesis FOREIGN KEY ( Anamnesis_Id )
		REFERENCES Anamnesis ( Anamnesis_Id );

ALTER TABLE Health_Exams
	ADD CONSTRAINT Fk_Exam_Services FOREIGN KEY ( Service_Id )
		REFERENCES Services ( Service_Id );

ALTER TABLE Health_Exams
	ADD CONSTRAINT Fk_Exam_Doctor FOREIGN KEY ( Doctor_Id )
		REFERENCES Employees ( Emp_Id );

ALTER TABLE Prescriptions
	ADD CONSTRAINT Fk_Pre_Medicine FOREIGN KEY ( Medicine_Id )
		REFERENCES Medicines ( Medicine_Id );

ALTER TABLE Prescriptions
	ADD CONSTRAINT Fk_Pre_Anamnesis FOREIGN KEY ( Anamnesis_Id )
		REFERENCES Anamnesis ( Anamnesis_Id );

ALTER TABLE Invoices
	ADD CONSTRAINT Fk_Inviuces_Anamnesi FOREIGN KEY ( Anamnesis_Id )
		REFERENCES Anamnesis ( Anamnesis_Id );
      
/* --------------- TANG ID TU DONG  --------------- */
-- Tao Sequence
CREATE SEQUENCE AUTO_INCREMENT_SEQUENCE
START WITH 1
INCREMENT BY 1;

-- Tao Trigger TABLE ANAMNESIS
CREATE OR REPLACE TRIGGER Trg_Ana_Auto_Incr BEFORE
	INSERT ON Anamnesis
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Anamnesis_Id
	FROM
		Dual;
END;

-- Tao Trigger TABLE DEPARTMENT
CREATE OR REPLACE TRIGGER Trg_Dep_Auto_Incr BEFORE
	INSERT ON Departments
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Dep_Id
	FROM
		Dual;
END;

--- Tao Trigger UNIT_WORKS
CREATE OR REPLACE TRIGGER TRG_UNIT_WORK_AUTO_INCR BEFORE
	INSERT ON Unit_Works
	REFERENCING
		NEW AS New
FOR EACH ROW BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Unit_Id
	FROM
		Dual;
END;

--- Tao Trigger EMPLOYEES
CREATE OR REPLACE TRIGGER Trg_Emp_Auto_Incr BEFORE
	INSERT ON Employees
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Emp_Id
	FROM
		Dual;
END;

--- Tao Trigger HEALTH_EXAMS
CREATE OR REPLACE TRIGGER Trg_Health_Auto_Incr BEFORE
	INSERT ON Health_Exams
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Exam_Id
	FROM
		Dual;

END;

--- Tao Trigger MEDICINES
CREATE OR REPLACE TRIGGER Trg_Medicines_Auto_Incr BEFORE
	INSERT ON Medicines
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Medicine_Id
	FROM
		Dual;
END;

--- Tao Trigger PATIENTS
CREATE OR REPLACE TRIGGER Trg_Patients_Auto_Incr BEFORE
	INSERT ON Patients
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Patient_Id
	FROM
		Dual;

END;

--- Tao Trigger SERVICES
CREATE OR REPLACE TRIGGER Trg_Services_Auto_Incr BEFORE
	INSERT ON Services
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Service_Id
	FROM
		Dual;
END;

--- Tao Trigger PRESCRIPTIONS
CREATE OR REPLACE TRIGGER Trg_Pres_Auto_Incr BEFORE
	INSERT ON Prescriptions
	REFERENCING
		NEW AS New
	FOR EACH ROW
BEGIN
	SELECT
		Auto_Increment_Sequence.NEXTVAL
	INTO :New.Pres_Id
	FROM
		Dual;

END;

--- Tao Trigger SHIFTS
CREATE OR REPLACE TRIGGER TRG_SHIFTS_AUTO_INCR
BEFORE INSERT ON
SHIFTS
REFERENCING NEW AS NEW
    FOR EACH ROW BEGIN SELECT
    AUTO_INCREMENT_SEQUENCE.NEXTVAL INTO :NEW.Shift_Id
    FROM DUAL;
END;
