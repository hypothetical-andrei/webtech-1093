import React from 'react'

class Student extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.item.name,
      email: this.props.item.email
    }

    this.delete = () => {
      this.props.onDelete(this.props.item.id)      
    }

    this.edit = () => {
      this.setState({
        isEditing: true
      })
    }

    this.cancel = () => {
      this.setState({
        isEditing: false
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        name: this.state.name,
        email: this.state.email
      })
      this.setState({
        isEditing: false
      })
    }
  }

  render () {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ?
            <>
              <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} />
              <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} />
              <input type='button' value='cancel' onClick={this.cancel} />
              <input type='button' value='save' onClick={this.save} />

            </>
          :
            <>
              <span>{item.name}</span> with address <span>{item.email}</span>
              <span> 
                <input type='button' value='delete' onClick={this.delete} />
                <input type='button' value='edit' onClick={this.edit} />
              </span>
            </>
        }
      </div>
    )
  }
}

export default Student