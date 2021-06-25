----Phan he 1:
-- Tao role SYS_ADMIN
CREATE ROLE SYS_ADMIN;

--GRANT role, priviledges cho SYS_ADMIN
GRANT SELECT ON V_$sga TO SYS_ADMIN;
GRANT SELECT ON Dba_Roles TO SYS_ADMIN;
GRANT SELECT ON Dba_Users TO SYS_ADMIN;
GRANT SELECT ON Dba_Role_Privs TO SYS_ADMIN;
GRANT DROP USER TO SYS_ADMIN WITH ADMIN OPTION;
GRANT CONNECT, RESOURCE, DBA TO SYS_ADMIN WITH ADMIN OPTION;

-- Tao user
CREATE USER ADMIN_BV IDENTIFIED BY 6789;

--GRANT 1 so priviledges cho user
GRANT CREATE SESSION TO ADMIN_BV WITH ADMIN OPTION;
GRANT UNLIMITED TABLESPACE TO ADMIN_BV WITH ADMIN OPTION;

--GRANT SYS_ADMIN cho user de lam admin
GRANT SYS_ADMIN TO ADMIN_BV;

-- DBMS_RLS phai grant quyen THUC THI vi DBMS_RLS khong duoc gan cho moi nguoi dung
GRANT EXECUTE ON DBMS_RLS TO ADMIN_BV; ---CONNECT SYS 
---CAP QUYEN DE ADMIN_BV KHONG BI ANH HUONG BOI POLICY FUNCTION
GRANT EXEMPT ACCESS POLICY TO ADMIN_BV; ---CONNECT SYS 
---Phan he 2:

----Tao cac role trong he thong
CREATE ROLE HR_MANAGER;
CREATE ROLE ACCOUNTING_MANAGER;
CREATE ROLE SPECIALIZE_MANAGER;
CREATE ROLE RECEPTIONIST;
CREATE ROLE FINANCE_STAFF;
CREATE ROLE ACCOUNTING_STAFF;
CREATE ROLE PHARMACIST;
CREATE ROLE DOCTOR;
CREATE ROLE PATIENT;


---Tao user trong he thong
CREATE USER HR_MANAGER01 IDENTIFIED BY HR_MANAGER01;
CREATE USER HR_MANAGER02 IDENTIFIED BY HR_MANAGER02;

CREATE USER ACCOUNTING_MANAGER01 IDENTIFIED BY ACCOUNTING_MANAGER01;
CREATE USER ACCOUNTING_MANAGER02 IDENTIFIED BY ACCOUNTING_MANAGER02;

CREATE USER SPECIALIZE_MANAGER01 IDENTIFIED BY SPECIALIZE_MANAGER01;
CREATE USER SPECIALIZE_MANAGER02 IDENTIFIED BY SPECIALIZE_MANAGER02;

CREATE USER RECEPTIONIST01 IDENTIFIED BY RECEPTIONIST01;
CREATE USER RECEPTIONIST02 IDENTIFIED BY RECEPTIONIST02;

CREATE USER FINANCE_STAFF01 IDENTIFIED BY FINANCE_STAFF01;
CREATE USER FINANCE_STAFF02 IDENTIFIED BY FINANCE_STAFF02;

CREATE USER ACCOUNTING_STAFF01 IDENTIFIED BY ACCOUNTING_STAFF01;
CREATE USER ACCOUNTING_STAFF02 IDENTIFIED BY ACCOUNTING_STAFF02;

CREATE USER PHARMACIST01 IDENTIFIED BY PHARMACIST01;
CREATE USER PHARMACIST02 IDENTIFIED BY PHARMACIST02;

CREATE USER DOCTOR01 IDENTIFIED BY DOCTOR01;
CREATE USER DOCTOR02 IDENTIFIED BY DOCTOR02;
CREATE USER DOCTOR03 IDENTIFIED BY DOCTOR03;

CREATE USER PATIENT01 IDENTIFIED BY PATIENT01;
CREATE USER PATIENT02 IDENTIFIED BY PATIENT02;
CREATE USER PATIENT03 IDENTIFIED BY PATIENT03;
CREATE USER PATIENT04 IDENTIFIED BY PATIENT04;

