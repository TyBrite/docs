/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TrackingEvent = {
    timestamp?: string;
    status?: string;
    /**
     * Null unless the request carried the shipment's tracking token.
     */
    description?: string | null;
    /**
     * Null unless the request carried the shipment's tracking token.
     */
    location?: string | null;
};

