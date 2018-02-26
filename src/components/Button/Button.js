import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { darken, lighten } from 'polished'
import {
  space,
  width,
  color,
  borders,
  borderRadius,
  fontWeight,
  fontSize,
} from 'styled-system'

const Button = styled.button`
  font-smoothing: antialiased;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: all .2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-color: ${props => props.theme['button.border.color']};
  border-width: ${props => props.theme['button.border.width']};
  border-style: ${props => props.theme['button.border.style']};
  background: ${props => props.theme['button.background']};
  color: ${props => props.theme['button.color']};
  box-shadow: ${props => props.theme['button.shadow']};
  border-radius: ${props => props.theme['button.border.radius']};

  ${props =>
    props.palette &&
    css`
      background: ${props => props.theme.colors[props.palette][3]};
      color: ${props => props.theme.colors[props.palette][0]};
      border-color: ${props => props.theme.colors[props.palette][4]};
    `}

  ${props =>
    props.size &&
    css`
      font-size: ${props =>
        props.theme.fontSizes[props.theme.sizes[props.size]]};
      padding-left: ${props =>
        props.theme.space[props.theme.sizes[props.size] + 1]};
      padding-right: ${props =>
        props.theme.space[props.theme.sizes[props.size] + 1]};
      padding-top: ${props => props.theme.space[props.theme.sizes[props.size]]};
      padding-bottom: ${props =>
        props.theme.space[props.theme.sizes[props.size]]};
    `}

  ${color}
  ${space}
  ${width}
  ${borders}
  ${borderRadius}
  ${fontWeight}
  ${fontSize}

  &:disabled {
    opacity: .25;
    background: ${props => props.theme['button.disabled.background']};
    color: ${props => props.theme['button.disabled.color']};
  }
`

Button.propTypes = {
  /**
   * What type of component is this?
   */
  palette: PropTypes.oneOf([
    'primary',
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink',
    PropTypes.string,
  ]),
  /**
   * How big is it?
   */
  size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']),
  /**
   * Style overrides
   */
  styles: PropTypes.shape({
    color: PropTypes.string,
    border: PropTypes.string,
  }),
}

Button.defaultProps = {
  size: 'md',
  borderRadius: 3,
  palette: 'primary',
}

/** @component */
export default Button
