export type Heading = 'N' | 'E' | 'S' | 'W'
export type Coordinates = [x: number, y: number]

export type Rover = {
  heading: Heading
  position: Coordinates
}

const Compass: Array<Heading> = ['N', 'E', 'S', 'W']

const rotate = (turns: number) => (rover: Rover) => {
  const idx = Compass.indexOf(rover.heading)
  const newHeading = Compass[(idx + turns) % 4]
  return { ...rover, heading: newHeading }
}

const turnLeft = rotate(3)

const turnRight = rotate(1)

const getNextPosition = (heading: Heading, position: Coordinates) => {
  const [x, y] = position

  if (heading === 'N') return [x, y + 1]
  if (heading === 'E') return [x + 1, y]
  if (heading === 'S') return [x, y - 1]
  if (heading === 'W') return [x - 1, y]
}

const move = (rover: Rover): Rover => ({
  ...rover,
  position: getNextPosition(rover.heading, rover.position) as Coordinates,
})

export const apply = (command: string, state: Rover): Rover => {
  if (command === 'L') return turnLeft(state)
  if (command === 'R') return turnRight(state)
  if (command === 'M') return move(state)
  return state
}

export const execute = (commands: string, state: Rover) => {
  let result = state
  for (const cmd of commands.split('')) {
    result = apply(cmd, result)
  }
  return result
}
