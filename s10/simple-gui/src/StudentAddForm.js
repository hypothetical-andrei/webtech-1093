import React from 'react'

class StudentAddForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: ''
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.add = () => {
      this.props.onAdd({
        name: this.state.name,
        email: this.state.email
      })
    }
  }

  render () {
    return (
      <div>
         <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} />
        </div>
        <div>
          <input type="button" value="add" onClick={this.add} />
        </div>
      </div>
    )
  }
}

export default StudentAddForm