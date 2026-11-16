import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDuration } from '../src/parse.js';
import { formatDuration } from '../src/format.js';

test('parses single units', () => {
  assert.equal(parseDuration('30s'), 30_000);
  assert.equal(parseDuration('5m'), 300_000);
  assert.equal(parseDuration('2h'), 7_200_000);
  assert.equal(parseDuration('1d'), 86_400_000);
});

test('parses compound units', () => {
  assert.equal(parseDuration('1h30m'), 5_400_000);
  assert.equal(parseDuration('2d3h'), 183_600_000);
});

test('rejects garbage', () => {
  assert.throws(() => parseDuration('abc'));
  assert.throws(() => parseDuration('5x'));
  assert.throws(() => parseDuration(''));
});

test('formats largest units first', () => {
  assert.equal(formatDuration(5_400_000), '1h30m');
  assert.equal(formatDuration(0), '0s');
  assert.equal(formatDuration(90_000), '1m30s');
});
