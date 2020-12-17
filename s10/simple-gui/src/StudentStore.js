import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'

class StudentStore {
  constructor (studyGroupId) {
    this.studyGroupId = studyGroupId
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll () {
    try {
      const response = await fetch(`${SERVER}/study-groups/${this.studyGroupId}/students`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_ERROR')
    }
  }

  async addOne (student) {
    try {
      await fetch(`${SERVER}/study-groups/${this.studyGroupId}/students`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_ONE_ERROR')
    }
  }

  async deleteOne (id) {
    try {
      await fetch(`${SERVER}/study-groups/${this.studyGroupId}/students/${id}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_ONE_ERROR')
    }
  }

  async saveOne (id, student) {
    try {
      await fetch(`${SERVER}/study-groups/${this.studyGroupId}/students/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_ONE_ERROR')
    }
  }
}

export default StudentStore