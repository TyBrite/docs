/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Customer = {
    id?: string;
    email?: string;
    phone?: string;
    full_name?: string;
    customer_type?: Customer.customer_type;
    loyalty_points?: number;
    created_at?: string;
    updated_at?: string;
};
export namespace Customer {
    export enum customer_type {
        INDIVIDUAL = 'individual',
        BUSINESS = 'business',
    }
}

