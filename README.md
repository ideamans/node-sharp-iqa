Image quality assessment utility for [sharp](https://www.npmjs.com/package/sharp).

* MSE `.mse`
* PSNR `.psnr`

# Future

* SSIM

# Sample

```js
const SharpIQA = require('sharp-iqa')

(async() {
  const psnr = await SharpIQA.psnr(Sharp('path/image1.png'), Sharp('path/image2.png'))
  console.log(psnr)
})()
```