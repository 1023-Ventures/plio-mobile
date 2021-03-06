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


export type Order = {
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    concurrency?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    userId?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    orderType?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    orderNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    note?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    assetId?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    assetName?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    eventId?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    eventName?: string;
}

export const OrderModel = {
    id: 'id',
    concurrency: 'concurrency',
    userId: 'userId',
    orderType: 'orderType',
    orderNumber: 'orderNumber',
    note: 'note',
    assetId: 'assetId',
    assetName: 'assetName',
    eventId: 'eventId',
    eventName: 'eventName',
    _metadata: {
        id: { type: 'string' },
        concurrency: { type: 'string' },
        userId: { type: 'string' },
        orderType: { type: 'string' },
        orderNumber: { type: 'string' },
        note: { type: 'string' },
        assetId: { type: 'string' },
        assetName: { type: 'string' },
        eventId: { type: 'string' },
        eventName: { type: 'string' },
    }
}

export function OrderFromJSON(json: any): Order {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'concurrency': !exists(json, 'concurrency') ? undefined : json['concurrency'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'orderType': !exists(json, 'orderType') ? undefined : json['orderType'],
        'orderNumber': !exists(json, 'orderNumber') ? undefined : json['orderNumber'],
        'note': !exists(json, 'note') ? undefined : json['note'],
        'assetId': !exists(json, 'assetId') ? undefined : json['assetId'],
        'assetName': !exists(json, 'assetName') ? undefined : json['assetName'],
        'eventId': !exists(json, 'eventId') ? undefined : json['eventId'],
        'eventName': !exists(json, 'eventName') ? undefined : json['eventName'],
        
    };
}

export function OrderToJSON(value?: Order): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'concurrency': value.concurrency,
        'userId': value.userId,
        'orderType': value.orderType,
        'orderNumber': value.orderNumber,
        'note': value.note,
        'assetId': value.assetId,
        'assetName': value.assetName,
        'eventId': value.eventId,
        'eventName': value.eventName,
        
    };
}


