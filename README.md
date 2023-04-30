# Introduction

Streams are a powerful feature in Node.js that allow you to work with large amounts of data efficiently. They let you read and write data piece by piece, without having to load the entire dataset into memory.

## Table of Contents

1. What are Streams?
1. Types of Streams
1. Stream Events
1. Readable Streams
1. Writable Streams
1. Duplex and Transform Streams
1. Piping and Chaining Streams
1. Working with File Streams
1. Transform
1. Error Handling

## What are Streams?

Streams are objects in Node.js that facilitate the reading and writing of data in a continuous and efficient manner. They can be used to process large files or data from APIs, without consuming excessive memory.

## Types of Streams

There are four types of streams in Node.js:

1. Readable: Used for reading data from a source.
1. Writable: Used for writing data to a destination.
1. Duplex: Combines both Readable and Writable streams. Can be used for both reading and writing data.
1. Transform: A special type of Duplex stream that can transform data as it is read and written.

## Stream Events

Streams in Node.js are instances of the EventEmitter class, so they can emit and listen to events. Common events for streams are:

- 'data': Emitted when data is available to read.
- 'end': Emitted when there is no more data to read.
- 'error': Emitted when an error occurs.
- 'finish': Emitted when a Writable stream finishes writing.

## Readable Streams

Readable streams are used to read data from a source. Here's a simple example using the fs module to read a file:

```js
const fs = require('fs')

const readStream = fs.createReadStream('input.txt', {encoding: 'utf-8'})

readStream.on('data', chunk => {
  console.log('Received data:', chunk)
})

readStream.on('end', () => {
  console.log('Finished reading data')
})
```

## Writable Streams

Writable streams are used to write data to a destination. Here's an example of writing data to a file:

```js
const fs = require('fs')

const writeStream = fs.createWriteStream('output.txt')

writeStream.write('Hello, World!\n')
writeStream.end()

writeStream.on('finish', () => {
  console.log('Finished writing data')
})
```

## Duplex and Transform Streams

Duplex streams can both read and write data. Transform streams are a special type of Duplex stream that can modify data as it's read and written. Here's an example using the zlib module to compress a file:

```js
const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip()
const readStream = fs.createReadStream('input.txt')
const writeStream = fs.createWriteStream('input.txt.gz')

readStream.pipe(gzip).pipe(writeStream)

writeStream.on('finish', () => {
  console.log('Finished compressing file')
})
```

## Error Handling

```js
const fs = require('fs')

const readStream = fs.createReadStream('nonexistent-file.txt')

readStream.on('error', error => {
  console.error('An error occurred:', error.message)
})
```

## Transform

Transform streams are a type of duplex stream that can be used to process data as it's being read and written. They are useful for modifying or transforming data as it passes through the stream. For example, you might want to convert data to uppercase or compress data as it's being streamed.

```js
const {Transform} = require('stream')

class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const uppercasedChunk = chunk.toString().toUpperCase()
    this.push(uppercasedChunk)
    callback()
  }
}

const uppercaseTransform = new UppercaseTransform()
process.stdin.pipe(uppercaseTransform).pipe(process.stdout)
```

## Pipeline and Promisify

Some best practices when working with streams include:

- Always handle the 'error' event to prevent application crashes.
- Use the pipeline function from the stream module to automatically handle errors and resource management when piping streams:

```js
const fs = require('fs')
const stream = require('stream')
const util = require('util')

const pipeline = util.promisify(stream.pipeline)

async function copyFile(source, destination) {
  try {
    await pipeline(
      fs.createReadStream(source),
      fs.createWriteStream(destination)
    )
    console.log('Finished copying file')
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}

copyFile('source.txt', 'destination.txt')
```
