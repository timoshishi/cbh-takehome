const crypto = require('crypto');

/**
 * @describe Returns a deterministic partition key for a given input string or object
 * @param {Object|string} [event] - The string to be hashed
 * @param {string} [event.partitionKey] - The string to be hashed
 * @returns {string} - The partition key hashed to a 128 character string in hex
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // if the event.partitionKey is a string, use it as the partition key
  if (typeof event.partitionKey === 'string') {
    return event.partitionKey.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash('sha3-512').update(event.partitionKey).digest('hex')
      : event.partitionKey;
  }

  // stringify the event and hash whatever else is passed in
  return crypto
    .createHash('sha3-512')
    .update(JSON.stringify(event?.partitionKey || event))
    .digest('hex');
};
