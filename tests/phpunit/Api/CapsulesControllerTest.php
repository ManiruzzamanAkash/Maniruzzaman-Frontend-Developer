<?php

namespace Akash\BsfSpacex\Tests\Api;

use Akash\BsfSpacex\Tests\BaseTest;
use WP_REST_Request;
use WP_REST_Server;

class CapsulesControllerTest extends BaseTest {
    /**
     * Test REST Server
     *
     * @var WP_REST_Server
     */
    protected WP_REST_Server $server;

    /**
     * Namespace.
     *
     * @var string
     */
    protected string $namespace = 'bsf-spacex/v1';

    /**
     * Route base.
     *
     * @var string
     */
    protected string $base = 'capsules';

    /**
     * Setup test environment.
     */
    protected function setUp() : void {
        // Initialize REST Server.
        global $wp_rest_server;

        parent::setUp();

        $this->server = $wp_rest_server = new \WP_REST_Server;
        do_action( 'rest_api_init' );
    }

    public function test_get_items_unauthenticated() {
        $endpoint = '/' . $this->namespace . '/' . $this->base;
        $request = new WP_REST_Request( 'GET', $endpoint );
        $request->set_param( 'limit', 10 );
        $response = $this->server->dispatch( $request );

        $this->assertEquals( 401, $response->get_status() );
    }

    public function test_get_items_unauthorized() {
        // Create a subscriber user.
        $this->create_and_assign_user_role( 'subscriber' );

        $endpoint = '/' . $this->namespace . '/' . $this->base;
        $request = new WP_REST_Request( 'GET', $endpoint );
        $request->set_param( 'limit', 10 );
        $response = $this->server->dispatch( $request );

        $this->assertEquals( 403, $response->get_status() );
    }

    public function test_get_items_by_administrator() {
        // Create an administrator user.
        $this->create_and_assign_user_role( 'administrator' );

        $endpoint = '/' . $this->namespace . '/' . $this->base;
        $request = new WP_REST_Request( 'GET', $endpoint );
        $request->set_param( 'limit', 10 );
        $response = $this->server->dispatch( $request );

        // Check now.
        $this->assertEquals( 200, $response->get_status() );
        $data = $response->get_data();
        $this->assertNotEmpty( $data );
    }
}
