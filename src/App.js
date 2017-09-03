import React, { Component } from 'react';
import request from 'superagent'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: null
    }
  }
  componentWillMount () {
    request.get('./fruits.json')
      .accept('application/json')
      .end((err, res) =>{
        this.loadedJSON(err, res)
       })
  }
  loadedJSON (err, res) {
    if (err) {
      console.log('JSON読み込みエラー')
      return
    }
    this.setState({
      items: res.body
    })
  }
  render() {
    if (!this.state.items) {
      return <div className='App'>
        データ読み込み中
      </div>
    }
    const options = this.state.items.map(e => {
      return <option value={e.price} key={e.name}>{e.name}</option>
    })
    return (
      <div className="App">
        果物：<select>{options}</select>
      </div>
    );
  }
}

export default App;
