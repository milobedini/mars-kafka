type Heading = 'N' | 'E' | 'S' | 'W'
type Coordinates = [x: number, y: number]
const Compass: Array<Heading> = ['N', 'E', 'S', 'W']

const directions = {
  // 1st element is left, 2nd element is right
  N: ['W', 'E'],
  W: ['S', 'N'],
  S: ['E', 'W'],
  E: ['N', 'S'],
}

const rotate = (turns: number) => (heading: Heading) => {
  const idx = Compass.indexOf(heading)
  return Compass[(idx + turns) % 4]
}

const turnLeft =
  // if (x === 'N') return 'W'
  // if (x === 'W') return 'S'
  // if (x === 'S') return 'E'
  // if (x === 'E') return 'N'
  // return 'N'
  // const idx = Compass.indexOf(heading)
  // return Compass[(idx + 3) % 4]
  // So if we are facing N, we want to turn left to face W, this works because the left direction is always the next element in the array
  rotate(3)

const turnRight =
  // initial hardcoded green
  // if (x === 'N') return 'E'
  // if (x === 'W') return 'N'
  // if (x === 'S') return 'W'
  // if (x === 'E') return 'S'
  // return 'N'
  // const idx = Compass.indexOf(heading)
  // return Compass[(idx + 1) % 4]
  rotate(1)

// Initial red test setup
// test('When facing N, turning left should cause us to face W', () => {
//   expect(turnLeft('N')).toBe('W')
// })

// test('When facing W, turning left should cause us to face S', () => {
//   expect(turnLeft('W')).toBe('S')
// })

const move = (heading: Heading, position: Coordinates) => {
  const [x, y] = position
  // Initial simple green
  if (heading === 'N') return [x, y + 1]
  if (heading === 'E') return [x + 1, y]
  if (heading === 'S') return [x, y - 1]
  if (heading === 'W') return [x - 1, y]
}

// ************ TESTS ************

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

test('When moving N, we should increment Y by 1', () => {
  expect(move('N', [1, 1])).toEqual([1, 2])
})
test('When moving E, we should increment X by 1', () => {
  expect(move('E', [1, 1])).toEqual([2, 1])
})
test('When moving S, we should decrease Y by 1', () => {
  expect(move('S', [1, 1])).toEqual([1, 0])
})
test('When moving W, we should decrease X by 1', () => {
  expect(move('W', [1, 1])).toEqual([0, 1])
})
