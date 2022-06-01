/* eslint-disable */

/**
 * Burdi.Api
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
    Message,
    MessageFromJSON,
    MessageToJSON,
} from '../models/Message';
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
    & Message;

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
    & Message;

type UpdateUrlParams = {
    /** reload  true*/
    reload: boolean;
}

/**
 * no description
 */
export const MessageController = {

    /**
     */
    _delete: createEndpoint<boolean, never, DeleteUrlParams, DeleteQueryParams>({
        method: 'DELETE',
        url: normalizePath('/burdi/api/Message/{id}')
    }),
    /**
     */
    create: createEndpoint<Message, CreateBody, CreateUrlParams, never>({
        method: 'POST',
        url: normalizePath('/burdi/api/Message')
    }),
    /**
     */
    read: createEndpoint<Message, never, ReadUrlParams, never>({
        method: 'GET',
        url: normalizePath('/burdi/api/Message/{id}')
    }),
    /**
     */
    readAll: createEndpoint<Array<Message>, never, never, never>({
        method: 'GET',
        url: normalizePath('/burdi/api/Message')
    }),
    /**
     */
    sparseUpdate: createEndpoint<Message, SparseUpdateBody, SparseUpdateUrlParams, never>({
        method: 'PATCH',
        url: normalizePath('/burdi/api/Message/{id}')
    }),
    /**
     */
    update: createEndpoint<Message, UpdateBody, UpdateUrlParams, never>({
        method: 'PUT',
        url: normalizePath('/burdi/api/Message')
    }),
}