/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GiftCardsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Check gift card details
     * @returns any Success
     * @throws ApiError
     */
    public checkGiftCard({
        code,
    }: {
        code: string,
    }): CancelablePromise<{
        code?: string;
        balance?: number;
        original_amount?: number;
        status?: 'active' | 'redeemed' | 'expired';
        expires_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/gift-cards/check',
            query: {
                'code': code,
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
     * Redeem gift card
     * Requires secret key
     * @returns any Gift card redeemed
     * @throws ApiError
     */
    public redeemGiftCard({
        requestBody,
    }: {
        requestBody: {
            code: string;
            amount: number;
            order_id?: string;
        },
    }): CancelablePromise<{
        success?: boolean;
        remaining_balance?: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/gift-cards/redeem',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Insufficient balance or invalid card`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
