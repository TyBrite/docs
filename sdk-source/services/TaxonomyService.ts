/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { Subcategory } from '../models/Subcategory';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TaxonomyService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List categories
     * Retrieve all product categories for the authenticated store. Accepts both publishable and secret API keys.
     * @returns any Success
     * @throws ApiError
     */
    public listCategories({
        search,
        active = true,
        limit = 50,
        cursor,
        fields,
    }: {
        /**
         * Case-insensitive substring match on category name
         */
        search?: string,
        /**
         * Filter by active status. Defaults to true (only active categories) when omitted.
         */
        active?: boolean,
        /**
         * Maximum number of results to return
         */
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<{
        categories?: Array<Category>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/categories',
            query: {
                'search': search,
                'active': active,
                'limit': limit,
                'cursor': cursor,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get category
     * Retrieve a single product category by ID. Accepts both publishable and secret API keys.
     * @returns Category Success
     * @throws ApiError
     */
    public getCategory({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<Category> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/categories/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List subcategories
     * Retrieve all product subcategories. Optionally filter by parent category. Accepts both publishable and secret API keys.
     * @returns any Success
     * @throws ApiError
     */
    public listSubcategories({
        categoryId,
        search,
        active = true,
        limit = 100,
        cursor,
        fields,
    }: {
        /**
         * Filter subcategories by parent category ID
         */
        categoryId?: string,
        /**
         * Case-insensitive substring match on subcategory name
         */
        search?: string,
        /**
         * Filter by active status. Defaults to true (only active subcategories) when omitted.
         */
        active?: boolean,
        /**
         * Maximum number of results to return
         */
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<{
        subcategories?: Array<Subcategory>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/subcategories',
            query: {
                'category_id': categoryId,
                'search': search,
                'active': active,
                'limit': limit,
                'cursor': cursor,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get subcategory by ID
     * Retrieve a single subcategory by ID. Accepts both publishable and secret API keys.
     * @returns Subcategory Success
     * @throws ApiError
     */
    public getSubcategory({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<Subcategory> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/subcategories/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
