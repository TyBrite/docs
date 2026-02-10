/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MessagingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List message threads
     * @returns any Success
     * @throws ApiError
     */
    public listThreads({
        customerId,
        status,
        limit = 50,
    }: {
        customerId?: string,
        status?: 'open' | 'closed',
        limit?: number,
    }): CancelablePromise<{
        threads?: Array<{
            id?: string;
            customer_id?: string;
            subject?: string;
            status?: string;
            unread_count?: number;
            last_message_at?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads',
            query: {
                'customer_id': customerId,
                'status': status,
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
     * Get thread details
     * @returns any Success
     * @throws ApiError
     */
    public getThread({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        id?: string;
        customer_id?: string;
        customer_name?: string;
        customer_email?: string;
        subject?: string;
        status?: string;
        priority?: string;
        last_message_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads/{id}',
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
     * Get messages in a thread
     * @returns any Success
     * @throws ApiError
     */
    public getThreadMessages({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        messages?: Array<{
            id?: string;
            message_content?: string;
            sender_type?: string;
            sender_name?: string;
            created_at?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads/{id}/messages',
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
     * Send message to thread
     * Add a message to an existing thread
     * @returns any Message sent
     * @throws ApiError
     */
    public sendMessage({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            message: string;
            attachments?: Array<string>;
        },
    }): CancelablePromise<{
        id?: string;
        message?: string;
        created_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/messaging/threads/{id}/messages',
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
     * Create new conversation
     * Start a new message conversation
     * @returns any Conversation created
     * @throws ApiError
     */
    public createConversation({
        requestBody,
    }: {
        requestBody: {
            customer_id: string;
            subject: string;
            message: string;
        },
    }): CancelablePromise<{
        id?: string;
        customer_id?: string;
        subject?: string;
        created_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/messaging/conversations',
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
