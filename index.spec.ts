const turnLeft = (x: string) => {
  if (x === 'N') return 'W'
  if (x === 'W') return 'S'
  if (x === 'S') return 'E'
  if (x === 'E') return 'N'
  return 'N'
}
const turnRight = (x: string) => {
  if (x === 'N') return 'E'
  if (x === 'W') return 'N'
  if (x === 'S') return 'W'
  if (x === 'E') return 'S'
  return 'N'
}
// test('When facing N, turning left should cause us to face W', () => {
//   expect(turnLeft('N')).toBe('W')
// })

// test('When facing W, turning left should cause us to face S', () => {
//   expect(turnLeft('W')).toBe('S')
// })
test.each`
  original | expected
  ${'N'}   | ${'W'}
  ${'W'}   | ${'S'}
  ${'S'}   | ${'E'}
  ${'E'}   | ${'N'}
`(
  'When facing $original, turning left should cause us to face $expected',
  ({ original, expected }) => {
    expect(turnLeft(original)).toBe(expected)
  }
)

test.each`
  original | expected
  ${'N'}   | ${'E'}
  ${'W'}   | ${'N'}
  ${'S'}   | ${'W'}
  ${'E'}   | ${'S'}
`(
  'When facing $original, turning right should cause us to face $expected',
  ({ original, expected }) => {
    expect(turnRight(original)).toBe(expected)
  }
)
