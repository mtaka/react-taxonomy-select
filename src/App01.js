import React, { Component } from 'react';
import request from 'superagent'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import 'font-awesome/css/font-awesome.min.css'
import X2JS from 'x2js'

function traverse (e, chName, f) {
  let ch = e[chName]
  if(typeof ch === 'undefined') {
    return f(e)
  } else {
    let ret = f(e)
    ret.children = ch.map((e) => { return traverse(e, chName, f)})
    return ret
  }
}

function buildTaxonomyTree (data) {
  const f = (e) => { return {label: e._label, value: e._name}}
  const x2j = new X2JS()
  let j = x2j.xml2js(data)
  let root = j.taxonomy
  let taxonomy = traverse(root, 'classification', f)
  return taxonomy.children
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: [],
      expanded: [],
      taxonomy: null
    }
  }
  componentWillMount () {
    request.get('./industries.xml')
      .accept('application/xml')
      .end((err, res) => {
        this.loadedJSON(err, res)
      })
  }
  loadedJSON (err, res) {
    if (err) {
      console.log('JSON読み込みエラー')
      return
    }
    let taxonomy = buildTaxonomyTree(res.text)
    //alert(JSON.stringify(taxonomy))
    this.setState({taxonomy: taxonomy})
  }
  render() {
    if (!this.state.taxonomy) {
      return <div className='App'>
        データ読み込み中
      </div>
    }
    return (
      <div className="App">
        <div>
        { /* JSON.stringify(this.state.taxonomy) */}
        </div>
        <div>
          <CheckboxTree
            nodes={this.state.taxonomy}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck ={checked  => this.setState({ checked  })}
            onExpand={expanded => this.setState({ expanded })}
            />
        </div>
        <div>
          { this.state.checked.join(' ') }
        </div>
      </div>
    );
  }
}

export default App;
