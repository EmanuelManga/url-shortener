-- Table structure for table `shorted_url`

CREATE TABLE shorted_url (
    c_id CHAR(10) NOT NULL,
    s_url CHAR(150) NOT NULL,
    f_created DATETIME NOT NULL,
    f_expire DATETIME NOT NULL,
    PRIMARY KEY (c_id)
);



-- Indexes for table `shorted_url` 

CREATE INDEX idx_c_id ON shorted_url (c_id);
CREATE INDEX idx_f_expire ON shorted_url (f_expire);


-- Create event to delete expired shortened URLs every minute

CREATE EVENT ev_borrar_shortened_expirados
ON SCHEDULE EVERY 1 MINUTE
DO
    DELETE FROM shorted_url
    WHERE f_expire < NOW();


-- Enable the event scheduler 

SET GLOBAL event_scheduler = ON;
