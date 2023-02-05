<?php

namespace Akash\BsfSpacex\REST;

use Akash\BsfSpacex\Repository\CapsulesRepository;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;
use Akash\BsfSpacex\Abstracts\BaseRestController;

defined( 'ABSPATH' ) || exit;

/**
 * Capsules Controller class.
 *
 * @since 0.0.1
 */
class CapsulesController extends BaseRestController {
    /**
     * Route base.
     *
     * @var string
     */
    protected string $base = 'capsules';

    /**
     * Capsules repository.
     *
     * @var CapsulesRepository
     */
    private CapsulesRepository $capsulesRepository;

    /**
     * Class constructor.
     */
    public function __construct() {
        $this->capsulesRepository = new CapsulesRepository();
    }

    /**
     * Register all routes related capsules.
     *
     * @since 0.0.1
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace, '/' . $this->base . '/',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                    'args'                => $this->get_collection_params(),
                    'schema'              => [ $this, 'get_item_schema' ],
                ],
            ]
        );
    }

    /**
     * Retrieves a collection of capsule items.
     *
     * @since 0.0.1
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_items( $request ): ?WP_REST_Response {
        $filters = [];
        $data   = [];
        $params = $this->get_collection_params();

        foreach ( $params as $key => $value ) {
            if ( isset( $request[ $key ] ) ) {
                $filters[ $key ] = $request[ $key ];
            }
        }

        $capsule_response = $this->capsulesRepository
                        ->set_api_url_by_filtering($filters)
                        ->set_capsule_response();

        $capsules_data = $capsule_response->get_capsules_data();
        $capsules_header = $capsule_response->get_capsules_header();

        foreach ( $capsules_data as $capsule ) {
            $response = $this->prepare_item_for_response( $capsule, $request );
            $data[]   = $this->prepare_response_for_collection( $response );
        }

        $total     = $capsules_header['spacex-api-count'];
        $max_pages = ceil( $total / (int) $filters['limit'] );
        $response  = rest_ensure_response( $data );

        $response->header( 'X-WP-Total', (int) $total );
        $response->header( 'X-WP-TotalPages', (int) $max_pages );

        return $response;
    }

    /**
     * Retrieves the group schema, conforming to JSON Schema.
     *
     * @since 0.0.1
     *
     * @return array
     */
    public function get_item_schema(): array {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'capsule',
            'type'       => 'object',
            'properties' => [
                'capsule_serial'    => [
                    'description' => __('Serial number of the capsule', 'bsf-spacex'),
                    'type'        => 'string'
                ],
                'capsule_id' => [
                    'description' => __('Unique identifier for the capsule', 'bsf-spacex'),
                    'type'        => 'string'
                ],
                'status' => [
                    'description' => __('Current status of the capsule', 'bsf-spacex'),
                    'type'        => 'string'
                ],
                'original_launch' => [
                    'description' => __('Original launch date of the capsule', 'bsf-spacex'),
                    'type'        => 'string',
                    'format'      => 'date-time'
                ],
                'original_launch_unix' => [
                    'description' => __('Original launch date of the capsule in Unix time format', 'bsf-spacex'),
                    'type'        => 'integer'
                ],
                'missions' => [
                    'description' => __( 'List of missions for the capsule.', 'bsf-spacex' ),
                    'type'        => 'array',
                    'items'       => [
                        'type'       => 'object',
                        'properties' => [
                            'name'    => [
                                'description' => __( 'Name of the mission.', 'bsf-spacex' ),
                                'type'        => 'string',
                            ],
                            'flight' => [
                                'description' => __( 'Flight number of the mission.', 'bsf-spacex' ),
                                'type'        => 'integer',
                            ],
                        ],
                    ],
                ],
                'landings' => [
                    'description' => __( 'Number of landings for the capsule.', 'bsf-spacex' ),
                    'type'        => 'integer',
                ],
                'type' => [
                    'description' => __( 'Type of the capsule.', 'bsf-spacex' ),
                    'type'        => 'string',
                ],
                'details' => [
                    'description' => __( 'Details about the capsule.', 'bsf-spacex' ),
                    'type'        => 'string',
                ],
                'reuse_count' => [
                    'description' => __( 'Number of times the capsule has been reused.', 'bsf-spacex' ),
                    'type'        => 'integer',
                ],
            ],
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }

    /**
     * Prepares the item for the REST response.
     *
     * @since 0.0.1
     *
     * @param WP_REST_Response|object $item
     * @param WP_REST_Request         $request request object
     *
     * @return WP_Error|WP_REST_Response
     */
    public function prepare_item_for_response( $item, $request ) {
        $data = $this->prepare_response_for_collection( $item );

        $context = ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data    = $this->filter_response_by_context( $data, $context );

        $schema = $this->get_item_schema();
        $properties = $schema['properties'];

        foreach ($data as $key => $value) {
            if (isset($properties[$key])) {
                $data[$key] = $value;
            } else {
                unset($data[$key]);
            }
        }

        return rest_ensure_response( $data );
    }

    /**
     * Prepare response for collection.
     *
     * @since 0.0.1
     *
     * @param WP_REST_Response $response
     * @return array|WP_REST_Response
     */
    public function prepare_response_for_collection( $response ) {
        if ( ! ( $response instanceof WP_REST_Response ) ) {
            return $response;
        }

        $data   = (array) $response->get_data();
        $server = rest_get_server();
        $links  = $server::get_compact_response_links( $response );

        if ( ! empty( $links ) ) {
            $data['_links'] = $links;
        }

        return $data;
    }

    /**
     * Retrieves the query params for collections.
     *
     * @since 0.0.1
     *
     * @return array
     */
    public function get_collection_params(): array {
        $params = parent::get_collection_params();

        $params['search']['default']  = '';
        $params['limit']['default']   = 10;
        $params['offset']['default']  = 0;
        $params['status']['default']  = '';
        $params['sort']['default']  = 'capsule_serial';
        $params['order']['default']  = 'desc';

        if ( $params['limit'] <= 0 ) {
            $params['limit'] = 1;
        }

        return $params;
    }
}
