import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

const validators = [
  new MaxFileSizeValidator({ maxSize: 3000000 }),
  new FileTypeValidator({ fileType: 'image/(png|jpeg|jpg)' }),
];

export const PicturePipe = new ParseFilePipe({ validators });

export const OptionalPicturePipe = new ParseFilePipe({
  fileIsRequired: false,
  validators,
});
