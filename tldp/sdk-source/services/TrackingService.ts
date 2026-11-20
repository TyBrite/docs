/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PublicTracking } from '../models/PublicTracking';
import type { ShipmentStatus } from '../models/ShipmentStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TrackingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Public tracking
     * Public, unauthenticated tracking. Tracking numbers are issued in sequence, so the number alone
     * returns the status, the day of the estimated delivery, the courier and each event's status.
     * The shipment's `tracking_url` carries a tracking token (`k`); with it the response adds the
     * recipient's name and city and each event's description and location, and `full_details` is true.
     * Rate limited per client IP (60 / minute). **Edge-cached** (~15s, separately per token) and
     * **ETag-validated**: send the returned `ETag` back as `If-None-Match` to get a `304` (no body)
     * when unchanged.
     *
     * @returns PublicTracking Public tracking info.
     * @throws ApiError
     */
    public trackShipment({
        trackingNumber,
        k,
    }: {
        /**
         * The shipment's tracking number (e.g. TLDP-20251003-0001).
         */
        trackingNumber: string,
        /**
         * The shipment's tracking token, as carried by its `tracking_url`. With a matching token the
         * response includes the recipient and each event's description and location; without one it
         * carries the status, the day of the estimated delivery, the courier and each event's status.
         *
         */
        k?: string,
    }): CancelablePromise<PublicTracking> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/tracking/{trackingNumber}',
            path: {
                'trackingNumber': trackingNumber,
            },
            query: {
                'k': k,
            },
            errors: {
                304: `The resource is unchanged since your \`If-None-Match\` ETag — body omitted.`,
                404: `The requested resource does not exist (or isn't yours).`,
                429: `Rate limit exceeded for the current window.`,
                500: `Unexpected server error.`,
            },
        });
    }
    /**
     * Detailed tracking (authenticated)
     * @returns any Full timeline + events.
     * @throws ApiError
     */
    public getShipmentTracking({
        shipmentId,
    }: {
        /**
         * The shipment's unique id.
         */
        shipmentId: string,
    }): CancelablePromise<{
        shipment_id?: string;
        tracking_number?: string;
        status?: ShipmentStatus;
        /**
         * Each field is the moment the shipment entered that state, or null if it
         * has not. `estimated_delivery` is the projection made when the shipment
         * was created.
         *
         */
        full_timeline?: {
            created_at?: string;
            payment_confirmed_at?: string | null;
            assigned_at?: string | null;
            picked_up_at?: string | null;
            in_transit_at?: string | null;
            delivered_at?: string | null;
            estimated_delivery?: string | null;
        };
        /**
         * Scan events in chronological order, oldest first.
         */
        events?: Array<{
            id?: string;
            created_at?: string;
            event_type?: string;
            description?: string;
            location_text?: string | null;
            lat?: number | null;
            lng?: number | null;
            metadata?: Record<string, any>;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/shipments/{shipmentId}/tracking',
            path: {
                'shipmentId': shipmentId,
            },
            errors: {
                400: `Invalid request — missing or malformed parameters.`,
                401: `Missing or invalid API key.`,
                404: `The requested resource does not exist (or isn't yours).`,
                429: `Rate limit exceeded for the current window.`,
                500: `Unexpected server error.`,
            },
        });
    }
}
