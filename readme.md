# PREREQUISITE

- node ^12.0
- mongodb ^4.0
- redis (for job queue)

# HOW TO RUN

1. run mongodb (the code contain transfer feature with transaction). to run mongo transaction feature run with `mongod --replSet rs0`
2. run redis
3. dump database using `mongorestore --archive=example_data`
4. `npm install`
5. `npm start` or `npm test`
6. bull dashboard queue can be accessed from `localhost:3000/queues`

# POSTMAN

attached postman request in a file called `bank.postman_collection.json`

# NOTES

1. test not finished for

   - authentication
   - account transfer

2. there's 2 methods for account trasnfer
3. without mongodb transaction `doDirectTransaction` method (default)
4. with mongodb transaction `doTransaction` method (commented)
