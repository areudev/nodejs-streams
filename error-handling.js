const fs = require('fs')

const readStream = fs.createReadStream('nonexistent-file.txt')

readStream.on('error', error => {
  console.error('An error occurred:', error.message)
})
