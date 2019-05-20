#!/usr/bin/env node
const program = require('commander');

const utils = require('./utils');
const yaro_db = require('./yaro_db');
const client_db = require('./client_db');


program
    .command('create_client <client_name>')
    .description('Create ClientDB database')
    .action(function(client_name){
        connection = utils.getConnection();
        client_db.createClientDatabase(connection, client_name);
        connection.end();
    });

program
    .command('create_client_claims <client_name>')
    .description('Create the ClientDB.CLAIMS table')
    .action(function(client_name){
        connection = utils.getConnection();
        client_db.createClientClaimsTable(connection, client_name);
        connection.end();
    });

program
    .command('create_client_claim_types <client_name>')
    .description('Create the ClientDB.CLAIM_TYPES table')
    .action(function(client_name){
        connection = utils.getConnection();
        client_db.createClientClaimTypesTable(connection, client_name);
        connection.end();
    });

program
    .command('drop_client <client_name>')
    .description('Drop ClientDB database')
    .action(function(client_name){
        connection = utils.getConnection();
        client_db.dropClientDatabase(connection, client_name);
        connection.end();
    });

program
    .command('drop_client_claims <client_name>')
    .description('Drop ClientDB.CLAIMS table')
    .action(function(client_name){
        connection = utils.getConnection();
        client_db.dropClientClaimsTable(connection, client_name);
        connection.end();
    });

program
    .command('drop_client_claim_types <client_name>')
    .description('Drop ClientDB.CLAIMS_TYPES table')
    .action(function(client_name){
        connection = utils.getConnection();
        client_db.dropClientClaimTypesTable(connection, client_name);
        connection.end();
    });

program
    .command('create_yaro_user')
    .description('Create the YaroDB.YARO_USER table')
    .action(function(){
        connection = utils.getConnection();
        yaro_db.createYaroUserTable(connection);
        connection.end();
    });

program
    .command('create_yaro_client')
    .description('Drop the YaroDB.YARO_CLIENT table')
    .action(function(){
        connection = utils.getConnection();
        yaro_db.createYaroClientTable(connection);
        connection.end();
    });


program
    .command('drop_yaro_user')
    .description('Drop the YaroDB.YARO_USER table')
    .action(function(){
        connection = utils.getConnection();
        yaro_db.dropYaroUserTable(connection);
        connection.end();
    });

program
    .command('drop_yaro_client')
    .description('Drop the YaroDB.YARO_CLIENT table')
    .action(function(){
        connection = utils.getConnection();
        yaro_db.dropYaroClientTable(connection);
        connection.end();
    });


program 
    .command('create_yaro_archit')
    .description('Create Yaro architecture: creates Yaro user table and Yaro client table')
    .action(function(){
        connection = utils.getConnection();
        yaro_db.createYaroUserTable(connection);
        yaro_db.createYaroClientTable(connection);
        connection.end();
    });

program
    .command('create_client_archit <client_name>')
    .description('Create client architecture: creates client database, client claims table, and client claim types table')
    .action(function(client_name){    
        connection = utils.getConnection();
        client_db.createClientDatabase(connection, client_name);
        client_db.createClientClaimsTable(connection, client_name);
        client_db.createClientClaimTypesTable(connection, client_name);
        connection.end();
    });

program 
    .command('drop_yaro_archit')
    .description('Drop Yaro architecture: drops Yaro user table and Yaro client table')
    .action(function(){
        connection = utils.getConnection();
        yaro_db.dropYaroUserTable(connection);
        yaro_db.dropYaroClientTable(connection);
        connection.end();
    });

program
    .command('drop_client_archit <client_name>')
    .description('Drop client architecture: drops client database, client claims table, and client claim types table')
    .action(function(client_name){    
        connection = utils.getConnection();
        client_db.dropClientDatabase(connection, client_name);
        client_db.dropClientClaimsTable(connection, client_name);
        client_db.dropClientClaimTypesTable(connection, client_name);
        connection.end();
    });


program.parse(process.argv);