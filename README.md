# Bird Brain
Node Express server


## Logging In
The controller assumes a password and a valid email address will be provided.
If they match an entry in the user database, the user_id will be returned.
If no user is found, 404 Not Found will be returned.