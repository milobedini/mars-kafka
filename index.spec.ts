const turnLeft = (x: string) => {
  if (x === 'N') return 'W'
  if (x === 'W') return 'S'
  if (x === 'S') return 'E'
  if (x === 'E') return 'N'
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
