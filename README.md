# insurance_backend

Three separate databases are created: YaroDB, ClientA (BLUES_CLUES), and ClientB (ATEALOT).

In ***YaroDB***, there's a table that holds **YARO_USER** with `yaro_user_id`, `email`, `username`, `first_name`, `last_name`, `city`, `state`, `dob`, `user_added_date`. **YARO_CLIENT** with `client_id`, `client_db_name`, `client_name`, and `client_added_date`. **YARO_ACTIVE_USER** with `yaro_user_id`, `client_id`, and `active`.

***ClientA*** and ***ClientB*** will both have a table called **CLAIM_TYPE** and **CLAIMS**. Rows will be linked to the YaroDB via the ‘yaro_user_id’. CLAIM_TYPE consists of `claim_type_id`, `procedure_name`, and `description`. CLAIMS consists of `claim_id`, `yaro_user_id`, `client_id`, `claim_type_id`, and `claim_amount`.

GraphQL queries:
1. listClaims
    * takes in a username
    * lists the users claims from both databases
2. getClaim
    * takes in a claim id
    * returns more detailed information about the claim

Tested with Mocha & Chai.

## Table of Contents
* [GraphiQL Queries](#graphiql-queries)
* [Local Setup](#local-setup)
* [How to use CLI](#how-to-use-cli)

## GraphiQL Queries
**listClaims Example:**
![](readmeImages/listClaimsExample.png)

**getClaim Example:**
![](readmeImages/getClaimExample.png)

## Local Setup
1. Clone repo
2. Install packages:
    * If using docker, type `make build-docker` then `make create-container`
    * If not using docker, type `npm install` where there is a package.json 
3. In utils/utils.js:
    ```
    'connectionLimit' : SET_A_LIMIT,
    'host' : 'LOCALHOST_OR_OTHER_HOSTING_OPTIONS',
    'user' : 'USERNAME',
    'password' : PASSWORD
    ```
    * Add password in two ways:
      * Add PASSWORD in a .env file
      * If using docker, type `export PASSWORD=SECRET_PASSWORD` in terminal :/workspace#
4. Where there is a package.json, type `npm start`

## How to use CLI

1. cd ddl/
2. Type 
  * `node cli.js <command>`
    * `-h` or `--help` will print commands and description
    * `create_yaro_db`
      * needs to be ran once to create YaroDB
      * needs to be ran before adding sample data or adding client database
      * creates tables: YARO_USER, YARO_CLIENT, YARO_ACTIVE_USER
    * `add_sample_data`
      * adds sample data that is in /sample_data.js
      * creates 2 sample databases
      * creates 3 sample users with claims and connections with client databases
    * `create_client_db <client_name>`
      * creates client databases
      * creates tables: CLAIM_TYPE, CLAIMS
      * adds client into YARO_CLIENT

    
