import React from 'react'

class StudyGroupAddForm extends React.Component{
  constructor (props) {
    super(props)

    this.state = {
      description: '',
      type: ''
    }

    this.add = (evt) => {
      this.props.onAdd({
        description: this.state.description,
        type: this.state.type
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

  }

  render () {
    return (
      <div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" onChange={this.handleChange} value={this.state.description} />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input type="text" id="type" name="type" onChange={this.handleChange} value={this.state.type} />
        </div>
        <div>
          <input type="button" value="add" onClick={this.add} />
        </div>
      </div>
    )
  }
}

export default StudyGroupAddForm