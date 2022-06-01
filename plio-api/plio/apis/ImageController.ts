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
    Image,
    ImageFromJSON,
    ImageToJSON,
} from '../models/Image';
import {
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models/ProblemDetails';

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
    & Image;

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
    & Image;

type UpdateUrlParams = {
    /** reload  true*/
    reload: boolean;
}

/**
 * no description
 */
export const ImageController = {

    /**
     */
    _delete: createEndpoint<boolean, never, DeleteUrlParams, DeleteQueryParams>({
        method: 'DELETE',
        url: normalizePath('/plio/api/Image/{id}')
    }),
    /**
     */
    create: createEndpoint<Image, CreateBody, CreateUrlParams, never>({
        method: 'POST',
        url: normalizePath('/plio/api/Image')
    }),
    /**
     */
    read: createEndpoint<Image, never, ReadUrlParams, never>({
        method: 'GET',
        url: normalizePath('/plio/api/Image/{id}')
    }),
    /**
     */
    readAll: createEndpoint<Array<Image>, never, never, never>({
        method: 'GET',
        url: normalizePath('/plio/api/Image')
    }),
    /**
     */
    sparseUpdate: createEndpoint<Image, SparseUpdateBody, SparseUpdateUrlParams, never>({
        method: 'PATCH',
        url: normalizePath('/plio/api/Image/{id}')
    }),
    /**
     */
    update: createEndpoint<Image, UpdateBody, UpdateUrlParams, never>({
        method: 'PUT',
        url: normalizePath('/plio/api/Image')
    }),
}
