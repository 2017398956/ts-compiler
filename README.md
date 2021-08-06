# @saber2pr/ts-compiler

> read ts exports

```bash
yarn add @saber2pr/ts-compiler
```

### Feature

1. read and run ts code, get export vars.
2. traverse ast, get import names.

### usage

```ts
import { compile, readTsExport, readTsFileExport } from '@saber2pr/ts-compiler'

readTsFileExport('./test.ts').then(res => {
  // res is value exported from ./test.ts
  console.log(res)
  console.log(res.test)
})
```