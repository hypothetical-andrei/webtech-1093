import React from 'react'
import StudentStore from './StudentStore'
import Student from './Student'
import StudentAddForm from './StudentAddForm'

class StudyGroupDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      students: []
    }

    this.cancel = () => {
      this.props.onCancel()
    }

    this.store = new StudentStore(this.props.item)

    this.add = (student) => {
      this.store.addOne(student)
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }

    this.save = (id, student) => {
      this.store.saveOne(id, student)
    }
  }

  componentDidMount() {
    this.store.getAll()

    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        students: this.store.data
      })
    })
  }

  render () {
    return (
      <div>
        i will be the details for {this.props.item}
        <div>
          {
            this.state.students.map(e => <Student item={e} key={e.id} onDelete={this.delete} onSave={this.save} />)
          }
        </div>
        <StudentAddForm onAdd={this.add} />
        <input type='button' value='cancel' onClick={this.cancel} />
      </div>
    )
  }
}

export default StudyGroupDetails