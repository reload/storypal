<?php

/**
 * @file
 * Storypal settings.
 */

// Ensure default variables exists, see the stock default.settings.php for
// documentation.
$databases = array();
$config_directories = array();
$settings['hash_salt'] = 'w6m-3vrOAft80biP4SRDqga9Qjq-YaQR5BG-cDlTmrJ0LI5PhfIFhNd87Gr9v0bnnP0UHkIDTw';
$settings['update_free_access'] = FALSE;

// Import common configuration.
require __DIR__ . '/common.settings.php';

// Then detect the environment.
if (file_exists('/.dockerenv')) {
  // Docker.
  require __DIR__ . '/docker.settings.php';
}
elseif (!empty($_ENV['PLATFORM_ENVIRONMENT'])) {
  // Platform.sh environment.
  //
  // Start off with the common platform configuration.
  require __DIR__ . '/platformsh.common.settings.php';

  // Include any environment-specific configurations.
  if (!empty($_ENV['PLATFORM_BRANCH'])) {
    // Then include any environment-specific files.
    $environment_name = $_ENV['PLATFORM_BRANCH'];
    $env_settings_file = __DIR__ . '/platformsh.env.' . $environment_name . '.settings.php';
    if (file_exists($env_settings_file)) {
      require $env_settings_file;
    }
  }

  // Then let platform import its variables which might override our
  // settings on an environment basis.
  require __DIR__ . '/platformsh.variables.php';
}
else {
  die("Unable to detect which environment-configuration to bootstrap.");
}

// Allow for temporary local overrides.
if (file_exists(__DIR__ . '/settings.local.php')) {
  require __DIR__ . '/settings.local.php';
}
