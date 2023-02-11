<?php

namespace Akash\BsfSpacex\Tests\Block;

use Akash\BsfSpacex\Tests\BaseTest;
use WP_Block_Type_Registry;

class SpacexDataBlockTest extends BaseTest {

	public const BLOCK_NAME = 'bsf-spacex/spacex-data';
	public const BLOCK_CONTENT = '[bsf-spacex/spacex-data]';

	public function test_block_exists() {
		// Check if the block is registered in the WordPress block library
		$block = WP_Block_Type_Registry::get_instance()->get_registered( self::BLOCK_NAME );
		$this->assertInstanceOf( 'WP_Block_Type', $block );
	}

	public function test_block_render() {
		// Check if the block is rendering correctly on the front end
		$post_id = $this->factory->post->create( [ 'post_content' => self::BLOCK_CONTENT ] );
		$post = get_post( $post_id );
		$content = apply_filters( 'the_content', $post->post_content );
		$this->assertNotEmpty( $content );
		$this->assertEquals( $content, "<p>" . self::BLOCK_CONTENT . "</p>\n" );
	}
}