--GRANT ROLE CHO CAC USER
GRANT HR_MANAGER TO HR_MANAGER01, HR_MANAGER02;
GRANT ACCOUNTING_MANAGER TO ACCOUNTING_MANAGER01,ACCOUNTING_MANAGER02;
GRANT SPECIALIZE_MANAGER TO SPECIALIZE_MANAGER01,SPECIALIZE_MANAGER02;
GRANT RECEPTIONIST TO RECEPTIONIST01,RECEPTIONIST02;
GRANT FINANCE_STAFF TO FINANCE_STAFF01,FINANCE_STAFF02;
GRANT ACCOUNTING_STAFF TO ACCOUNTING_STAFF01,ACCOUNTING_STAFF02;
GRANT PHARMACIST TO PHARMACIST01,PHARMACIST02;
GRANT DOCTOR TO DOCTOR01,DOCTOR02;
GRANT PATIENT TO PATIENT01,PATIENT02,PATIENT03,PATIENT04;

GRANT CREATE SESSION TO HR_MANAGER, ACCOUNTING_MANAGER,  SPECIALIZE_MANAGER, 
RECEPTIONIST, FINANCE_STAFF, ACCOUNTING_STAFF, PHARMACIST, DOCTOR, PATIENT;


--Cai dat cac chinh sach 
----==========================================---------
-----Bang Employees (NHANVIEN)
---==========================================----------
-----DAC + RBAC
--NHAN VIEN QUAN LY HR DUOC THUC HIEN MOI THAO TAC TREN BANG NHAN VIEN
GRANT SELECT,INSERT,DELETE,UPDATE ON EMPLOYEES TO HR_MANAGER;

GRANT SELECT ON EMPLOYEES TO HR_MANAGER, ACCOUNTING_MANAGER,  SPECIALIZE_MANAGER, 
RECEPTIONIST, FINANCE_STAFF, ACCOUNTING_STAFF, PHARMACIST, DOCTOR;
--NHAN VIEN KE TOAN UPDATE DUOC TREN COT Emp_Basic_Salary, Emp_Allowance
GRANT UPDATE(Emp_Basic_Salary, Emp_Allowance) ON EMPLOYEES TO ACCOUNTING_STAFF;
---------------------------------------------------------------------------------
----VPD POLICY
-- DBMS_RLS phai grant quyen THUC THI vi DBMS_RLS khong duoc gan cho moi nguoi dung
GRANT EXECUTE ON DBMS_RLS TO ADMIN_BV; ---CONNECT SYS 
---CAP QUYEN DE ADMIN_BV KHONG BI ANH HUONG BOI POLICY FUNCTION
GRANT EXEMPT ACCESS POLICY TO ADMIN_BV; ---CONNECT SYS

---**) Nhan vien chi xem duoc thong tin ca nhan cua minh
---tru QUAN LY NHAN SU, QUAN LY TAI VU, QUAN LY CHUYEN MON VA NHAN VIEN KE TOAN

--XEM THONG TIN CA NHAN
--TAO 1 PL/SOL FUNCTION
CREATE OR REPLACE FUNCTION VPD_EMPLOYEES (
    P_SCHEMA   IN VARCHAR2 DEFAULT NULL,
    P_OBJECT   IN VARCHAR2 DEFAULT NULL)
    RETURN VARCHAR2
    AS 
    BEGIN
    IF (USER LIKE 'ACCOUNTING_STAFF%' OR USER LIKE 'HR_MANAGER%' OR USER LIKE 'ACCOUNTING_MANAGER%' OR USER LIKE 'SPECIALIZE_MANAGER%') THEN
        RETURN '';
    END IF;
    RETURN 'EMP_ID = USER';
    END;
--DUNG THU TUC ADD_POLICY TRONG package DBMS_RLS
BEGIN
DBMS_RLS.ADD_POLICY 
(OBJECT_SCHEMA   => 'ADMIN_BV',
OBJECT_NAME      => 'EMPLOYEES',
POLICY_NAME      => 'VPD_EMP_POLICY',
POLICY_FUNCTION  => 'VPD_EMPLOYEES',
STATEMENT_TYPES   => 'SELECT');
END;

--Quan ly tai vu va chuyen mon xem thong tin nhan vien 
--nhung khong xem duoc cot Emp_Basic_Salary, Emp_Allowance
--TAO 1 PL/SOL FUNCTION
CREATE OR REPLACE FUNCTION VPD_EMPLOYEES1 (
    P_SCHEMA   IN VARCHAR2 DEFAULT NULL,
    P_OBJECT   IN VARCHAR2 DEFAULT NULL)
    RETURN VARCHAR2
    AS 
    BEGIN
    IF (USER LIKE 'ACCOUNTING_MANAGER%' OR USER LIKE 'SPECIALIZE_MANAGER%') THEN
    RETURN 'EMP_ID = USER';
    END IF;
    RETURN '';
    END;
