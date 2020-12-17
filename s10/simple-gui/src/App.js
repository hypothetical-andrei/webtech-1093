import React from 'react'
import StudyGroup from './StudyGroup'
import StudyGroupAddForm from './StudyGroupAddForm'
import StudyGroupDetails from './StudyGroupDetails'
import store from './StudyGroupStore'

class App extends React.Component {

  constructor () {
    super()

    this.state = {
      studyGroups: [],
      selected: 0
    }

    this.add = (studyGroup) => {
      store.addOne(studyGroup)
    }
    
    this.delete = (id) => {
      store.deleteOne(id)
    }

    this.save = (id, studyGroup) => {
      store.saveOne(id, studyGroup)
    }

    this.select = (id) => {
      this.setState({
        selected: id
      })
    }

    this.cancel = () => {
      this.setState({
        selected: 0
      })
    }

  }

  componentDidMount () {
    store.getAll()
    
    store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        studyGroups: store.data
      })
    })
  }

  render () {
    if (this.state.selected === 0) {
      return (
        <div>
          {
            this.state.studyGroups.map(e => <StudyGroup key={e.id} item={e} onDelete={this.delete} onSave={this.save} onSelect={this.select} />)
          }
          <StudyGroupAddForm onAdd={this.add} />
        </div>
      )
    } else {
      return <StudyGroupDetails onCancel={this.cancel} item={this.state.selected} />
    }
  }
}

export default App
