import { Coordinates, Heading, Rover, execute } from '.'

const start = () => [1, 1]
const rover = (heading: Heading, position?: Coordinates): Rover => ({
  heading,
  position: position || (start() as Coordinates),
})

test.each`
  original | expected | direction
  ${'N'}   | ${'W'}   | ${'L'}
  ${'W'}   | ${'S'}   | ${'L'}
  ${'S'}   | ${'E'}   | ${'L'}
  ${'E'}   | ${'N'}   | ${'L'}
  ${'N'}   | ${'E'}   | ${'R'}
  ${'W'}   | ${'N'}   | ${'R'}
  ${'S'}   | ${'W'}   | ${'R'}
  ${'E'}   | ${'S'}   | ${'R'}
`(
  'When facing $original, turning $direction should cause us to face $expected',
  ({ original, expected, direction }) => {
    expect(execute(direction, rover(original))).toEqual(rover(expected))
  }
)

// Stage 2
test('When moving N, we should increment Y by 1', () => {
  expect(execute('M', rover('N'))).toEqual(rover('N', [1, 2]))
})

test('When moving E, we should increment X by 1', () => {
  expect(execute('M', rover('E'))).toEqual(rover('E', [2, 1]))
})

test('When moving S, we should decrease Y by 1', () => {
  expect(execute('M', rover('S'))).toEqual(rover('S', [1, 0]))
})

test('When moving W, we should decrease X by 1', () => {
  expect(execute('M', rover('W'))).toEqual(rover('W', [0, 1]))
})

// First example in kafka.
test('When executing multiple commands', () => {
  expect(execute('LMLMLMLMM', rover('N', [1, 2]))).toEqual(rover('N', [1, 3]))
})
// Second example in kafka.
test('When executing multiple commands', () => {
  expect(execute('MMRMMRMRRM', rover('E', [3, 3]))).toEqual(rover('E', [5, 1]))
})