--DUNG THU TUC ADD_POLICY TRONG package DBMS_RLS
BEGIN
DBMS_RLS.ADD_POLICY 
(OBJECT_SCHEMA   => 'ADMIN_BV',
OBJECT_NAME      => 'EMPLOYEES',
POLICY_NAME      => 'VPD_EMP_POLICY1',
POLICY_FUNCTION  => 'VPD_EMPLOYEES1',
STATEMENT_TYPES   => 'SELECT',
SEC_RELEVANT_COLS  => 'Emp_Basic_Salary, Emp_Allowance',
SEC_RELEVANT_COLS_OPT => DBMS_RLS.ALL_ROWS);
END;

---------===============================================-------
---------Bang Patinent (BENHNHAN)
-------================================================--------
--DAC + RBAC
--Nhan vien tiep tan va dieu phoi xem,them,xoa,sua tren bang benh nhan
GRANT SELECT,INSERT,DELETE,UPDATE ON Patients TO RECEPTIONIST;
--Nhan vien tai vu va bac si xem bang benh nhan
GRANT SELECT ON Patients TO FINANCE_STAFF, DOCTOR, PATIENT;

---VPD POLICY
--Xem thong tin ca nhan: benh nhan
--tru NHAN VIEN TIEP TAN VA DIEU PHOI, NHAN VIEN TAI VU VA BAC SI
---Cai dat chinh sach bao mat voi VPD tren view
---Benh nhan chi xem thong tin ca nhan (VPD tren view)
--TAO 1 PL/SOL FUNCTION
CREATE OR REPLACE FUNCTION VPD_PATIENTS(
    P_SCHEMA   IN VARCHAR2 DEFAULT NULL,
    P_OBJECT   IN VARCHAR2 DEFAULT NULL)
    RETURN VARCHAR2
    AS 
    BEGIN
    IF (USER LIKE 'RECEPTIONIST%' OR USER LIKE 'FINANCE_STAFF%' OR USER LIKE 'DOCTOR%') THEN
    RETURN '';
    END IF;
    RETURN 'PATIENT_ID = USER';
    END;
--DUNG THU TUC ADD_POLICY TRONG package DBMS_RLS
BEGIN
DBMS_RLS.ADD_POLICY 
(OBJECT_SCHEMA   => 'ADMIN_BV',
OBJECT_NAME      => 'PATIENTS',
POLICY_NAME      => 'VPD_PATI_POLICY',
POLICY_FUNCTION  => 'VPD_PATIENTS',
STATEMENT_TYPES   => 'SELECT');
END;

----=====================================-------------
-------Bang Anamnesis (HOSOBENHAN)
----=====================================-------------
----DAC + RBAC
GRANT SELECT ON Anamnesis TO SPECIALIZE_MANAGER,RECEPTIONIST, DOCTOR, PATIENT;
GRANT INSERT(Anamnesis_Id, Patient_Id, Exam_Date, Coordinator_Id, Disease_Symptoms, Resp_Doctor_Id) ON Anamnesis TO RECEPTIONIST;
GRANT UPDATE(Diagnosis, Re_Exam_Date, Note) ON ANAMNESIS TO DOCTOR;

------VPD POLICY
---**) Bac si chi xem duoc nhung ho so benh nhan cua minh dieu tri 
----va BENH NHAN CHI XEM HO SO CUA MINH
---XEM HO SO BENH NHAN
--TAO 1 PL/SOL FUNCTION
CREATE OR REPLACE FUNCTION VPD_ANAMNESIS(
    P_SCHEMA   IN VARCHAR2,
    P_OBJECT   IN VARCHAR2)
    RETURN VARCHAR2
    AS 
    BEGIN
    IF (USER LIKE 'SPECIALIZE_MANAGER%' OR USER LIKE 'RECEPTIONIST%') THEN
    RETURN '';
    END IF;
    RETURN 'Resp_Doctor_Id = USER OR Patient_Id = USER';
    END;
--DUNG THU TUC ADD_POLICY TRONG package DBMS_RLS
BEGIN
DBMS_RLS.ADD_POLICY 
(OBJECT_SCHEMA   => 'ADMIN_BV',
OBJECT_NAME      => 'ANAMNESIS',
POLICY_NAME      => 'VPD_ANA_POLICY',
POLICY_FUNCTION  => 'VPD_ANAMNESIS');
END;
-------==========================================
--------Bang Departments (PHONGKHAM)
------============================================
---DAC + RBAC
GRANT SELECT ON Departments TO HR_MANAGER, ACCOUNTING_MANAGER, SPECIALIZE_MANAGER;
GRANT INSERT, DELETE, UPDATE ON Departments TO HR_MANAGER;

