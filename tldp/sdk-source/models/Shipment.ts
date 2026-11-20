/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { ServiceLevel } from './ServiceLevel';
import type { ShipmentStatus } from './ShipmentStatus';
export type Shipment = {
    id?: string;
    tracking_number?: string;
    status?: ShipmentStatus;
    created_at?: string;
    updated_at?: string;
    service_level?: ServiceLevel;
    recipient?: Address;
    pricing?: {
        total?: number;
        currency?: string;
    };
    timeline?: {
        created_at?: string;
        picked_up_at?: string | null;
        delivered_at?: string | null;
        estimated_delivery?: string;
    };
    /**
     * The public tracking link for this shipment: the tracking page address plus the shipment's
     * tracking token (`?k=`). Share this link with the recipient; the tracking number on its own
     * shows the status only.
     *
     */
    tracking_url?: string;
};

