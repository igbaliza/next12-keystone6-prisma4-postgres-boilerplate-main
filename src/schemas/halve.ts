import { integer, timestamp, relationship } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Halve = list({
    fields: {
        newTicketRangeBegin: integer({
            db: {
                map: 'new_ticket_range_begin'
            }
        }),
        newTicketRangeEnd: integer({
            db: {
                map: 'new_ticket_range_end'
            }
        }),
        halveDateTime: timestamp({
            db: {
                map: 'have_date_time'
            }
        }),
        prizePool: relationship({ 
            ref: 'PrizePool.halves',
            db: {
                foreignKey: { 
                    map: 'prize_pool'
                }
            }
        }),
    },
    ui: {
        itemView: {
            defaultFieldMode: 'read'
        },
        hideCreate: true,
        isHidden: true
    },
    db: {
        map: 'halves'
    }
});