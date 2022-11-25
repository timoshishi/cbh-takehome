const { deterministicPartitionKey } = require('./dpk');
const crypto = require('crypto');
describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it('Always returns a string', () => {
    const trivialKey = deterministicPartitionKey('123');
    expect(typeof trivialKey).toBe('string');
  });

  it('Returns the same value if the same input is passed in twice', () => {
    const trivialKey = deterministicPartitionKey('123');
    const trivialKey2 = deterministicPartitionKey('123');
    expect(trivialKey).toBe(trivialKey2);
  });

  it('Returns a different value if a different input is passed in', () => {
    const trivialKey = deterministicPartitionKey('abc123');
    const trivialKey2 = deterministicPartitionKey('123abc');
    expect(trivialKey).not.toBe(trivialKey2);
  });

  it('Returns a deterministic key of less than the maximum length', () => {
    const trivialKey = deterministicPartitionKey('abc123adsfdasfdasfadsfdsafsadfaaaaaaaaaaaaaaaaaaafddsafdsfadf');
    expect(trivialKey.length).toBeLessThanOrEqual(256);
  });

  it('Returns a key of 128 characters if the input is is not "0"', () => {
    const trivialKey = deterministicPartitionKey('abc123adsfdasfdasfadsfdsafsadfaaaaaaaaaaaaaaaaaaafddsafdsfadf');
    expect(trivialKey.length).toBe(128);
  });

  it('Returns a string that only has valid hex characters in it', () => {
    const trivialKey = deterministicPartitionKey('ABC12a3');
    expect(trivialKey).toMatch(/^[0-9a-fA-F]+$/);
  });

  it('Returns a hash for an event object passed in with a property called "partitionKey"', () => {
    const event = {
      partitionKey: '123',
    };
    const trivialKey = deterministicPartitionKey(event);
    console.log(trivialKey);
    expect(trivialKey).toBe('123');
  });

  it('Returns a hash for an object passed in without a property called "partitionKey"', () => {
    const event = {};
    const trivialKey = deterministicPartitionKey(event);
    console.log(trivialKey);
    expect(trivialKey).toMatch(/^[0-9a-fA-F]+$/);
  });
});
