import React, { Component } from 'react';
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import 'font-awesome/css/font-awesome.min.css'

const nodes = [
  { value: 'INDUSTRIES', label: '産業分類', children: [
      { value: 'MFG', label: '製造', children: [
        { value: 'DISC', label: '組立製造' },
        { value: 'PROC', label: 'プロセス製造' },
      ]},
      { value: 'DIST', label: '流通', children: [
        { value: 'WHS', label: '卸' },
        { value: 'RET', label: '小売' },
      ]},
        { value: 'INFO', label: '情報サービス', children: [
        { value: 'MEDIA', label: 'メディア' },
        { value: 'ITSVC', label: 'ソフトサービス' },
      ]},
        { value: 'FIN', label: '金融', children: [
        { value: 'BANK', label: '銀行' },
        { value: 'SEC', label: '保険証券' },
      ]},
  ]}
]

class Widget extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: props.initial.checked,
      expanded: props.initial.expanded,
    }
  }
  render() {
    return (
      <div>
        <CheckboxTree
            nodes={nodes}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={
              (checked) => {
                this.setState({ checked })
              }
            }
            onExpand={expanded => this.setState({ expanded })}
            />
        <div>
          <span>現在の選択値: </span>
          <span>{ this.state.checked.join(' ') }</span>
        </div>
      </div>
    )
  }
}

export default Widget
