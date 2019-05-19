#!/usr/bin/env node
const program = require('commander');
const utils = require('./utils');
const yaro_db = require('./yarodb');
const client_db = require('./client_db');


program
    .command('create_client_database <client_database_name>')
    .description('Create the ClientDB')
    .action(function(client_database_name){
    connection = utils.getConnection();
    client_db.createClientDatabase(connection, client_database_name);
    connection.end()
    });

program
    .command('create_client_claims_table <client_database_name>')
    .description('Create the ClientDB.CLAIMS table')
    .action(function(client_database_name){
    connection = utils.getConnection();
    client_db.createClientDatabase(connection, client_database_name);
    connection.end()
    });

program
    .command('create_client_claims_type_table <client_database_name>')
    .description('Create the ClientDB.CLAIM_TYPE table')
    .action(function(client_database_name){
    connection = utils.getConnection();
    client_db.createClientDatabase(connection, client_database_name);
    connection.end()
    });

program
    .command('create_yaro_user')
    .description('Create the YaroDB.YARO_USER table')
    .action(function(){
    connection = utils.getConnection();
    yaro_db.createYaroUserTable(connection);
    connection.end()
    });

program
    .command('drop_yaro_user')
    .description('Drop the YaroDB.YARO_USER table')
    .action(function(){
    connection = utils.getConnection();
    yaro_db.dropYaroUserTable(connection);
    connection.end()
    });


program
    .command('drop_yaro_user')
    .description('Drop the YaroDB.YARO_USER table')
    .action(function(){
    connection = utils.getConnection();
    yaro_db.createYaroClientTable(connection);
    connection.end()
    });


program 
    .command('create_all_yaro')
    .description('TODO')
    .action(function(){
        connection = utils.getConnection();
        yaro_db.createYaroUserTable(connection);
        yaro_db.createYaroClientTable(connection);
        connection.end()
    });

program
    .command('create_all_client <client_database_name>')
    .description('TODO')
    .action(function(client_database_name){    
    connection = utils.getConnection();
    client_db.createClientDatabase(connection, client_database_name);
    client_db.createClientClaimsTable(connection, client_database_name);
    client_db.createClientClaimTypeTable(connection, client_database_name);
    connection.end()
    });


program.parse(process.argv)