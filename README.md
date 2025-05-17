# TgStorage

Advanced "Saved Messages" of the Telegram.

## Languages
You should add files in the `./src/texts/${lang}/` directory.

## Development
You should create files `.env.dev` or `.env.prod` locally.

## File Reconstruction

Telegram has a 2GB file size limit. TgStorage automatically splits larger files into chunks (part1of3, part2of3, etc.). To recombine downloaded parts, use the following commands: 

**Windows:** copy /b file.part1of3.ext + file.part2of3.ext + file.part3of3.ext file.ext

**Mac/Linux:** cat file.part1of3.ext file.part2of3.ext file.part3of3.ext > file.ext

## MTProto
Based on https://github.com/spalt08/mtproto-js
- Updated layer (166)
- Fixed server time offset
- Fixed writer buffer size
- BigInteger replaced with native BigInt
- Pako replaced with native DecompressionStream
