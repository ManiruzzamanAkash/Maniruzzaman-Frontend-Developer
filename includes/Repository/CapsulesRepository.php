<?php

namespace Akash\BsfSpacex\Repository;

/**
 * Capsules Repository class.
 *
 * @since 0.0.1
 */
class CapsulesRepository
{
    /**
     * Capsule base URL.
     */
    public const CAPSULE_BASE_URL = 'https://api.spacexdata.com/v3/capsules';

    /**
     * API URL appended with query parameters.
     *
     * @var string
     */
    private string $api_url;

    /**
     * API response with data.
     *
     * @var array
     */
    private array $response;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->api_url = self::CAPSULE_BASE_URL;
        $this->response = [
            'data'    => [],
            'headers' => null,
        ];
    }

    /**
     * Set capsule response data and header.
     *
     * @since 0.0.1
     *
     * @return $this
     */
    public function set_capsule_response() : self {
        // Make the API request
        $response = wp_remote_get( $this->api_url );

        // Check for errors
        if ( is_wp_error( $response ) ) {
            return $this;
        }

        $this->response = [
            'data'    => json_decode( wp_remote_retrieve_body( $response ), true ),
            'headers' => wp_remote_retrieve_headers( $response ),
        ];

        return $this;
    }

    /**
     * Get capsules data.
     *
     * @since 0.0.1
     *
     * @return array $data
     */
    public function get_capsules_data(): array {
        return $this->response['data'];
    }

    /**
     * Get capsules header.
     *
     * @since 0.0.1
     *
     * @return null|object $headers
     */
    public function get_capsules_header(): ?object {
        return $this->response['headers'];
    }

    /**
     * Set API URL with appending filters.
     *
     * @since 0.0.1
     *
     * @param array $filters
     * @return $this
     */
    public function set_api_url_by_filtering( array $filters = [] ): self {
        if ( isset( $filters['page'] ) ) {
            unset( $filters['page'] );
        }

        if ( ! empty( $filters ) ) {
            $this->api_url .= '?' . http_build_query( $filters );
        }

        return $this;
    }

    /**
     * Set Capsule detail API URL by serial id.
     *
     * @since 0.0.1
     *
     * @param string $serial_id
     * @return $this
     */
    public function set_api_url_by_serial_id( string $serial_id ): self {
        if ( ! empty( $serial_id ) ) {
            $this->api_url .= '/' . $serial_id;
        }

        return $this;
    }

    /**
     * Get spacex-data response.
     *
     * @since 0.0.1
     *
     * @return array
     */
    public function get_response(): array {
        return $this->response;
    }

    /**
     * Get spacex-data api url with appending.
     *
     * @since 0.0.1
     *
     * @return string
     */
    public function get_api_url(): string {
        return $this->api_url;
    }
}
