import styled from 'styled-components'
import {
  space,
  width,
  borderRadius,
  borders,
  borderColor,
  color,
} from 'styled-system'

const Wrapper = styled.div`
  background: ${props => props.theme['select.background']};
  border: 1px solid ${props => props.theme['select.border.color']};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${space}
  ${width}
  ${borderRadius}
  ${borders}
  ${borderColor}
  ${color}

  svg {
    color: ${props => props.theme['select.icon.color']};
  }

  &:focus {
    border: 1px solid ${props => props.theme['select.focus.border.color']};
    outline: none;
  }
`

Wrapper.defaultProps = {
  p: 2,
  borderRadius: 2,
}

export default Wrapper
