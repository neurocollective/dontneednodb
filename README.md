# dontneednodb

## Thesis

This is an experiment for creating a service + data storage for a situation where the host emachine _will not_ or _can not_ connect to a Database (db).

If you _can_ connect your service to a Dd, you probably should, and SHOULD NOT BOTHER with this! Databases are great, and this repo cannot replace the effectiveness and quality of a dependable db (i see you postgres, you beautiful butterfly).

This project is best suited for an environment, where, not merely lacking a database, the service may be re-started at any time, and has unreliable access to disk space. (kubernetes is a great example).

Still sound like your use case? Ok, if you really can't use a db, and you can't just dump data into a file on your cloud machine's disk or whatever, this might be for you...

## How to store data without a db or disk?

Simple: don't! `dontneednodb` relies on one or more _clients_ regularly "phoning home" to the "mothership" service to receive data updates as things change. As the clients phone home, copies of the data are pushed out to them and encrypted (only the mothership can decrypt the data).

So `dontneednodb` is a distributed data store, sort of, and a consensus engine, sort of.

Think of `dontneednodb` sort of like amazon.com's affiilate seller business model: `dontneednodb` can control, move, and ship massive amounts of inventory, while not necessarily having any inventory of its own.

If the `dontneednodb` instance gets wiped, it will restart with basic knowledge of which clients are authorized, and receive re-hydration instructions from the _clients_.
