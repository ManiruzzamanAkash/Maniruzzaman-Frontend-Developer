<?php

namespace Akash\BsfSpacex\Tests\Repository;

use Akash\BsfSpacex\Repository\CapsulesRepository;
use Akash\BsfSpacex\Tests\BaseTest;

class CapsuleRepositoryTest extends BaseTest {

    /**
     * Test the constructor method.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function testConstructor() {
        $repository = new CapsulesRepository();

        $this->assertInstanceOf( CapsulesRepository::class, $repository );
        $this->assertEquals( CapsulesRepository::CAPSULE_BASE_URL, $repository->get_api_url() );
        $this->assertIsArray($repository->get_response() );
        $this->assertCount(2, $repository->get_response() );
    }

    /**
     * Test the set_capsule_response method.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function testSetCapsuleResponse() {
        $repository = new CapsulesRepository();
        $response = $repository->set_capsule_response();

        $this->assertInstanceOf(CapsulesRepository::class, $response );
        $this->assertIsArray($response->get_capsules_data() );
        $this->assertIsObject( $response->get_capsules_header() );
    }

    /**
     * Test the get_capsules_data method.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function testGetCapsulesData(): void {
        $data = ( new CapsulesRepository() )
            ->set_capsule_response()
            ->get_capsules_data();

        $this->assertIsArray( $data );
    }

    /**
     * Test the get_capsules_header method.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function testGetCapsulesHeader(): void {
        $headers = ( new CapsulesRepository() )
            ->set_capsule_response()
            ->get_capsules_header();

        $this->assertIsObject( $headers );
    }

    /**
     * Test the set_api_url_by_filtering method.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function testSetApiUrlByFiltering(): void {
        $repository = new CapsulesRepository();

        $filters = [
            'status' => 'retired'
        ];

        $response = $repository->set_api_url_by_filtering( $filters );

        $this->assertInstanceOf( CapsulesRepository::class, $response );
        $this->assertStringContainsString( 'status=retired', $repository->get_api_url() );
    }
}
