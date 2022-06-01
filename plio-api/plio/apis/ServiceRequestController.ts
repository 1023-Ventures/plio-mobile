/* eslint-disable */

/**
 * Plio.Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { createEndpoint, normalizePath } from '@1023-ventures/darri-core';

import {
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models/ProblemDetails';
import {
    ServiceRequest,
    ServiceRequestFromJSON,
    ServiceRequestToJSON,
} from '../models/ServiceRequest';

// Data Transfer Objects for individual endpoints

type DeleteUrlParams = {
    /** id  true*/
    id: string;
}

type DeleteQueryParams = {
    /**  */
    concurrency?: string;
}

type CreateBody =
    /**  */
    & ServiceRequest;

type CreateUrlParams = {
    /** reload  true*/
    reload: boolean;
}

type ReadUrlParams = {
    /** id  true*/
    id: string;
}

type SparseUpdateBody =
    /**  */
    & string;

type SparseUpdateUrlParams = {
    /** id  true*/
    id: string;
    /** reload  true*/
    reload: boolean;
}

type UpdateBody =
    /**  */
    & ServiceRequest;

type UpdateUrlParams = {
    /** reload  true*/
    reload: boolean;
}

/**
 * no description
 */
export const ServiceRequestController = {

    /**
     */
    _delete: createEndpoint<boolean, never, DeleteUrlParams, DeleteQueryParams>({
        method: 'DELETE',
        url: normalizePath('/plio/api/ServiceRequest/{id}')
    }),
    /**
     */
    create: createEndpoint<ServiceRequest, CreateBody, CreateUrlParams, never>({
        method: 'POST',
        url: normalizePath('/plio/api/ServiceRequest')
    }),
    /**
     */
    read: createEndpoint<ServiceRequest, never, ReadUrlParams, never>({
        method: 'GET',
        url: normalizePath('/plio/api/ServiceRequest/{id}')
    }),
    /**
     */
    readAll: createEndpoint<Array<ServiceRequest>, never, never, never>({
        method: 'GET',
        url: normalizePath('/plio/api/ServiceRequest')
    }),
    /**
     */
    sparseUpdate: createEndpoint<ServiceRequest, SparseUpdateBody, SparseUpdateUrlParams, never>({
        method: 'PATCH',
        url: normalizePath('/plio/api/ServiceRequest/{id}')
    }),
    /**
     */
    update: createEndpoint<ServiceRequest, UpdateBody, UpdateUrlParams, never>({
        method: 'PUT',
        url: normalizePath('/plio/api/ServiceRequest')
    }),
}