import * as assert from 'assert';

export function objectIdToDate(objectId: string): Date {
    // Ensure the input string is a valid ObjectId
    assert.strictEqual(objectId.length, 24, 'Invalid ObjectId length');
    const hexChars = /^[0-9a-fA-F]+$/;
    assert.ok(hexChars.test(objectId), 'Invalid ObjectId format');
  
    // Convert the hexadecimal string to a number
    const objectIdInt = parseInt(objectId, 16);
  
    // Extract the timestamp from the ObjectId
    const timestamp = (objectIdInt >> 22) & 0x1FFFFFFFFFF;
  
    // Calculate the creation time of the ObjectId
    const creationTime = new Date(timestamp * 1000);
  
    return creationTime;
  }