require('./helper').setupOptions();
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ db })
    });
    server.applyMiddleware({ app, path: '/api' });

    app.listen(process.env.SERVER_PORT);

    console.log(`[app]: http://localhost:${process.env.SERVER_PORT}`);
};

mount(express());