// @deno-types='https://deno.land/x/qrcode/qrcode.d.ts'
import { qrcode as _qrcode } from './deps.ts';

export function getQrCode(
  text: string,
  alt: string,
  title?: string,
  options?: Options,
): Promise<string> {

  options = options || {};

  const typeNumber: TypeNumber = options.typeNumber || 4;
  const errorCorrectLevel: ErrorCorrectionLevel = options.errorCorrectLevel || 'M';
  const size: number = options.size || 500;

  let qr;

  try {
    qr = _qrcode(typeNumber, errorCorrectLevel || 'M');
    qr.addData(text);
    qr.make();
  } catch (e) {
    if (typeNumber >= 40) {
      throw new Error('Text too long to encode');
    } else {
      return getQrCode(text, alt, title, {
        size: size,
        errorCorrectLevel: errorCorrectLevel,
        typeNumber: (typeNumber + 1 as TypeNumber),
      });
    }
  }

  const cellsize = Math.floor(size / qr.getModuleCount());
  const margin = Math.floor((size - qr.getModuleCount() * cellsize) / 2);

  return qr.createSvgTag(cellsize, margin * 2, alt, title);
}
