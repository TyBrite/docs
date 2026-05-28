/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Customer = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: Customer.status;
    join_date?: string;
    total_purchases?: number;
    last_purchase?: string;
    created_at?: string;
    updated_at?: string;
    store_metrics?: {
        total_purchases?: number;
        total_spent?: number;
        first_purchase_date?: string;
        last_purchase_date?: string;
        status?: string;
        preferred_store?: string;
    };
    /**
     * Whether this customer record belongs to the live or test environment.
     */
    environment?: Customer.environment;
};
export namespace Customer {
    export enum status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
    }
    /**
     * Whether this customer record belongs to the live or test environment.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

