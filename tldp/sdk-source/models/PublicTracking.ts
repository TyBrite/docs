/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentStatus } from './ShipmentStatus';
import type { TrackingEvent } from './TrackingEvent';
export type PublicTracking = {
    tracking_number?: string;
    status?: ShipmentStatus;
    /**
     * The projected delivery time with the tracking token; without it, the start of that day (UTC).
     *
     */
    estimated_delivery?: string | null;
    /**
     * True when the request carried the shipment's tracking token.
     */
    full_details?: boolean;
    /**
     * Present only with the shipment's tracking token.
     */
    recipient?: any | null;
    courier?: any | null;
    events?: Array<TrackingEvent>;
};

