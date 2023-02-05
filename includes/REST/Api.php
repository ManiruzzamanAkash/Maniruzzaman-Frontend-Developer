<?php

namespace Akash\BsfSpacex\REST;

defined( 'ABSPATH' ) || exit;

/**
 * API Manager class.
 *
 * All API classes would be registered here.
 *
 * @since 0.0.1
 */
class Api {

    /**
     * API controller Class mapping.
     *
     * @since 0.0.1
     *
     * @var array
     */
    protected array $controllers;

    /**
     * Constructor.
     */
    public function __construct() {
        if ( ! class_exists( 'WP_REST_Server' ) ) {
            return;
        }

        // Init REST API routes.
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ), 10 );
    }

    /**
     * Register REST API routes.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function register_rest_routes(): void {
        $this->set_controllers();

        foreach ( $this->controllers as $controller ) {
            $this->$controller = new $controller();
            $this->$controller->register_routes();
        }
    }

    /**
     * Set controllers.
     *
     * @since 0.0.1
     *
     * @return $this
     */
    protected function set_controllers(): self {
        $this->controllers = apply_filters(
            'bsf_spacex_rest_api_class_map',
            [
                \Akash\BsfSpacex\REST\CapsulesController::class,
            ]
        );

        return $this;
    }
}
