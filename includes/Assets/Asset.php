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
        add_action( 'init', [ $this, 'register_scripts' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
    }

    /**
     * Register scripts.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function register_scripts(): void {
        $this->register_styles( $this->get_styles() );
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
     * Get all styles.
     *
     * @since 0.0.1
     *
     * @return array
     */
    public function get_styles(): array {
        return [
            'bsf-spacex-css' => [
                'src'     => BSF_SPACEX_ASSETS . '/css/main.css',
                'version' => BSF_SPACEX_VERSION,
                'deps'    => [],
            ],
        ];
    }
}
