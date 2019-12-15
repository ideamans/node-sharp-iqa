import * as Iqa from '../src'
import Sharp from 'sharp'
import Path from 'path'

import anyTest, { TestInterface } from 'ava'
const test = anyTest as TestInterface<{mycontext: any}>

// test('rgba', async t => {
//   const img = Sharp(Path.join(__dirname, 'sample/rgba2x2.png'))
//   const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
//   console.log(info)
//   console.log(data)
//   t.pass()
// })

async function computeMse(path0: string, path1: string) {
  const img0 = Sharp(path0), img1 = Sharp(path1)
  const mse = await Iqa.mse(img0, img1)
  return mse
}

test('Compare png8 and png24', async t => {
  const mse = await computeMse(
    Path.join(__dirname, 'sample/white2x2-png8.png'),
    Path.join(__dirname, 'sample/white2x2-black1x1-png24.png')
  )
  t.is(mse, 0.25)
})

test('Compare png8 and gray', async t => {
  const mse = await computeMse(
    Path.join(__dirname, 'sample/white2x2-png8.png'),
    Path.join(__dirname, 'sample/white2x2-black1x1-gray.png')
  )
  t.is(mse, 0.25)
})

test('Compare png24 and gray(same)', async t => {
  const mse = await computeMse(
    Path.join(__dirname, 'sample/white2x2-black1x1-png24.png'),
    Path.join(__dirname, 'sample/white2x2-black1x1-gray.png')
  )
  t.is(mse, 0)
})

test('Compare png32 and gray(same)', async t => {
  const mse = await computeMse(
    Path.join(__dirname, 'sample/rgba2x2.png'),
    Path.join(__dirname, 'sample/white2x2-black1x1-gray.png')
  )
  t.is(mse, 0.625)
})
