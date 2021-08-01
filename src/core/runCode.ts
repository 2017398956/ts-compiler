import { dirname, resolve } from 'path';
import vm from 'vm';

import { contextModuleMap } from './compiler';

const cjsModule = {
  exports: {}, require: (id: string) => {
    const uri = resolve(id)
    if (uri in contextModuleMap) {
      return runCode(contextModuleMap[uri], uri)
    }
    return module.require(id)
  }
}

const createModule = (code: string) =>
  `;((module)=>{${code};exports.default=typeof exports.default=='undefined'?module.exports:exports.default;return module.exports;})({exports})`

export const runCode = (code: string, __fileName?: string) => {
  return vm.runInNewContext(createModule(code), vm.createContext({
    ...cjsModule,
    __dirname: dirname(__fileName),
    __filename: __fileName
  }))
}