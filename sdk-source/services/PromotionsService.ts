/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PromotionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List promotions
     * Get active promotions, optionally filtered by cart total
     * @returns any Success
     * @throws ApiError
     */
    public listPromotions({
        status,
        cartTotal,
        limit = 50,
        offset,
    }: {
        status?: 'active' | 'inactive' | 'scheduled' | 'expired',
        /**
         * Filter promotions by minimum cart total requirement (numeric string)
         */
        cartTotal?: string,
        limit?: number,
        offset?: number,
    }): CancelablePromise<{
        promotions?: Array<{
            id?: string;
            name?: string;
            code?: string;
            discount_type?: 'percentage' | 'fixed';
            discount_value?: number;
            start_date?: string;
            end_date?: string;
            status?: string;
        }>;
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/promotions',
            query: {
                'status': status,
                'cart_total': cartTotal,
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
     * Get promotion details
     * @returns any Success
     * @throws ApiError
     */
    public getPromotion({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/promotions/{id}',
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
