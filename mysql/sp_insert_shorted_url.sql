DELIMITER $$

CREATE PROCEDURE sp_insert_shorted_url (
    IN  p_c_id CHAR(10),
    IN  p_s_url CHAR(150),
    IN  p_f_expire DATETIME,
    OUT p_status VARCHAR(255),
    OUT p_error_code INT
)
BEGIN
    DECLARE v_sqlstate CHAR(5);
    DECLARE v_message TEXT;

    -- Handler para cualquier error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener info del error
        GET DIAGNOSTICS CONDITION 1
            v_sqlstate = RETURNED_SQLSTATE,
            p_error_code = MYSQL_ERRNO,
            v_message = MESSAGE_TEXT;

        ROLLBACK;

        IF p_error_code = 1062 THEN
            SET p_status = 'ERROR: El c_id ya existe.';
        ELSE
            SET p_status = CONCAT('ERROR: ', v_message);
        END IF;
    END;

    -- Ejecución normal
    START TRANSACTION;

    INSERT INTO shorted_url (c_id, s_url, f_created, f_expire)
    VALUES (p_c_id, p_s_url, NOW(), p_f_expire);

    COMMIT;

    -- Todo OK
    SET p_status = 'SUCCESS';
    SET p_error_code = 0;

END $$

DELIMITER ;
