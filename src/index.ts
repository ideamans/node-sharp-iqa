import Sharp from 'sharp'

async function rasterize(img0: Sharp.Sharp, img1: Sharp.Sharp) {
  const raws = await Promise.all([img0, img1].map(img => {
    return img.raw().toBuffer({ resolveWithObject: true })
  }))

  if (raws[0].info.width != raws[1].info.width) throw new Error('different width')
  if (raws[0].info.height != raws[1].info.height) throw new Error('different height')
  if (![3,4].includes(raws[0].info.channels)) throw new Error('channels of img1 is not 3 or 4')
  if (![3,4].includes(raws[1].info.channels)) throw new Error('channels of img2 is not 3 or 4')

  return raws
}

export async function mse(img0: Sharp.Sharp, img1: Sharp.Sharp): Promise<number> {
  const raws = await rasterize(img0, img1)
  const [ info0, info1 ] = [ raws[0].info, raws[1].info ]
  const [ data0, data1 ] = [ raws[0].data, raws[1].data ]

  const channels = Math.max(info0.channels, info1.channels)
  const pixels = info0.height * info0.width

  let se = 0
  for (let p = 0; p < pixels; p++) {
    const offset0 = info0.channels * p,
      offset1 = info1.channels * p

    for (let o = 0; o < 3; o++) {
      const v0 = data0[offset0 + o] || 0,
        v1 = data1[offset1 + o] || 0
      se += (v0 - v1) * (v0 - v1)
    }
    if (channels == 4) {
      const a0 = info0.channels == 4 ? data0[offset0 + 3] : 0xff,
        a1 = info1.channels == 4 ? data1[offset1 + 3] : 0xff
      se += (a0 - a1) * (a0 - a1)
    }
  }

  return se / channels / (0xff * 0xff) / pixels
}

export async function psnr(img0: Sharp.Sharp, img1: Sharp.Sharp): Promise<number> {
  const mseValue = await mse(img0, img1)
  return 10 * Math.log10(1 / mseValue)
}