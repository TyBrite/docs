/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from '../models/Customer';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CustomersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create customer
     * Requires secret key
     * @returns Customer Customer created
     * @throws ApiError
     */
    public createCustomer({
        requestBody,
    }: {
        requestBody: {
            email: string;
            /**
             * Customer full name
             */
            name?: string;
            phone?: string;
            address?: string;
            status?: 'active' | 'inactive';
            join_date?: string;
        },
    }): CancelablePromise<Customer> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get customer details
     * Returns the authenticated customer's profile + store-level metrics.
     *
     * **Customer authentication required.** Pass the customer's session token in
     * the `x-auth-token` header. The token must resolve (via
     * `supabase.auth.getUser`) to a customer whose `id` equals the `{id}` path
     * parameter — otherwise 403 is returned. This prevents a leaked publishable
     * key from being used to enumerate or read other customers' profiles.
     *
     * @returns Customer Success
     * @throws ApiError
     */
    public getCustomer({
        id,
        xAuthToken,
        fields,
    }: {
        id: string,
        /**
         * Customer session access_token from `/v1/auth/login` or `/v1/auth/verify-otp`. The resolved customer must match the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `name`, `email`, `phone`, `address`, `status`
         * - `join_date`, `total_purchases`, `last_purchase`
         * - `created_at`, `updated_at`
         * - `store_metrics`, `store_metrics.*`
         *
         */
        fields?: string,
    }): CancelablePromise<Customer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update customer
     * Partially update the authenticated customer's profile. Only the fields
     * provided in the request body are updated.
     *
     * **Customer authentication required.** Pass the customer's session token in
     * the `x-auth-token` header. The token must resolve to a customer whose
     * `id` equals the `{id}` path parameter — otherwise 403 is returned.
     * Protected fields (`store_id`, `auth_user_id`) cannot be modified.
     *
     * @returns Customer Customer updated successfully
     * @throws ApiError
     */
    public updateCustomer({
        id,
        xAuthToken,
        requestBody,
    }: {
        id: string,
        /**
         * Customer session access_token. The resolved customer must match the `{id}` path parameter.
         */
        xAuthToken: string,
        requestBody?: {
            email?: string;
            phone?: string;
            name?: string;
            address?: string;
            status?: 'active' | 'inactive';
        },
    }): CancelablePromise<Customer> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/customers/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
