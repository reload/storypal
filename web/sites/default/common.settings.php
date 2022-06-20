<?php

/**
 * @file
 * Common settings.
 */

// Default tracking scripts - can be overwritten in individual environment
// configs. Most notably  platformsh.env.master.settings.php

/**
 * Entity update backup.
 *
 * This is used to inform the entity storage handler that the backup tables as
 * well as the original entity type and field storage definitions should be
 * retained after a successful entity update process.
 */
$settings['entity_update_backup'] = TRUE;

$config['drupal_regression']['enabled'] = TRUE;
