#!/usr/bin/env node
//Cli for creating Yaro database, client database, and adding sample data
const program = require('commander');

const utils = require('../utils/utils');
const yaro_db = require('./yaro_db');
const client_db = require('./client_db');
const sample_data = require('./sample_data');


program 
    .command('create_yaro_db')
    .description('Create Yaro database: Creates database YaroDB and tables YARO_USER, YARO_CLIENT, YARO_ACTIVE_USER\n')
    .action(async function(){
        const connection = await utils.getConnection();

        await yaro_db.createYaroDatabase(connection);
        await yaro_db.createYaroUserTable(connection);
        await yaro_db.createYaroClientTable(connection);
        await yaro_db.createYaroActiveUserTable(connection);
        await connection.end();
    });

program
    .command('create_client_db <client_name>')
    .description('Create client database: Creates database <client_name> and tables CLAIM_TYPES, CLAIMS\n')
    .action(async function(client_name){    
        const connection = await utils.getConnection();

        await client_db.createClientDatabase(connection, client_name);
        await client_db.createClientClaimsTable(connection, client_name);
        await client_db.createClientClaimTypeTable(connection, client_name);
        await client_db.insertClientDetailsIntoYaroDB(connection, client_name);
        await connection.end();
    });

program
    .command('add_sample_data')
    .description(`Adds sample data: Make sure YaroDB database already exists. Creates and adds sample clients and data, user sample data, and connects sample users to clients\n`)
    .action(async function(){    
        const connection = await utils.getConnection();
        const ClientA = 'BLUES_CLUES';
        const ClientB = 'ATEALOT';

        //Adds Client Details to YaroDB
        await client_db.createClientDatabase(connection, ClientA);
        await client_db.createClientClaimsTable(connection, ClientA);
        await client_db.createClientClaimTypeTable(connection, ClientA);
        await sample_data.insertClientADetailsIntoYaroDB(connection);
        await client_db.createClientDatabase(connection, ClientB);
        await client_db.createClientClaimsTable(connection, ClientB);
        await client_db.createClientClaimTypeTable(connection, ClientB);
        await sample_data.insertClientBDetailsIntoYaroDB(connection);
        //Adds User Sample Data into YaroDB
        await sample_data.insertUserDetailsIntoYaroDB(connection);
        await sample_data.insertActiveUserIntoYaroDB(connection);
        //Adds Claims Sample Data into Client
        await sample_data.insertClaimTypeIntoClientA(connection, ClientA);
        await sample_data.insertClaimIntoClientA(connection, ClientA);
        await sample_data.insertClaimTypeIntoClientB(connection, ClientB);
        await sample_data.insertClaimIntoClientB(connection, ClientB);
        await connection.end();
    });


program.parse(process.argv);
