import { Coordinates, Heading, execute } from '.'

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
    const initialState = {
      heading: original,
      position: [1, 1] as Coordinates,
    }
    expect(execute(direction, initialState)).toEqual({
      ...initialState,
      heading: expected,
    })
  }
)

// Stage 2
test('When moving N, we should increment Y by 1', () => {
  const initialState = {
    heading: 'N' as Heading,
    position: [1, 1] as Coordinates,
  }
  expect(execute('M', initialState)).toEqual({
    ...initialState,
    position: [1, 2],
  })
})

test('When moving E, we should increment X by 1', () => {
  const initialState = {
    heading: 'E' as Heading,
    position: [1, 1] as Coordinates,
  }
  expect(execute('M', initialState)).toEqual({
    ...initialState,
    position: [2, 1],
  })
})

test('When moving S, we should decrease Y by 1', () => {
  const initialState = {
    heading: 'S' as Heading,
    position: [1, 1] as Coordinates,
  }
  expect(execute('M', initialState)).toEqual({
    ...initialState,
    position: [1, 0],
  })
})

test('When moving W, we should decrease X by 1', () => {
  const initialState = {
    heading: 'W' as Heading,
    position: [1, 1] as Coordinates,
  }
  expect(execute('M', initialState)).toEqual({
    ...initialState,
    position: [0, 1],
  })
})
