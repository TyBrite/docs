/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PricingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get prices for multiple products with dynamic pricing
     * Calculate dynamic prices for products based on customer segment, location, volume, etc.
     * @returns any Success
     * @throws ApiError
     */
    public getProductPrices({
        search,
        categoryId,
        subcategoryId,
        limit = 50,
        offset,
        location,
        region,
        customerId,
        quantity,
    }: {
        /**
         * Search by product name or SKU
         */
        search?: string,
        categoryId?: string,
        subcategoryId?: string,
        limit?: number,
        offset?: number,
        /**
         * Location/country for location-based pricing
         */
        location?: string,
        /**
         * Region for regional pricing
         */
        region?: string,
        customerId?: string,
        /**
         * Quantity for volume-based pricing
         */
        quantity?: number,
    }): CancelablePromise<{
        products?: Array<{
            product_id?: string;
            base_price?: number;
            resolved_price?: number;
            price_breakdown?: {
                base_price?: number;
                discounts?: any[];
                final_price?: number;
            };
        }>;
        total?: number;
        limit?: number;
        offset?: number;
        pricing_context?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/prices/products',
            query: {
                'search': search,
                'category_id': categoryId,
                'subcategory_id': subcategoryId,
                'limit': limit,
                'offset': offset,
                'location': location,
                'region': region,
                'customer_id': customerId,
                'quantity': quantity,
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
     * Get product pricing with dynamic pricing
     * @returns any Success
     * @throws ApiError
     */
    public getProductPrice({
        id,
        location,
        region,
        customerId,
        quantity = 1,
    }: {
        id: string,
        /**
         * Location/country for location-based pricing
         */
        location?: string,
        /**
         * Region for regional pricing
         */
        region?: string,
        customerId?: string,
        quantity?: number,
    }): CancelablePromise<{
        product_id?: string;
        base_price?: number;
        resolved_price?: number;
        price_breakdown?: Record<string, any>;
        pricing_context?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/prices/products/{id}',
            path: {
                'id': id,
            },
            query: {
                'location': location,
                'region': region,
                'customer_id': customerId,
                'quantity': quantity,
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
