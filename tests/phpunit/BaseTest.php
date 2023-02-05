<?php

namespace Akash\BsfSpacex\Tests;

use WP_UnitTestCase_Base;

class BaseTest extends WP_UnitTestCase_Base {

    /**
     * Create a user with a role.
     *
     * @return void
     */
    public function create_and_assign_user_role( string $role ): void {
        $user_id = $this->factory->user->create( array( 'role' => $role ) );

        // Give Permissions
        wp_set_current_user( $user_id );
        wp_set_auth_cookie( $user_id );
    }

    public function test_assign_administrator_user(): void {
        $this->create_and_assign_user_role( 'administrator' );
        $current_user = wp_get_current_user();

        $this->assertEquals( 'administrator', $current_user->roles[0] );
    }
}

