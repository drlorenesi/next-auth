-- --------------------------------------------------------------------------------------
-- 1. DATABASE CREATION
-- --------------------------------------------------------------------------------------
-- Note: It's generally best practice to manage the database creation outside the application
-- and only grant table-level privileges, but this script includes it for completeness.

-- CREATE DATABASE IF NOT EXISTS `auth_db`
--     DEFAULT CHARACTER SET utf8mb4
--     COLLATE utf8mb4_unicode_ci;

-- USE `auth_db`;

-- --------------------------------------------------------------------------------------
-- 2. TABLE DEFINITIONS
-- --------------------------------------------------------------------------------------

-- Table: user
-- Tracks core user data. Uses VARCHAR for names/image URLs and TIMESTAMP(3) for logging.
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL, -- New Field
	`lastName` varchar(255) NOT NULL, -- New Field
	`email` varchar(255) NOT NULL UNIQUE,
	`emailVerified` boolean NOT NULL,
	`image` varchar(2048),
	`createdAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	`updatedAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL ON UPDATE CURRENT_TIMESTAMP(3),
	`role` varchar(255) NOT NULL DEFAULT 'user',
	`banned` boolean,
	`banReason` text,
	`banExpires` timestamp(3)
);

-- Table: session
-- Tracks active user sessions. Uses VARCHAR for IP/UserAgent and indexes on FK and expiry.
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
  	-- Foreign Key Constraint with CASCADE delete
	`userId` varchar(36) NOT NULL REFERENCES `user` (`id`) ON DELETE CASCADE,
	`expiresAt` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL UNIQUE,
	`createdAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	`updatedAt` timestamp(3) NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` varchar(1000),
	`impersonatedBy` varchar(255)
);

-- Table: account
-- Stores linked third-party accounts or local password hashes.
CREATE TABLE `account` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
	`accountId` varchar(255) NOT NULL,
  	-- Foreign Key Constraint with CASCADE delete
	`userId` varchar(36) NOT NULL REFERENCES `user` (`id`) ON DELETE CASCADE,
	`providerId` varchar(50) NOT NULL,
	`accessToken` varchar(2048),
	`refreshToken` varchar(2048),
	`idToken` varchar(2048),
	`accessTokenExpiresAt` timestamp(3),
	`refreshTokenExpiresAt` timestamp(3),
	`scope` varchar(512),
	`password` varchar(255), -- Stores a fixed-length hash (e.g., bcrypt/Argon2)
	`createdAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	`updatedAt` timestamp(3) NOT NULL ON UPDATE CURRENT_TIMESTAMP(3)
);

-- Table: verification
-- Stores temporary codes for email verification or password reset (must be fast and indexable).
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
	`identifier` varchar(255) NOT NULL,
	`value` varchar(255) NOT NULL,
	`expiresAt` timestamp(3) NOT NULL,
	`createdAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	`updatedAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3) NOT NULL ON UPDATE CURRENT_TIMESTAMP(3)
);

-- --------------------------------------------------------------------------------------
-- 3. INDEX DEFINITIONS (NON-PRIMARY/NON-UNIQUE)
-- --------------------------------------------------------------------------------------

-- Indexes for 'user' table
-- Index to allow fast sorting/filtering of the user list by creation date
CREATE INDEX user_created_at_idx ON `user` (`createdAt`);


-- Indexes for 'session' table
-- Index on the Foreign Key for fast lookup of a user's sessions
CREATE INDEX session_user_id_idx ON `session` (`userId`);

-- Index for fast cleanup of expired sessions
CREATE INDEX session_expires_at_idx ON `session` (`expiresAt`);


-- Indexes for 'account' table
-- Index on the Foreign Key for fast lookup of a user's linked accounts
CREATE INDEX account_user_id_idx ON `account` (`userId`);

-- Compound UNIQUE index to ensure a provider's account ID is only linked once
CREATE UNIQUE INDEX account_provider_account_idx ON `account` (`providerId`, `accountId`);


-- Indexes for 'verification' table
-- Compound index for fast lookup of a verification record by its target and value
CREATE INDEX verification_identifier_value_idx ON `verification` (`identifier`, `value`);

-- Index for fast cleanup of expired codes
CREATE INDEX verification_expires_at_idx ON `verification` (`expiresAt`);


-- --------------------------------------------------------------------------------------
-- 4. TRIGGERS (update `name` if either `firstName` or `lastName` change)
-- --------------------------------------------------------------------------------------

DELIMITER $$

CREATE TRIGGER `before_user_update_set_name`
BEFORE UPDATE ON `user`
FOR EACH ROW
BEGIN
    -- Check if either firstName or lastName has changed
    IF NEW.firstName <> OLD.firstName OR NEW.lastName <> OLD.lastName THEN
        -- Concatenate and set the new value for the 'name' column
        SET NEW.name = CONCAT(NEW.firstName, ' ', NEW.lastName);
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------------------------------------
-- 5. OTHER QUERYS 
-- --------------------------------------------------------------------------------------