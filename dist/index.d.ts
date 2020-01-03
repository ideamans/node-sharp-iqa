import Sharp from 'sharp';
export declare function mse(img0: Sharp.Sharp, img1: Sharp.Sharp): Promise<number>;
export declare function psnr(img0: Sharp.Sharp, img1: Sharp.Sharp): Promise<number>;
