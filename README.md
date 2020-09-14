Image quality assessment utility for [sharp](https://www.npmjs.com/package/sharp).

* MSE `.mse`
* PSNR `.psnr`

# Future

* SSIM

# Sample

Use exported `SharpIQA.sharp` because different `sharp` version maybe get segmentation fault.

```js
const SharpIQA = require('sharp-iqa')

(async() {
  const psnr = await SharpIQA.psnr(SharpIQA.sharp('path/image1.png'), SharpIQA.sharp('path/image2.png'))
  console.log(psnr)
})()
```