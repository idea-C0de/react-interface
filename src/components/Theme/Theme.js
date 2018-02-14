import React from 'react'
import Color from 'color'
import { withTheme } from 'styled-components'
import { Flex, Box } from 'grid-styled'

const groupColorsByName = colors => {
  const grouped = Object.keys(colors)
    .filter(c => /\d/.test(c))
    .map(c => ({ name: c, color: colors[c] }))
    .reduce((acc, curr) => {
      const group = curr.name.match(/[a-zA-Z]+/g)[0]
      acc[group] = acc[group] ? [...acc[group], curr] : [curr]
      return acc
    }, {})

  return Object.keys(grouped).map(g => (
    <Box w={1/3} p={1}>
      {grouped[g].map(p => (
        <div
          style={{
            background: p.color,
            padding: 10,
            color: Color(p.color).light() ? '#000' : '#FFF'
          }}
        >
          {p.name}
        </div>
      ))}
    </Box>
  ))
}

const Theme = props => (
  <Flex wrap='wrap'>
    {groupColorsByName(props.theme.colors)}
  </Flex>
)

export default withTheme(Theme)

