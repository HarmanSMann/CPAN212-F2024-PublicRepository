Here is a sample string to connect to mongoDB

This string specifically connects you to the cluster of your DB and makes a test database if nothing is specified AFTER the "mongodb.net/" at the end
mongodb+srv://SOMETHINGHERE-Username:SOMETHINGHERE-Password@cluster0.SOMETHINGHERE.mongodb.net/

In class last week we made a Bookstore DB, and a collection called books. With that, we need to append the name of our database, like this:
"mongodb+srv://SOMETHINGHERE-Username:SOMETHINGHERE-Password@cluster0.SOMETHINGHERE.mongodb.net/bookstore" <-- LIKE THAT

That will establish a connection to our specific database so we can work with the collections, then we must make a model file so we may contact a specific collection for information