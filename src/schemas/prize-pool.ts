import { integer, float, timestamp, select, relationship } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const PrizePool = list({
    fields: {
        prizePoolNumber: integer({
            defaultValue: {
                kind: 'autoincrement'
            },
            db: {
                isNullable: false,
                map: 'prize_pool_num'
            },
            isIndexed: 'unique',
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        numOfTickets: integer({
            validation: { 
                isRequired: true,
                min: 0,
                max: 2147483647
            },
            db: { 
                isNullable: false,
                map: 'num_tickets'
            },
            graphql: { 
                create: {
                    isNonNull: true
                }
            }
        }),
        initialTicketValue: float({
            validation: { 
                isRequired: true,
                min: 0
            },
            db: {
                isNullable: false,
                map: 'initial_ticket_value'
            },
            graphql: { 
                create: {
                    isNonNull: true
                }
            }
        }),
        currentTicketValue: float({
            db: {
                isNullable: false,
                map: 'current_ticket_value'
            },
            hooks: {
                resolveInput: ({inputData, operation, resolvedData}) => {
                    if (operation === 'create') {
                        return inputData.initialTicketValue;
                    }
                    return resolvedData.currentTicketValue;
                }
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        initialTicketRangeBegin: integer ({
            hooks: {
                resolveInput: ({ operation, resolvedData }) => {
                    if (operation === 'create') {
                        return 1;
                    }
                    return resolvedData.initialTicketRangeBegin;
                }
            },
            db: {
                isNullable: false,
                map: 'initial_range_begin'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        initialTicketRangeEnd: integer({
            hooks: {
                resolveInput: ({ inputData, operation, resolvedData}) => {
                    if (operation === 'create') {
                        return inputData.numOfTickets;
                    }
                    return resolvedData.initialTicketRangeEnd;
                }
            },
            db: {
                isNullable: false,
                map: 'initial_range_end'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        currentTicketRangeBegin: integer ({
            hooks: {
                resolveInput: ({ operation, resolvedData }) => {
                    if (operation === 'create') {
                        return 1;
                    }
                    return resolvedData.currentTicketRangeBegin;
                }
            },
            db: {
                isNullable: false,
                map: 'current_range_begin'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        currentTicketRangeEnd: integer({
            hooks: {
                resolveInput: ({ inputData, operation, resolvedData}) => {
                    if (operation === 'create') {
                        return inputData.numOfTickets;
                    }
                    return resolvedData.currentTicketRangeEnd;
                }
            },
            db: {
                isNullable: false,
                map: 'current_range_end'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
         remainingTickets: integer({
            hooks: {
                resolveInput: ({ inputData, operation, resolvedData}) => {
                    if (operation === 'create') {
                        return inputData.numOfTickets;
                    }
                    return resolvedData.remainingTickets;
                }
            },
            db: {
                isNullable: false,
                map: 'remaining_tickets'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }), 
        createdTime: timestamp({
            defaultValue: {
                kind: 'now'
            },
            db: {
                isNullable: false,
                map: 'created_time'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        lastHalveTime: timestamp({
            defaultValue: {
                kind: 'now'
            },
            db: {
                isNullable: false,
                map: 'last_halve_time'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }) ,
        nextHalveTime: timestamp({
            db: {
                isNullable: false,
                map: 'next_halve_time'
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            },
            hooks: {
                resolveInput: ({inputData, operation, resolvedData}) => {
                    if (operation === 'create') {
                       let date = new Date(resolvedData.createdTime);
                       date.setDate(date.getDate() +1);
                        return date;
                    }
                    return resolvedData.nextHalveTime;
                }
            }
        }),
        secretNumber: integer({
            db: {
                map: 'secret_number',
                isNullable: false
            },
            hooks: {
                resolveInput: ({ inputData, operation, resolvedData}) => {
                    if(operation === 'create') {
                        return Math.floor(Math.random() * inputData.numOfTickets + 1);
                    }
                    return resolvedData.secretNumber;
                }
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        status: select({
            options: [
                { label: 'In Progress', value: 'inprogress' },
                { label: 'Completed', value: 'completed' }
            ],
            defaultValue: 'inprogress',
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            },
            db: {
                map: 'status',
                isNullable: false
            }
        }),
        halves: relationship({
            ref: 'Halve.prizePool',
            many: true,
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        })
    },
    db: {
        map: 'prize_pools'
    },
    ui: {
        itemView: {
            defaultFieldMode: 'read'
        }
    }
});


