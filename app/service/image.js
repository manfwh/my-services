const Service = require('egg').Service;
class ImageService extends Service {
  async base64(stream) {
    return new Promise((resolve, reject) =>{
      var buf = Buffer.alloc(0);
      stream.on('data', chunk =>{
        buf = Buffer.concat([buf, chunk], chunk.length + buf.length)
      })
      stream.on('end', () => {
        resolve(buf.toString('base64'))
      })
    })
  }
  async save(image) {
    return new Promise((resolve, reject) =>{
      var base64Img = Buffer.from(image, 'base64');
      var imgPath = '/public/upload/' + this.ctx.helper.md5(base64Img).digest('hex') + path.extname(filename);
      fs.writeFile('app' + imgPath, base64Img, (err) =>{
        if(err) { 
          reject(err)
        } else {
          resolve(imgPath)
        }
      })
    })
    
  }
}

module.exports = ImageService;