const fs = require('fs')

const writeStream = fs.createWriteStream('output.txt')

writeStream.write('Hello, World!\n')
writeStream.end()

writeStream.on('finish', () => {
  console.log('Finished writing data')
})
