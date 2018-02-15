import React from 'react'
import styled from 'styled-components'
import Popper from '../Popper'
import { Menu, MenuItem } from '../Menu'
import Icon from '../Icon'
import Wrapper from './Wrapper'

const Placeholder = styled.span`
  color: ${props => props.theme['select.placeholder.color']};
`

class Select extends React.Component {
  renderPlaceholder () {
    return <Placeholder>{this.props.placeholder}</Placeholder>
  }

  renderSelectedValue () {
    const { value, options } = this.props
    return <span>{options.find(o => o.value === value).label}</span>
  }

  renderOptions () {
    return close => (
      <Menu borderRadius={0} p={0} m={0}>
        {this.props.options.map(o => (
          <MenuItem
            key={o.value}
            borderRadius={0}
            onClick={() => {
              this.props.onChange(o.value)
              close()
            }}
          >
            {o.label}
          </MenuItem>
        ))}
      </Menu>
    )
  }

  renderChildren () {
    const { value, ...rest } = this.props
    return (
      // Cannot assign ref to styled-component, so we must wrap it
      <div>
        <Wrapper {...rest} className="ri-select">
          {!value && this.renderPlaceholder()}
          {value && this.renderSelectedValue()}
          <Icon
            type="chevron-down"
            size={20}
            style={{ marginLeft: 'auto', display: 'inherit' }}
          />
        </Wrapper>
      </div>
    )
  }

  render () {
    const { value, ...rest } = this.props
    return (
      <Popper
        trigger={this.renderChildren()}
        position="bottom"
        on="click"
        arrow={false}
        fullWidth
        contentStyle={{ marginTop: -1 }}
      >
        {this.renderOptions()}
      </Popper>
    )
  }
}

export default Select
