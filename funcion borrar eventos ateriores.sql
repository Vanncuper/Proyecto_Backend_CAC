DELIMITER //
CREATE FUNCTION EliminarFilasAnterioresHoy()
RETURNS INT
BEGIN
    DECLARE rows_affected INT;
    SET rows_affected = 0;

    DELETE FROM evento
    WHERE fecha < CURDATE();

    SET rows_affected = ROW_COUNT();
    RETURN rows_affected;
END //
DELIMITER ;