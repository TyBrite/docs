/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItem } from '../models/CartItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CartWishlistService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get cart
     * Retrieve cart contents for customer or session
     * @returns any Success
     * @throws ApiError
     */
    public getCart({
        customerId,
        xSessionId,
    }: {
        customerId?: string,
        /**
         * Session ID for anonymous carts
         */
        xSessionId?: string,
    }): CancelablePromise<{
        items?: Array<CartItem>;
        total_items?: number;
        subtotal?: number;
        session_id?: string;
        customer_id?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/cart',
            headers: {
                'X-Session-Id': xSessionId,
            },
            query: {
                'customer_id': customerId,
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
     * Clear cart
     * @returns any Cart cleared
     * @throws ApiError
     */
    public clearCart({
        customerId,
    }: {
        customerId?: string,
    }): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/cart',
            query: {
                'customer_id': customerId,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Add to cart
     * @returns any Item added
     * @throws ApiError
     */
    public addToCart({
        requestBody,
    }: {
        requestBody: {
            product_id: string;
            quantity: number;
            customer_id?: string;
        },
    }): CancelablePromise<{
        items?: Array<CartItem>;
        total_items?: number;
        subtotal?: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/cart/items',
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
    /**
     * Update cart item
     * @returns any Item updated
     * @throws ApiError
     */
    public updateCartItem({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
            quantity?: number;
            customer_id?: string;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/cart/items/{id}',
            path: {
                'id': id,
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
    /**
     * Merge carts
     * Merge anonymous session cart with customer cart after login
     * @returns any Carts merged
     * @throws ApiError
     */
    public mergeCart({
        requestBody,
    }: {
        requestBody: {
            session_id: string;
            customer_id: string;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/cart/merge',
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
    /**
     * Get wishlist
     * @returns any Success
     * @throws ApiError
     */
    public getWishlist({
        customerId,
    }: {
        customerId?: string,
    }): CancelablePromise<{
        items?: Array<{
            id?: string;
            product_id?: string;
            product_name?: string;
            product_sku?: string;
            product_price?: number;
            product_image?: string;
            created_at?: string;
        }>;
        total_items?: number;
        customer_id?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/wishlist',
            query: {
                'customer_id': customerId,
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
     * Add to wishlist
     * @returns any Item added
     * @throws ApiError
     */
    public addToWishlist({
        requestBody,
    }: {
        requestBody: {
            product_id: string;
            customer_id: string;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/wishlist',
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
    /**
     * Remove from wishlist
     * @returns any Item removed
     * @throws ApiError
     */
    public removeFromWishlist({
        id,
        customerId,
    }: {
        id: string,
        customerId?: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/wishlist/{id}',
            path: {
                'id': id,
            },
            query: {
                'customer_id': customerId,
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
     * Move wishlist item to cart
     * Atomic operation to move item from wishlist to cart
     * @returns any Item moved to cart
     * @throws ApiError
     */
    public moveWishlistToCart({
        requestBody,
    }: {
        requestBody: {
            wishlist_item_id: string;
            customer_id: string;
            quantity?: number;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/wishlist/move-to-cart',
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
