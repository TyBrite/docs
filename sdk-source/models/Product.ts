/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Product = {
    product_id?: string;
    /**
     * Alias for product_id
     */
    id?: string;
    variant_id?: string;
    name?: string;
    description?: string;
    brand?: string;
    sku?: string;
    price?: number;
    selling_price?: number;
    stock?: number;
    threshold?: number;
    /**
     * Primary product image URL
     */
    image?: string;
    category_id?: string;
    category_name?: string;
    subcategory_id?: string;
    subcategory_name?: string;
    product_slug?: string;
    is_active?: boolean;
    has_variants?: boolean;
    is_default?: boolean;
    tracking_mode?: string;
    created_at?: string;
    updated_at?: string;
    online_product_id?: string;
    online_name?: string;
    online_description?: string;
    online_images?: Array<string>;
    online_price?: number;
    online_sale_price?: number;
    is_online_enabled?: boolean;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: Array<string>;
    featured?: boolean;
    featured_order?: number;
    tags?: Array<string>;
    attributes?: Record<string, any>;
    shipping_info?: Record<string, any>;
    variant_name?: string;
    variant_attributes?: Record<string, any>;
    barcode?: string;
    barcode_type?: string;
};

