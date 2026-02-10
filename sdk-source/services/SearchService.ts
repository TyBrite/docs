/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SearchService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Simple text search
     * Fast text-based search using PostgreSQL ILIKE
     * @returns any Success
     * @throws ApiError
     */
    public searchProducts({
        q,
        query,
        limit = 20,
    }: {
        /**
         * Search query (alternative to 'query' parameter)
         */
        q?: string,
        /**
         * Search query (alternative to 'q' parameter)
         */
        query?: string,
        limit?: number,
    }): CancelablePromise<{
        query?: string;
        results?: Array<SearchResult>;
        totalResults?: number;
        searchTimeMs?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/search',
            query: {
                'q': q,
                'query': query,
                'limit': limit,
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
     * Semantic search
     * Semantic search using embeddings and cosine similarity.
     * Understands natural language queries like "wireless headphones with noise cancellation".
     *
     * @returns any Success
     * @throws ApiError
     */
    public semanticSearch({
        requestBody,
    }: {
        requestBody: {
            query: string;
            limit?: number;
            categoryId?: string;
        },
    }): CancelablePromise<{
        query?: string;
        results?: Array<SearchResult>;
        totalResults?: number;
        searchTimeMs?: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
