import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import Icon from '../Icon'
import { MenuItem } from '../Menu'
import Checkbox from '../Checkbox'
import Popover from '../Popover'
import Popper from '../Popper'
import Wrapper from './Wrapper'
import OptionWrapper from './OptionWrapper'

const Tag = styled.div`
  border-radius: 12px;
  padding: 3px 6px;
  background: ${props => props.theme.colors.primary[3]};
  color: #fff;
  ${space};
`

class MultiSelect extends PureComponent {
  handleChange = (e, option, checked) => {
    e.stopPropagation()
    const { getValue, allowEmpty = true } = this.props
    const value = getValue(option)

    // Add or remove the value
    const combined = checked
      ? this.props.selected.concat(option)
      : this.props.selected.filter(s => getValue(s) !== value)

    // Don't allow empty selection unless explicitly allowed
    if (!combined.length && allowEmpty) {
      return this.props.onChange([])
    }

    if (!combined.length && !allowEmpty) {
      return false
    }

    // Trigger the onChange prop and ensure unique values
    this.props.onChange(Array.from(new Set(combined)))
  }

  handleOptionClick = (e, option, close) => {
    const { getValue, appendOnLabelClick } = this.props
    if (!appendOnLabelClick) {
      e.stopPropagation()
      this.props.onChange([option])
      close()
    } else {
      const value = getValue(option)
      const isSelected =
        this.props.selected.find(s => getValue(s) === value) !== undefined
      this.handleChange(e, option, !isSelected)
    }
  }

  renderOption(option) {
    const { renderOption } = this.props

    // If option renderer is provided, use that
    if (renderOption) {
      return renderOption(option)
    }

    // Use a simple span to render options
    return <span>{option.label}</span>
  }

  // This gets rendered every time even if the content is not shown, don't do that
  renderOptions(close) {
    const {
      getLabel,
      getValue,
      optionStyles,
      menuItemProps,
      checkboxProps,
    } = this.props

    return (
      <OptionWrapper borderRadius={0} p={0} m={0}>
        {this.props.options.map(o => {
          const label = getLabel(o)
          const value = getValue(o)
          return (
            <MenuItem
              key={value}
              onClick={e => this.handleOptionClick(e, o)}
              style={optionStyles}
              {...menuItemProps}
            >
              <Checkbox
                className="checkbox"
                name={label}
                id={label}
                value={o}
                label={this.renderOption(o)}
                checked={
                  this.props.selected.find(s => getValue(s) === value) !==
                  undefined
                }
                onChange={this.handleChange}
                onLabelClick={e => {
                  e.stopPropagation()
                  this.handleOptionClick(e, o, close)
                }}
                {...checkboxProps}
              />
            </MenuItem>
          )
        })}
      </OptionWrapper>
    )
  }

  renderPlaceholder() {
    const {
      selected,
      renderMultiSelected,
      renderSelected,
      placeholder,
      getLabel,
    } = this.props

    if (selected.length === 0) {
      return <span>{placeholder || 'Select Options'}</span>
    }

    if (selected.length === 1 && renderSelected) {
      return renderSelected(selected[0])
    }

    if (selected.length === 1 && !renderSelected) {
      return <Tag>{getLabel(selected[0])}</Tag>
    }

    if (selected.length > 1 && !renderMultiSelected) {
      return selected.map(s => (
        <Tag mr={1} key={getLabel(s)}>
          <div key={getLabel(s)}>{this.renderOption(s)}</div>
        </Tag>
      ))
    }

    if (selected.length > 1) {
      return renderMultiSelected(selected)
    }
  }

  renderTrigger() {
    return (
      <div>
        <Wrapper className="ri-multiselect" {...this.props} tabIndex="0">
          {this.renderPlaceholder()}
          <Icon type="chevron-down" size={20} style={{ marginLeft: 'auto' }} />
        </Wrapper>
      </div>
    )
  }

  render() {
    const { popoverProps } = this.props

    return (
      <Popper
        trigger={this.renderTrigger()}
        animation="slide"
        position="bottom"
        on="click"
        arrow={false}
        fullWidth
        {...popoverProps}
      >
        {close => this.renderOptions(close)}
      </Popper>
    )
  }
}

MultiSelect.defaultProps = {
  selected: [],
  appendOnLabelClick: true,
  popoverProps: {
    boxShadow: 'none',
    mt: '-1px',
  },
  checkboxProps: {
    mr: 1,
  },
  menuItemProps: {},
  optionStyles: {
    padding: 10,
  },
}

export default MultiSelect
