# Bird Brain
Node Express server


## Logging In
Bird Brain assumes a password and a valid email address will be provided.
If they match an entry in the user database, the `user_id` will be returned.
If no user is found, 404 Not Found will be returned.

## Signing up
Bird Brain again assumes the password and email address are valid.
If the email is already in the database, a `409` error will be returned.
If the email doens't match anything, the user will be added to the database, and a `201` status will be returned.

## Getting Fact Cards
Bird Brain must be given a valid `user_id`.
It assumes the `user_id` given will always be valid, because the front end was given a valid `user_id` in response to the GET /login request.
This endpoint returns an array with any and all cards the user owns, and an empty array if the user owns no cards.

## Uploading Photos
Bird Brain expects to be given a multipart form with an image file tagged as "photo", as in the below example:

```
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```

It also expects to be given a `user_id` field with a valid value.
Current this endpoint returns a (hilarious) `404: Kate Moss not found` message, but once the model has been connected this will change.