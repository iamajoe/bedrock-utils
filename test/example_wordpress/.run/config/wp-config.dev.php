<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'examplewp');

/** MySQL database username */
define('DB_USER', 'examplewp');

/** MySQL database password */
define('DB_PASSWORD', 'p3QxMMBmYrn43pHU');

/** MySQL hostname */
define('DB_HOST', '172.17.0.2');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

#define('WP_HOME','http://napolilaw.com');
#define('WP_SITEURL','http://napolilaw.com');
/**
 * BFM
 * DEV or LIVE
 * LIVE disables console logging and enables Google Analitycs
 */
define('BFM_ENV', 'DEV');
define('WP_AUTO_UPDATE_CORE', false);

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'wb+H~s7}H-W]HM3E#>d/U+`#*_huqbsDE-vDY}1$-=V_{H]0WeMndi|TAj]1:&-Z');
define('SECURE_AUTH_KEY',  'q|+1NBKG>l[pnlpc|ceKuu~~^qd-0Bd(Fo%_hfs~F-/A bXrdNE %;ZD)5+:f4jV');
define('LOGGED_IN_KEY',    '|(6HpIqk![|fV(^hb(,#C/X!NPKbAeqM9skxQ_D[f7:e4`aQk~+IzW-lv/bhhqBa');
define('NONCE_KEY',        '73UDS|_K5&Cpe^SFyG*}_Re,#Eow)=@!pN^,t;K8C,.pex:J&WK}[r0s+,~r7Ib2');
define('AUTH_SALT',        '!dz[OWvf94%-S/<{buFpTT)Ex*eIC>!+|,ZF%<8bRZ4~ o1P%4uu$E.qN3Kv?+e9');
define('SECURE_AUTH_SALT', 'J]k<sHWmzO+%/Cm7,]jE*?9}b0YU]EEZ3uP*8a$rW-TQ%+D|Ag|o-t/~rF|H7g7N');
define('LOGGED_IN_SALT',   '&`(y3c,0F0~Jx.6xR;sd_ZqFQwU~=<#(PBa+aqlfvZu%UI:md@b(IpA-`lLJl}+D');
define('NONCE_SALT',       '90%V}5G{T|8wU(GZx|Da^z%UNSGg`{Q%Ij3a]SO`pZInQ$eQpsfBKSMmYL-/I=@+');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
define('WP_AUTO_UPDATE_CORE', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
