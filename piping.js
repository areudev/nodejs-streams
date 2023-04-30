const fs = require('fs')
const zlib = require('zlib')

const gunzip = zlib.createGunzip()
const readStream = fs.createReadStream('input.txt.gz')
const writeStream = fs.createWriteStream('decompressed.txt')

readStream.pipe(gunzip).pipe(writeStream)

writeStream.on('finish', () => {
  console.log('Finished decompressing file')
})
