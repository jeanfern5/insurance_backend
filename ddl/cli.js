#!/usr/bin/env node
const program = require('commander');

const utils = require('./utils');
const yaro_db = require('./yaro_db');
const client_db = require('./client_db');


program 
    .command('create_yaro_db')
    .description('Create Yaro database: creates database YaroDB and tables YARO_USER, YARO_CLIENT, YARO_ACTIVE_USER')
    .action(function(){
        const connection = utils.getConnection();
        yaro_db.createYaroDatabase(connection);
        yaro_db.createYaroUserTable(connection);
        yaro_db.createYaroClientTable(connection);
        yaro_db.createYaroActiveUserTable(connection);
        connection.end();
    });

program
    .command('create_client_db <client_name>')
    .description('Create client database: creates database <client_name> and tables CLAIM_TYPES, CLAIMS')
    .action(function(client_name){    
        const connection = utils.getConnection();
        client_db.createClientDatabase(connection, client_name);
        client_db.createClientClaimsTable(connection, client_name);
        client_db.createClientClaimTypeTable(connection, client_name);
        client_db.insertClientDetailsIntoYaroDB(connection, client_name);
        connection.end();
    });


program.parse(process.argv);