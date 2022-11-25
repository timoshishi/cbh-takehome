const crypto = require('crypto');

/**
 * @describe Returns a deterministic partition key for a given input string or object
 * @param {Object|string} [event] - The string to be hashed
 * @param {string} [event.partitionKey] - The string to be hashed
 * @returns {string} - The partition key
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash('sha3-512').update(data).digest('hex');
    }
  }

  if (candidate) {
    if (typeof candidate !== 'string') {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
  }
  return candidate;
};
