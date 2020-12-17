import React from 'react'

class StudyGroup extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      description: this.props.item.description,
      type: this.props.item.type
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

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        description: this.state.description,
        type: this.state.type
      })

      this.setState({
        isEditing: false
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.select = () => {
      this.props.onSelect(this.props.item.id)
    }
  }

  render () {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ?
            <>
              <span>
                <input type='text' value={this.state.description} name='description' onChange={this.handleChange} />
              </span>
              <span>
                <input type='text' value={this.state.type} name='type' onChange={this.handleChange} />
              </span>
              <span>
                <input type='button' value='cancel' onClick={this.cancel} />
                <input type='button' value='save' onClick={this.save} />
              </span>
            </>
          :
            <>
              <span>{item.description}</span>
              <span>{item.type}</span>
              <span>
                <input type='button' value='delete' onClick={this.delete} />
                <input type='button' value='edit' onClick={this.edit} />
                <input type='button' value='select' onClick={this.select} />
              </span>
            </>
        }
      </div>
    )
  }
}

export default StudyGroup