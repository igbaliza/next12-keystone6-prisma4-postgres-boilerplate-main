import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { PrizePool } from './src/schemas/prize-pool';
import { Halve } from './src/schemas/halve';
import { User } from './src/schemas/user';

const auth = createAuth({
  identityField: 'name',
  secretField: 'password',
  listKey: 'User',
  sessionData: `id name`,
  initFirstItem: {
    fields: ['name', 'password']
  },
});

export default auth.withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: String(process.env.DATABASE_URL),
      enableLogging: true,
      useMigrations: true,
      idField: { kind: 'uuid' },
      shadowDatabaseUrl: String(process.env.SHADOW_DATABASE_URL),
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    lists: { PrizePool, Halve, User },
    session: statelessSessions({ 
      secret: String(process.env.SESSION_SECRET) || 'c4f190f9-2751-4eb0-9540-6f36ecf9a8d7'
    })
  })
);
