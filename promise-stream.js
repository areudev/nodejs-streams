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
