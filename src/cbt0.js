import React, { Component } from 'react';
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import 'font-awesome/css/font-awesome.min.css'

const nodes = [{
  value: 'mars',
  label: 'Mars',
  children: [
    { value: 'phobos', label: 'Phobos' },
    { value: 'deimos', label: 'Deimos' },
  ],
}]

class Widget extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: [],
      expanded: [],
    }
  }
  render() {
    return (
      <CheckboxTree
          nodes={nodes}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={checked => this.setState({ checked })}
          onExpand={expanded => this.setState({ expanded })}
          />
    )
  }
}

export default Widget
