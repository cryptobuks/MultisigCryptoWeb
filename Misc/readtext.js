var fs = require('fs')
var array = fs.readFileSync('english.txt').toString().split('\n')
var englishWordJson = {}
let i = 0
for (i in array) {
  let word = array[i]
  let firstFour = word.slice(0, 4)

  if (firstFour.length < 4) {
    firstFour = firstFour + '-'
  }
  englishWordJson[firstFour] = word
}
fs.writeFile('./data.json', JSON.stringify(englishWordJson, null, 2), 'utf-8')
