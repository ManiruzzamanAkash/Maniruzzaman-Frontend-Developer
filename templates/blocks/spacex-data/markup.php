<?php

/**
 * Spacex-data block markup
 *
 * @var array $attributes Block attributes.
 * @var string $content Block content.
 * @var WP_Block $block Block instance.
 * @var array $context Block context.
 */

if ( ! is_user_logged_in() ) : ?>
    <div id="bsf-spacex-spacex-data-view-login">
        <p class="login-hint"><?php esc_html_e( 'Please login to view the capsules...', 'bsf-spacex' ); ?></p>
        <?php wp_login_form(); ?>
    </div>
<?php else:
    $search_text_label = $attributes['searchTextLabel'] ?? '';
    $previous_text_label = $attributes['previousTextLabel'] ?? '';
    $next_text_label = $attributes['nextTextLabel'] ?? '';
    $button_color_bg = $attributes['buttonColorBg'] ?? '';
    $button_color_text = $attributes['buttonColorText'] ?? '';
    $button_color_bg_secondary = $attributes['colorBgSecondary'] ?? '';
    $button_color_text_secondary = $attributes['colorTextSecondary'] ?? '';

    wp_enqueue_script( 'bsf-spacex-spacex-data-view-script' );
    ?>
    <div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
        id="bsf-spacex-spacex-data-view"
        data-search-text-label="<?php echo wp_kses_data( $search_text_label ); ?>"
        data-prev-text-label="<?php echo wp_kses_data( $previous_text_label ); ?>"
        data-next-text-label="<?php echo wp_kses_data( $next_text_label ); ?>"
        data-button-color-bg="<?php echo wp_kses_data( $button_color_bg ); ?>"
        data-button-color-text="<?php echo wp_kses_data( $button_color_text ); ?>"
        data-button-color-bg-secondary="<?php echo wp_kses_data( $button_color_bg_secondary ); ?>"
        data-button-color-text-secondary="<?php echo wp_kses_data( $button_color_text_secondary ); ?>"
    >
    </div>
<?php endif; ?>

