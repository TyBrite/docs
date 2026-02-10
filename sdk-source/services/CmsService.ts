/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CmsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List blog posts
     * @returns any Success
     * @throws ApiError
     */
    public listPosts({
        status,
        category,
        limit,
        offset,
    }: {
        status?: 'published' | 'draft',
        category?: string,
        limit?: number,
        offset?: number,
    }): CancelablePromise<{
        posts?: Array<{
            id?: string;
            title?: string;
            slug?: string;
            excerpt?: string;
            featured_image?: string;
            published_at?: string;
            author?: string;
        }>;
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts',
            query: {
                'status': status,
                'category': category,
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
     * Get blog post by ID
     * @returns any Success
     * @throws ApiError
     */
    public getPost({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        id?: string;
        title?: string;
        slug?: string;
        content?: string;
        excerpt?: string;
        featured_image?: string;
        published_at?: string;
        author?: string;
        tags?: Array<string>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts/{id}',
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
     * List lookbooks
     * @returns any Success
     * @throws ApiError
     */
    public listLookbooks({
        status,
        limit = 50,
        offset,
    }: {
        status?: 'published' | 'draft',
        limit?: number,
        offset?: number,
    }): CancelablePromise<{
        lookbooks?: Array<{
            id?: string;
            title?: string;
            description?: string;
            cover_image?: string;
            published_at?: string;
        }>;
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lookbooks',
            query: {
                'status': status,
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
     * Get lookbook details
     * @returns any Success
     * @throws ApiError
     */
    public getLookbook({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        id?: string;
        title?: string;
        description?: string;
        cover_image?: string;
        images?: Array<string>;
        products?: Array<Product>;
        published_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lookbooks/{id}',
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
