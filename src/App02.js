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
function buildTaxonomyTrees (data) {
  const f = (e) => { return {label: e._label, value: e._name}}
  const x2j = new X2JS()
  let j = x2j.xml2js(data)
  alert(JSON.stringify(j))
  let roots = j.taxonomies.taxonomy
  let taxonomies = roots.map((root)=>{
    let ret = traverse(root, 'classification', f)
    ret.label = ret.value
    return ret
  })
  return taxonomies
}

class TaxonomySelector extends Component {
  constructor (props) {
    super(props)
    let checked = props.checked || []
    let expanded = props.expanded || []
    this.state = {
      taxonomy: props.taxonomy,
      checked: checked,
      expanded: expanded,
    }
  }
  render() {
    if (!this.state.taxonomy) {
      return <div className='App'>
        データ読み込み中
      </div>
    }
    return (
      <div className="TaxonomySelector">
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
    )
  }
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
    request.get('./taxonomies.xml')
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
    let taxonomies = buildTaxonomyTrees(res.text)
    alert(JSON.stringify(taxonomies))
    this.setState({taxonomy: taxonomies})
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
            noCascade='true'
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
