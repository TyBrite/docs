/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthenticationService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Register customer account
     * Create a new customer account with email and password.
     * Returns user details and authentication tokens upon successful registration.
     *
     * @returns any Registration successful
     * @throws ApiError
     */
    public register({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
            /**
             * Password (minimum 8 characters)
             */
            password: string;
            /**
             * Customer full name
             */
            full_name?: string;
            /**
             * Phone number with country code
             */
            phone?: string;
        },
    }): CancelablePromise<{
        user?: {
            id?: string;
            email?: string;
        };
        session?: {
            /**
             * JWT access token (valid for 1 hour)
             */
            access_token?: string;
            /**
             * Refresh token for obtaining new access tokens
             */
            refresh_token?: string;
            /**
             * Unix timestamp when access token expires
             */
            expires_at?: number;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request (email already exists, weak password, etc.)`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Login with email and password
     * Authenticate using email and password credentials.
     * Returns user details and session tokens upon successful authentication.
     *
     * @returns any Login successful
     * @throws ApiError
     */
    public login({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
            /**
             * Customer password
             */
            password: string;
        },
    }): CancelablePromise<{
        user?: {
            id?: string;
            email?: string;
        };
        session?: {
            access_token?: string;
            refresh_token?: string;
            expires_at?: number;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Invalid credentials (wrong email or password)`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Logout current session
     * Invalidate the current access and refresh tokens
     * @returns any Successfully logged out
     * @throws ApiError
     */
    public logout(): CancelablePromise<{
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/logout',
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
     * Send magic link / OTP
     * Send a passwordless authentication link or OTP code to the customer's email.
     * The link/code is valid for 15 minutes.
     *
     * @returns any Magic link/OTP sent successfully
     * @throws ApiError
     */
    public sendMagicLink({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
        },
    }): CancelablePromise<{
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/magic-link',
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
     * Verify OTP code
     * Verify the OTP code sent via email and complete authentication
     * @returns any OTP verified successfully
     * @throws ApiError
     */
    public verifyOtp({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
            /**
             * 6-digit OTP code
             */
            token: string;
        },
    }): CancelablePromise<{
        user?: Record<string, any>;
        session?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/verify-otp',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Invalid or expired OTP`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Request password reset
     * Send a password reset link to the customer's email
     * @returns any Reset email sent
     * @throws ApiError
     */
    public resetPassword({
        requestBody,
    }: {
        requestBody: {
            email: string;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/reset-password',
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
     * Update password
     * Update user password (requires authentication)
     * @returns any Password updated
     * @throws ApiError
     */
    public updatePassword({
        requestBody,
    }: {
        requestBody: {
            current_password: string;
            new_password: string;
        },
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/update-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Invalid current password`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Refresh access token
     * Get new access token using refresh token
     * @returns any Token refreshed
     * @throws ApiError
     */
    public refreshToken({
        requestBody,
    }: {
        requestBody: {
            refresh_token: string;
        },
    }): CancelablePromise<{
        access_token?: string;
        refresh_token?: string;
        expires_at?: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/refresh',
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
     * Get current user
     * @returns any Success
     * @throws ApiError
     */
    public getCurrentUser(): CancelablePromise<{
        user?: {
            id?: string;
            email?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/auth/me',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
