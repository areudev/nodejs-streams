const fs = require('fs')

const readStream = fs.createReadStream('input.txt', {encoding: 'utf-8'})

readStream.on('data', chunk => {
  console.log('Received data:', chunk)
})

readStream.on('end', () => {
  console.log('Finished reading data')
})
