const QRCode = require('qrcode')
const pLimit = require('p-limit')
const path = require('path')
const fs = require('fs')

const limit = pLimit(5)
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const distPath = './dist'

const exist = fs.existsSync(distPath)

if (!exist) {
  fs.mkdirSync(distPath)
}

const generate = id => {
  QRCode.toFile(`${path.resolve(distPath)}/${id}.png`, `${id}`, {
    version: 40
  }).catch(() => {
    console.error(`id: ${id} generate failue`)
  })
}

const input = ids.map(id => generate(id))

;(async () => {
  await Promise.all(input)
})()