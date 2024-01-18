export type Heading = 'N' | 'E' | 'S' | 'W'
export type Coordinates = [x: number, y: number]

export type Rover = {
  heading: Heading
  position: Coordinates
}

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

export const execute = (command: string, state: Rover) => {
  if (command === 'L')
    return {
      ...state,
      heading: turnLeft(state.heading),
    }
  if (command === 'R')
    return {
      ...state,
      heading: turnRight(state.heading),
    }
  if (command === 'M')
    return {
      ...state,
      position: move(state.heading, state.position),
    }
}
