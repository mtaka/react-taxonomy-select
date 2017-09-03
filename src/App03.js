import React, { Component } from 'react';
import request from 'superagent'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import 'font-awesome/css/font-awesome.min.css'
import X2JS from 'x2js'


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
      taxonomies: []
    }
  }
  componentWillMount () {
    //request.get('http://192.168.0.21:3004/taxonomies/2.json')
    request.get('./tagspace_01.json')
      .accept('application/json')
      .end((err, res) => {
        this.loadedJSON(err, res)
      })
  }
  loadedJSON (err, res) {
    if (err) {
      console.log('JSON読み込みエラー')
      return
    }
    //alert(JSON.stringify(res.body.tagspace.taxonomies))
    this.setState({taxonomies: res.body.tagspace.taxonomies})
    this.setState({refs: res.body.tagspace.refs})
    this.setState({expanded: res.body.tagspace.toplevel})
    //let taxonomies = buildTaxonomyTrees(res.text)
    //alert(JSON.stringify(taxonomies))
    //this.setState({taxonomy: taxonomies})
  }
  checkedLabel () {
    return this.state.checked.map((i) => {
      return this.state.refs[i]
    }).join(' ')
  }
  render() {
    return (
      <div className="App">
        <div>
        { /* JSON.stringify(this.state.taxonomies) */}
        </div>
        <div>
          <CheckboxTree
            nodes={this.state.taxonomies}
            checked={this.state.checked}
            noCascade='true'
            expanded={this.state.expanded}
            onCheck ={checked  => this.setState({ checked  })}
            onExpand={expanded => this.setState({ expanded })}
            />
        </div>
        <div>
          {
            //this.state.checked.join(' ')
            this.checkedLabel()
          }
        </div>
      </div>
      )
  }
}

class App_ extends Component {
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
    //let taxonomies = buildTaxonomyTrees(res.text)
    //alert(JSON.stringify(taxonomies))
    //this.setState({taxonomy: taxonomies})
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
