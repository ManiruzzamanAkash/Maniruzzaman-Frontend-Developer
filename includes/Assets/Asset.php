<?php

namespace Akash\BsfSpacex\Assets;

defined( 'ABSPATH' ) || exit;

/**
 * Asset Manager class.
 */
class Asset {

    /**
     * Constructor.
     *
     * @since 0.0.1
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_all_scripts' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
    }

    /**
     * Register scripts.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function register_all_scripts(): void {
        $this->register_styles( $this->get_styles() );
        $this->register_scripts( $this->get_scripts() );
    }

    /**
     * Register styles.
     *
     * @since 0.0.1
     *
     * @param array $styles
     * @return void
     */
    public function register_styles( array $styles ): void {
        foreach ( $styles as $handle => $style ) {
            wp_register_style( $handle, $style['src'], $style['deps'], $style['version'] );
        }
    }

    /**
     * Register scripts.
     *
     * @since 0.0.1
     *
     * @param array $scripts
     * @return void
     */
    public function register_scripts( array $scripts ): void {
        foreach ( $scripts as $handle =>$script ) {
            wp_register_script( $handle, $script['src'], $script['deps'], $script['version'], $script['in_footer'] );
        }
    }

    /**
     * Get all styles.
     *
     * @since 0.0.1
     *
     * @return array
     */
    public function get_styles(): array {
        return [
            'bsf-spacex-admin' => [
                'src'     => BSF_SPACEX_BUILD . '/index.css',
                'version' => BSF_SPACEX_VERSION,
                'deps'    => [],
            ],
            'bsf-spacex-css' => [
                'src'     => BSF_SPACEX_ASSETS . '/css/main.css',
                'version' => BSF_SPACEX_VERSION,
                'deps'    => [],
            ],
        ];
    }

    /**
     * Get all scripts.
     *
     * @since 0.0.1
     *
     * @return array
     */
    public function get_scripts(): array {
        $dependency = require_once BSF_SPACEX_DIR . '/build/index.asset.php';

        return [
            'bsf-spacex-admin' => [
                'src'       => BSF_SPACEX_BUILD . '/index.js',
                'version'   => $dependency['version'],
                'deps'      => $dependency['dependencies'],
                'in_footer' => true,
            ],
        ];
    }

    /**
     * Enqueue assets.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function enqueue_assets(): void {
        wp_enqueue_style( 'bsf-spacex-css' );
    }

    /**
     * Enqueue assets.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function enqueue_admin_assets(): void {
        wp_enqueue_style( 'bsf-spacex-admin' );
        wp_enqueue_script( 'bsf-spacex-admin' );
    }
}
