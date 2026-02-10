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
     * Retrieve all product categories
     * @returns any Success
     * @throws ApiError
     */
    public listCategories({
        search,
        active,
    }: {
        search?: string,
        /**
         * Filter by active status
         */
        active?: boolean,
    }): CancelablePromise<{
        categories?: Array<Category>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/categories',
            query: {
                'search': search,
                'active': active,
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
     * @returns Category Success
     * @throws ApiError
     */
    public getCategory({
        id,
    }: {
        id: string,
    }): CancelablePromise<Category> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/categories/{id}',
            path: {
                'id': id,
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
     * @returns any Success
     * @throws ApiError
     */
    public listSubcategories({
        categoryId,
        search,
        active,
        limit = 100,
        offset,
    }: {
        categoryId?: string,
        search?: string,
        /**
         * Filter by active status
         */
        active?: boolean,
        limit?: number,
        offset?: number,
    }): CancelablePromise<{
        subcategories?: Array<Subcategory>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/subcategories',
            query: {
                'category_id': categoryId,
                'search': search,
                'active': active,
                'limit': limit,
                'offset': offset,
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
     * @returns Subcategory Success
     * @throws ApiError
     */
    public getSubcategory({
        id,
    }: {
        id: string,
    }): CancelablePromise<Subcategory> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/subcategories/{id}',
            path: {
                'id': id,
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
