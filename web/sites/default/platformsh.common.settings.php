<?php

/**
 * @file
 * Platform.sh settings shared between environments.
 */

use \Drupal\Core\Installer\InstallerKernel;

// Configure the database.
if (isset($_ENV['PLATFORM_RELATIONSHIPS'])) {
  $relationships = json_decode(base64_decode($_ENV['PLATFORM_RELATIONSHIPS']), TRUE);

  if (empty($databases['default']['default']) && !empty($relationships['database'])) {
    foreach ($relationships['database'] as $endpoint) {
      $database = [
        'driver' => $endpoint['scheme'],
        'database' => $endpoint['path'],
        'username' => $endpoint['username'],
        'password' => $endpoint['password'],
        'host' => $endpoint['host'],
        'port' => $endpoint['port'],
      ];

      if (!empty($endpoint['query']['compression'])) {
        $database['pdo'][PDO::MYSQL_ATTR_COMPRESS] = TRUE;
      }

      if (!empty($endpoint['query']['is_master'])) {
        $databases['default']['default'] = $database;
      }
      else {
        $databases['default']['slave'][] = $database;
      }
    }
  }

  // Import solr-configuration from platform if available.
  if (!empty($relationships['solr'][0])) {
    // Edit this value to use the the machine name of the Solr server in Drupal
    // if you are using a different server than the default one automatically
    // created by the module Search API Solr, which is named
    // 'default_solr_server'.
    $solr_server_name = 'solr';
    $solr = $relationships['solr'][0];
    // Gets the name of the Solr core from the Platform.sh relationship. Uses
    // 'collection1' if empty to conform with the default Solr service single
    // core configuration for versions lower than 6.x.
    $core = substr($solr['path'], 5) ?: 'collection1';
    $config['search_api.server.' . $solr_server_name]['backend_config']['connector_config']['core'] = $core;
    // The path is always 'solr'.
    $config['search_api.server.' . $solr_server_name]['backend_config']['connector_config']['path'] = '/';
    // Gets the host and port from the values returned from the relationship.
    $config['search_api.server.' . $solr_server_name]['backend_config']['connector_config']['host'] = $solr['host'];
    $config['search_api.server.' . $solr_server_name]['backend_config']['connector_config']['port'] = $solr['port'];
    // Solr at Platform.sh is a bit slow, so increase the timeout to prevent
    // errors during indexing.
    $config['search_api.server.' . $solr_server_name]['backend_config']['connector_config']['index_timeout'] = 20;
  }
}

// Redis configuration.
if (!empty($_ENV['PLATFORM_RELATIONSHIPS'])) {
  $relationships = json_decode(base64_decode($_ENV['PLATFORM_RELATIONSHIPS']), TRUE);

  if (!empty($relationships['redis'][0]) && !InstallerKernel::installationAttempted() && extension_loaded('redis')) {
    $redis = $relationships['redis'][0];

    // Set Redis as the default backend for any cache bin not otherwise
    // specified.
    $settings['cache']['default'] = 'cache.backend.redis';
    $settings['redis.connection']['host'] = $redis['host'];
    $settings['redis.connection']['port'] = $redis['port'];

    // Apply changes to the container configuration to better leverage Redis.
    // This includes using Redis for the lock and flood control systems, as well
    // as the cache tag checksum. Alternatively, copy the contents of that file
    // to your project-specific services.yml file, modify as appropriate, and
    // remove this line.
    $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';

    // Allow the services to work before the Redis module itself is enabled.
    $settings['container_yamls'][] = 'modules/contrib/redis/redis.services.yml';

    // Manually add the classloader path, this is required for the container
    // cache bin definition below and allows to use it without the redis module
    // being enabled.
    $class_loader->addPsr4('Drupal\\redis\\', 'modules/contrib/redis/src');

    // Use redis for container cache.
    // The container cache is used to load the container definition itself, and
    // thus any configuration stored in the container itself is not available
    // yet. These lines force the container cache to use Redis rather than the
    // default SQL cache.
    $settings['bootstrap_container_definition'] = [
      'parameters' => [],
      'services' => [
        'redis.factory' => [
          'class' => 'Drupal\redis\ClientFactory',
        ],
        'cache.backend.redis' => [
          'class' => 'Drupal\redis\Cache\CacheBackendFactory',
          'arguments' => [
            '@redis.factory',
            '@cache_tags_provider.container',
            '@serialization.phpserialize',
          ],
        ],
        'cache.container' => [
          'class' => '\Drupal\redis\Cache\PhpRedis',
          'factory' => ['@cache.backend.redis', 'get'],
          'arguments' => ['container'],
        ],
        'cache_tags_provider.container' => [
          'class' => 'Drupal\redis\Cache\RedisCacheTagsChecksum',
          'arguments' => ['@redis.factory'],
        ],
        'serialization.phpserialize' => [
          'class' => 'Drupal\Component\Serialization\PhpSerialize',
        ],
      ],
    ];
  }
}

// Configure private and temporary file paths.
if (isset($_ENV['PLATFORM_APP_DIR'])) {
  if (!isset($settings['file_private_path'])) {
    $settings['file_private_path'] = $_ENV['PLATFORM_APP_DIR'] . '/private';
  }
  if (!isset($settings['file_temp_path'])) {
    $settings['file_temp_path'] = $_ENV['PLATFORM_APP_DIR'] . '/tmp';
  }
}

// Set trusted hosts based on Platform.sh routes.
if (isset($_ENV['PLATFORM_ROUTES']) && !isset($settings['trusted_host_patterns'])) {
  $routes = json_decode(base64_decode($_ENV['PLATFORM_ROUTES']), TRUE);
  $settings['trusted_host_patterns'] = [];
  foreach ($routes as $url => $route) {
    $host = parse_url($url, PHP_URL_HOST);
    if ($host !== FALSE && $route['type'] == 'upstream' && $route['upstream'] == $_ENV['PLATFORM_APPLICATION_NAME']) {
      $settings['trusted_host_patterns'][] = '^' . preg_quote($host) . '$';
    }
  }
  $settings['trusted_host_patterns'] = array_unique($settings['trusted_host_patterns']);
}

// Set config directory.
$settings['config_sync_directory'] = $_ENV['PLATFORM_APP_DIR'] . '/configuration/drupal';

// Set hash salt, used for transient hashes (eg. the reset-user token).
$settings['hash_salt'] = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
