<?php

/**
 * @file
 * Settings-file for Docker development environments.
 */

use Drupal\Component\Assertion\Handle;

// Disabling cache. Comment this line, to simulate prod-like hard cache.
require __DIR__ . '/nocache.settings.php';

$databases['default']['default'] = array(
  'driver' => 'mysql',
  'database' => 'db',
  'username' => 'db',
  'password' => 'db',
  'host' => 'db',
  'prefix' => '',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
);

$settings['hash_salt'] = 'hardcodedsaltshouldneverbeusedoutsidedocker';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = __DIR__ . '/docker.services.yml';

$settings['config_sync_directory'] = __DIR__ . '/../../../configuration/drupal';

// Allow *.docker and *.ngrok.io domains.
$settings['trusted_host_patterns'] = [
  '^.*\.docker$',
  '.*\.ngrok\.io$',
  'localhost',
  '^.*\.local$',
];

// Assertions.
assert_options(ASSERT_ACTIVE, TRUE);
Handle::register();

// Show all error messages, with backtrace information.
$config['system.logging']['error_level'] = 'verbose';

// Allow test modules and themes to be installed.
$settings['extension_discovery_scan_tests'] = TRUE;

// Enable access to rebuild.php.
$settings['rebuild_access'] = TRUE;

// Configure Redis.

// The docker setup uses the Predis interface for communicating with the Redis
// server whereas the Platform.sh environments use the PhpRedis interface (with
// the redis PHP extension). PhpRedis with the extension performs better (see
// i.e. https://medium.com/@akalongman/phpredis-vs-predis-comparison-on-real-production-data-a819b48cbadb)
// but would require use to compile the extension ourselves in the Docker image
// (it cannot be apt installed). So we settle on using the Predis pure PHP
// implementation in the Docker environments for development purposes but use
// the extension on Platform.sh where Platform.sh have been kind enough to
// provide the compiled extension as part of there service.
$settings['redis.connection']['interface'] = 'Predis';
$settings['redis.connection']['host'] = 'redis';
$settings['redis.connection']['port'] = 6379;

$settings['cache']['default'] = 'cache.backend.redis';

// Allow the services to work before the Redis module itself is enabled.
$settings['container_yamls'][] = 'modules/contrib/redis/redis.services.yml';

// Manually add the classloader path, this is required for the container cache bin definition below
// and allows to use it without the redis module being enabled.
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
      'arguments' => ['@redis.factory', '@cache_tags_provider.container', '@serialization.phpserialize'],
    ],
    'cache.container' => [
      'class' => '\Drupal\redis\Cache\Predis',
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

/**
 * Skip file system permissions hardening.
 *
 * The system module will periodically check the permissions of your site's
 * site directory to ensure that it is not writable by the website user. For
 * sites that are managed with a version control system, this can cause problems
 * when files in that directory such as settings.php are updated, because the
 * user pulling in the changes won't have permissions to modify files in the
 * directory.
 */
$settings['skip_permissions_hardening'] = TRUE;

// Set up stage file proxy.
$config['stage_file_proxy.settings']['origin'] = '';
