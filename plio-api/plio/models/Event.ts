/* tslint:disable */
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


import { exists } from '@1023-ventures/darri-core';


export type Event = {
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    concurrency?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    startsOn?: Date;
    /**
     * 
     * @type {number}
     * @memberof Event
     */
    duration?: number;
}

export const EventModel = {
    id: 'id',
    concurrency: 'concurrency',
    name: 'name',
    startsOn: 'startsOn',
    duration: 'duration',
    _metadata: {
        id: { type: 'string' },
        concurrency: { type: 'string' },
        name: { type: 'string' },
        startsOn: { type: 'Date' },
        duration: { type: 'number' },
    }
}

export function EventFromJSON(json: any): Event {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'concurrency': !exists(json, 'concurrency') ? undefined : json['concurrency'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'startsOn': !exists(json, 'startsOn') ? undefined : new Date(json['startsOn']),
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        
    };
}

export function EventToJSON(value?: Event): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'concurrency': value.concurrency,
        'name': value.name,
        'startsOn': value.startsOn === undefined ? undefined : value.startsOn.toISOString(),
        'duration': value.duration,
        
    };
}


