import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress,graphiqlExpress } from 'graphql-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models/index';


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

const graphqlEndpoint='/graphql';

app.use('/graphiql', 
graphiqlExpress({endpointURL: graphqlEndpoint}));

app.use('/graphql', bodyParser.json(), 
graphqlExpress({schema}));



models.sequelize.sync().then(()=>{
    app.listen(8081);
})