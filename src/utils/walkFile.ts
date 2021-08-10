import { readFile } from 'fs';
import { promisify } from 'util';

import * as fsWalk from '@nodelib/fs.walk';

export const walkFile = async (dirPath: string) => {
  const entries = await new Promise<fsWalk.Entry[]>((resolve, reject) => {
    fsWalk.walk(
      dirPath,
      {
        entryFilter: entry => {
          const isNotNodeModules = !entry.path.includes('node_modules')
          const isNotGit = !entry.path.includes('.git')
          const isNotMin = !/\.min\.js$/.test(entry.path)
          const isCode = /\.ts$|\.tsx$|\.js$|\.jsx$/.test(entry.name)
          return (
            isNotNodeModules &&
            isNotGit &&
            isNotMin &&
            isCode
          )
        },
      },
      (error, entries) => {
        if (error) {
          reject(error)
        } else {
          resolve(entries)
        }
      }
    )
  })
  return Promise.all(
    entries.map(node =>
      promisify(readFile)(node.path).then(res => ({
        ...node,
        content: res.toString(),
      }))
    )
  )
}