-------==========================================
--------Bang Unit_Works (DONVILAMVIEC)
-------==========================================
---DAC + RBAC
---Quan ly nhan su xem,them, xoa, sua tren bang don vi lam viec
GRANT SELECT, INSERT, DELETE, UPDATE ON UNIT_WORKS TO HR_MANAGER;

----VIEW 
---Nhan vien chi xem don vi lam viec cua minh
CREATE OR REPLACE VIEW VIEW_UNIT_WORK
AS
SELECT UW.UNIT_ID, UW.UNIT_NAME FROM Unit_Works UW, Employees Emp
WHERE UW.UNIT_ID = Emp.Unit_Id AND EMP_ID = USER;

GRANT SELECT ON VIEW_UNIT_WORK TO HR_MANAGER, ACCOUNTING_MANAGER,  SPECIALIZE_MANAGER, 
RECEPTIONIST, FINANCE_STAFF, ACCOUNTING_STAFF, PHARMACIST, DOCTOR;

-------==========================================
--------Bang Shifts (CALAMVIEC)
-------==========================================
---DAC + RBAC
--Quan ly nhan su xem,them,xoa,sua bang Shifts
GRANT SELECT, INSERT, DELETE, UPDATE ON SHIFTS TO HR_MANAGER;
GRANT SELECT ON SHIFTS TO ACCOUNTING_MANAGER,  SPECIALIZE_MANAGER, 
RECEPTIONIST, FINANCE_STAFF, ACCOUNTING_STAFF, PHARMACIST, DOCTOR;

---VPD POLICY
---Nhan vien chi xem ca lam viec cua minh
CREATE OR REPLACE FUNCTION VPD_SHIFTS (
    P_SCHEMA   IN VARCHAR2 DEFAULT NULL,
    P_OBJECT   IN VARCHAR2 DEFAULT NULL)
    RETURN VARCHAR2
    AS 
    BEGIN
    IF (USER LIKE 'HR_MANAGER%') THEN
    RETURN '';
    END IF;
    RETURN 'Emp_Id = USER' ;
    END;
--DUNG THU TUC ADD_POLICY TRONG package DBMS_RLS
BEGIN
DBMS_RLS.ADD_POLICY 
(OBJECT_SCHEMA   => 'ADMIN_BV',
OBJECT_NAME      => 'SHIFTS',
POLICY_NAME      => 'VPD_SHIFT_POLICY',
POLICY_FUNCTION  => 'VPD_SHIFTS');
END;

-------==========================================
-------Bang Prescriptions (TOATHUOC)
-------==========================================
---DAC + RBAC
--Quan lý chuyen mon va nhan vien ban thuoc co the xem 
GRANT SELECT ON Prescriptions TO SPECIALIZE_MANAGER,PHARMACIST;
GRANT INSERT, UPDATE ON Prescriptions TO DOCTOR; 

---VIEW
---BAC SI chi xem toa thuoc da ke 
CREATE OR REPLACE VIEW VIEW_PRES
AS
SELECT PRES.PRES_ID,PRES.ANAMNESIS_ID,PRES.MEDICINE_ID,PRES.AMOUNT,PRES.QUANTITY_PER_DAY,PRES.NOTE 
FROM Prescriptions PRES, Anamnesis ANA
WHERE SYS_CONTEXT('userenv','session_user') = ANA.Resp_Doctor_Id
AND PRES.Anamnesis_Id  = ANA.Anamnesis_Id;

GRANT SELECT,UPDATE,INSERT ON VIEW_PRES TO DOCTOR;

--Benh nhan chi xem toa thuoc cua minh
CREATE OR REPLACE VIEW VIEW_PRES1
AS
SELECT PRES.PRES_ID,PRES.ANAMNESIS_ID,PRES.MEDICINE_ID,PRES.AMOUNT,PRES.QUANTITY_PER_DAY,PRES.NOTE 
FROM Prescriptions PRES, Anamnesis ANA
WHERE SYS_CONTEXT('userenv','session_user') = ANA.Patient_Id
AND PRES.Anamnesis_Id  = ANA.Anamnesis_Id;

GRANT SELECT ON VIEW_PRES1 TO PATIENT;

-------==========================================
-------Bang Medicines (THUOC)
-------==========================================
---DAC + RBAC
GRANT SELECT, INSERT, DELETE, UPDATE ON Medicines TO ACCOUNTING_MANAGER;
GRANT SELECT ON Medicines TO DOCTOR,PHARMACIST,FINANCE_STAFF;

