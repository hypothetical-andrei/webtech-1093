import React from 'react'

class Student extends React.Component {
  constructor (props) {
    super(props)

    this.delete = () => {
      this.props.onDelete(this.props.item.id)      
    }
  }

  render () {
    const { item } = this.props
    return (
      <div>
        <span>{item.name}</span> with address <span>{item.email}</span>
        <span> 
          <input type='button' value='delete' onClick={this.delete} />
        </span>
      </div>
    )
  }
}

export default Student