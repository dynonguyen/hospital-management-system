/* --------------- TAO CAC VIEW CAN THIET --------------- */
CREATE OR REPLACE VIEW Employee_Statistic_V
AS
SELECT Drp.granted_Role, COUNT(*)
FROM Employees Emp, Dba_Role_Privs Drp
WHERE Emp.emp_Id = Drp.grantee
GROUP BY Drp.granted_Role;

-- GRANT THE ABOVE VIEW TO HR_MANAGER
GRANT SELECT ON Employee_Statistic_V TO HR_MANAGER;