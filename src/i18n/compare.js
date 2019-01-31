#!/usr/bin/env node
const arg = process.argv[2]

if (typeof arg === 'undefined') {
  console.log('This is a very simple and tiny tool that checks en.json with any other language and')
  console.log('outputs all the things present in english but missing in foreign language.')
  console.log('')
  console.log('Usage: ./compare.js <lang> ')
  console.log('       or')
  console.log('       node ./compare.js <lang>')
  console.log('')
  console.log('Where <lang> is name of .json file containing language. For ./fi.json it should be:')
  console.log('      ./compare.js fi ')
  console.log('')
  console.log('Limitations: ')
  console.log('* This program does not work with languages left over in messages.js')
  console.log('* This program does not check for extra strings present in foreign language but missing')
  console.log('  in english.js (for now)')
  console.log('')
  console.log('There are no other arguments or options. Make an issue if you encounter a bug or want')
  console.log('some feature to be implemented. Merge requests are welcome as well.')
  return
}

const english = require('./en.json')
const foreign = require(`./${arg}.json`)

function walker (a, b, path = []) {
  Object.keys(a).forEach(k => {
    const aVal = a[k]
    const bVal = b[k]
    const aType = typeof aVal
    const bType = typeof bVal
    const currentPath = [...path, k]
    const article = aType[0] === 'o' ? 'an' : 'a'

    if (bType === 'undefined') {
      console.log(`Foreign language is missing ${article} ${aType} at path ${currentPath.join('.')}`)
    } else if (aType === 'object') {
      if (bType !== 'object') {
        console.log(`Type mismatch! English has ${aType} while foreign has ${bType} at path ${currentPath.join['.']}`)
      } else {
        walker(aVal, bVal, currentPath)
      }
    }
  })
}

walker(english, foreign)
