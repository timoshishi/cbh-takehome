# Deterministic Partition Key

Ideally this function should only be passing in either a string or undefined.

As I am preserving the original behavior, I have not changed the interface of the function.

I have kept the constants defined inside the function for readability's sake.

Making the code slightly more readable by using a single ternary operator instead of several if statements.

The event.partitionKey could be several types so that is hashed in the default return statement.

Any other type of partitionKey will be hashed and the length will not exceed 128 characters as that is the return type
of the crypto.createHash('sha3-256').update().digest('hex') function.
