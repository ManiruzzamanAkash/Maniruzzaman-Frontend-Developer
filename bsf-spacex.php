<?php

/**
 * Plugin Name:       BSF-Spacex Tests
 * Description:       WordPress plugin for Fullstack WordPress Development test
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Version:           0.0.1
 * Tested upto:       6.1.1
 * Author:            Maniruzzaman Akash<manirujjamanakash@gmail.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bsf-spacex
 */

defined( 'ABSPATH' ) || exit;

/**
 * Bsf_Spacex class.
 *
 * @class The class that holds the entire Bsf_Spacex plugin
 */
final class Bsf_Spacex {
    /**
     * Plugin version.
     *
     * @var string
     */
    const VERSION = '0.1.0';

    /**
     * Plugin slug.
     *
     * @var string
     *
     * @since 0.1.0
     */
    const SLUG = 'bsf-spacex';

    /**
     * Holds various class instances.
     *
     * @var array
     *
     * @since 0.1.0
     */
    private array $container = [];

    /**
     * Constructor for the Bsf_Spacex class.
     *
     * Sets up all the appropriate hooks and actions within our plugin.
     *
     * @since 0.1.0
     */
    private function __construct() {
        require_once __DIR__ . '/vendor/autoload.php';

        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

        add_action( 'wp_loaded', [ $this, 'flush_rewrite_rules' ] );
        $this->init_plugin();
    }

    /**
     * Initializes the Bsf_Spacex() class.
     *
     * Checks for an existing Bsf_Spacex() instance
     * and if it doesn't find one, creates it.
     *
     * @since 0.1.0
     *
     * @return Bsf_Spacex|bool
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new Bsf_Spacex();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @since 0.1.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @since 0.1.0
     *
     * @param $prop
     *
     * @return bool
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function define_constants(): void {
        define( 'BSF_SPACEX_VERSION', self::VERSION );
        define( 'BSF_SPACEX_SLUG', self::SLUG );
        define( 'BSF_SPACEX_FILE', __FILE__ );
        define( 'BSF_SPACEX_DIR', __DIR__ );
        define( 'BSF_SPACEX_PATH', dirname( BSF_SPACEX_FILE ) );
        define( 'BSF_SPACEX_INCLUDES', BSF_SPACEX_PATH . '/includes' );
        define( 'BSF_SPACEX_TEMPLATE_PATH', BSF_SPACEX_PATH . '/templates' );
        define( 'BSF_SPACEX_URL', plugins_url( '', BSF_SPACEX_FILE ) );
        define( 'BSF_SPACEX_BUILD', BSF_SPACEX_URL . '/build' );
        define( 'BSF_SPACEX_ASSETS', BSF_SPACEX_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugins are loaded.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function init_plugin(): void {
        $this->includes();
        $this->init_hooks();

        /**
         * Fires after the plugin is loaded.
         *
         * @since 0.1.0
         */
        do_action( 'bsf_spacex_loaded' );
    }

    /**
     * Activating the plugin.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function activate(): void {
        // Run the installer to create necessary migrations and seeders.
        $this->install();
    }

    /**
     * Placeholder for deactivation function.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function deactivate(): void {
        //
    }

    /**
     * Flush rewrite rules after plugin is activated.
     *
     * Nothing being added here yet.
     *
     * @since 0.1.0
     */
    public function flush_rewrite_rules(): void {
        // fix rewrite rules
    }

    /**
     * Run the installer to create necessary migrations and seeders.
     *
     * @since 0.1.0
     *
     * @return void
     */
    private function install(): void {
        // Necessary installation logic.
    }

    /**
     * Include the required files.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function includes(): void {
        $this->container['assets'] = new Akash\BsfSpacex\Assets\BlockAsset();
        $this->container['api'] = new Akash\BsfSpacex\REST\Api();
    }

    /**
     * Initialize the hooks.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function init_hooks(): void {
        // Localize our plugin
        add_action( 'init', [ $this, 'localization_setup' ] );
    }

    /**
     * Initialize plugin for localization.
     *
     * @uses load_plugin_textdomain()
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function localization_setup(): void {
        load_plugin_textdomain( 'bsf-spacex', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

        // Load the React-pages translations.
        if ( is_admin() ) {
            // Load wp-script translation for bsf-spacex-app
            wp_set_script_translations( 'bsf-spacex-app', 'bsf-spacex', plugin_dir_path( __FILE__ ) . 'languages/' );
        }
    }

    /**
     * What type of request is this.
     *
     * @since 0.1.0
     *
     * @param string $type admin, ajax, cron or frontend
     *
     * @return bool
     */
    private function is_request( string $type ): bool
    {
        switch ( $type ) {
            case 'admin':
                return is_admin();

            case 'ajax':
                return defined( 'DOING_AJAX' );

            case 'rest':
                return defined( 'REST_REQUEST' );

            case 'cron':
                return defined( 'DOING_CRON' );

            case 'frontend':
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }

        return false;
    }
}

/**
 * Initialize the main plugin.
 *
 * @since 0.1.0
 *
 * @return Bsf_Spacex|bool
 */
function bsf_spacex() {
    return Bsf_Spacex::init();
}

/*
 * Start the plugin.
 *
 * @since 0.1.0
 */
bsf_spacex();