-------==========================================
-------Bang Health_Exams (CHITIETKHAMSK)
-------==========================================
---DAC + RBAC
GRANT SELECT ON Health_Exams TO SPECIALIZE_MANAGER;
GRANT SELECT ON Health_Exams TO RECEPTIONIST, DOCTOR;
GRANT INSERT(Exam_Id,Anamnesis_Id,Service_Id,Doctor_Id,Dep_Id,Exam_Date) ON Health_Exams TO RECEPTIONIST;
GRANT UPDATE(Exam_Id,Anamnesis_Id,Service_Id,Doctor_Id,Dep_Id) ON Health_Exams TO RECEPTIONIST;
GRANT UPDATE(Exam_Result) ON Health_Exams TO DOCTOR;

---VPD POLICY
--Xem chi tiet kham cua minh phu trach CUA BAC SI
CREATE OR REPLACE FUNCTION VPD_HEALTH_EXAM (
    P_SCHEMA   IN VARCHAR2 DEFAULT NULL,
    P_OBJECT   IN VARCHAR2 DEFAULT NULL)
    RETURN VARCHAR2
    AS 
    BEGIN
    IF (USER LIKE 'SPECIALIZE_MANAGER%' OR USER LIKE 'RECEPTIONIST%' OR USER LIKE 'FINANCE_STAFF%' OR USER LIKE 'PATIENT%') THEN
    RETURN '';
    END IF;
        RETURN 'Doctor_Id = USER' ;
    END;
--DUNG THU TUC ADD_POLICY TRONG package DBMS_RLS
BEGIN
DBMS_RLS.ADD_POLICY 
(OBJECT_SCHEMA   => 'ADMIN_BV',
OBJECT_NAME      => 'Health_Exams',
POLICY_NAME      => 'VPD_HEALTH_POLICY',
POLICY_FUNCTION  => 'VPD_HEALTH_EXAM',
STATEMENT_TYPES  => 'SELECT,UPDATE',
UPDATE_CHECK     => TRUE);
END;

---VIEW
--NV TAI VU CHI XEM Anamnesis_Id, Service_Id
CREATE OR REPLACE VIEW VIEW_HEALTH_EXAM
AS
SELECT Anamnesis_Id, Service_Id FROM Health_Exams;

GRANT SELECT ON VIEW_HEALTH_EXAM TO FINANCE_STAFF;

--Benh nhan chi xem chi tiet kham cua minh
CREATE OR REPLACE VIEW VIEW_HEALTH_EXAMS1
AS
SELECT HE.EXAM_ID,HE.ANAMNESIS_ID,HE.SERVICE_ID,HE.DOCTOR_ID,HE.DEP_ID,HE.EXAM_DATE,HE.EXAM_RESULT 
FROM Health_Exams HE, Anamnesis ANA
WHERE SYS_CONTEXT('userenv','session_user') = ANA.Patient_Id
AND ANA.Anamnesis_Id = HE.Anamnesis_Id;

GRANT SELECT ON VIEW_HEALTH_EXAMS1 TO PATIENT;

-------==========================================
---------Bang Services (DICHVU)
-------==========================================
--DAC + RBAC
GRANT SELECT, INSERT, DELETE, UPDATE ON Services TO ACCOUNTING_MANAGER;
GRANT SELECT ON Services TO DOCTOR, PATIENT,FINANCE_STAFF;

-------==========================================
--------Bang Invoices (HOADON)
-------==========================================
---DAC + RBAC
GRANT SELECT, INSERT, DELETE, UPDATE ON Invoices TO ACCOUNTING_MANAGER;
GRANT SELECT ON Invoices TO FINANCE_STAFF;

---VIEW
---Benh nhan chi xem hoa don cua minh
CREATE OR REPLACE VIEW VIEW_INVOICE
AS
SELECT INV.ANAMNESIS_ID,INV.TOTAL_PRICE 
FROM Invoices INV, Anamnesis ANA
WHERE SYS_CONTEXT('userenv','session_user') = ANA.Patient_Id
AND ANA.Anamnesis_Id = INV.Anamnesis_Id;

GRANT SELECT ON VIEW_INVOICE TO PATIENT;

---Chinh sach bao mat voi MAC
---Giam doc benh vien, giam doc HR, truong phong HR, nhan vien HR
---Giam doc benh vien, giam doc tai chinh, truong phong tai chinh, nhan vien ke toan
---1)