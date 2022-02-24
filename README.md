# Bird Brain
Node Express server


## Logging In
The controller assumes a password and a valid email address will be provided.
If they match an entry in the user database, the user_id will be returned.
If no user is found, 404 Not Found will be returned.

## Signing up
The controller again assumes the password and email address are valid.
If the email is already in the database, a 409 error will be returned.
If the email doens't match anything, the user will be added to the database, and a 201 status will be returned.