<?php

/**
 * Spacex-data block markup
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */
?>
<div
    <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
>
    <h2 class="wp-block-wp-react-kit-header_title">
        <?php echo esc_html( $attributes['title'] ); ?>
    </h2>
</div>

