import React from 'react'

import './StudentEditor.css'

import { withRouter } from 'react-router-dom'

import StudentStore from './StudentStore'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

class StudentEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      students: [],
      isAddDialogShown: false,
      isNewRecord: true,
      student: {
        name: '',
        email: ''
      }
    }

    this.store = new StudentStore(this.props.match.params.sgid)

    this.save = () => {
      if (this.state.isNewRecord) {
        this.store.addOne(this.state.student)
      } else {
        this.store.saveOne(this.state.student.id, this.state.student)
      }
      this.setState({
        isAddDialogShown: false
      })
    }

    this.handleChange = (evt) => {
      const student = this.state.student
      student[evt.target.name] = evt.target.value
      this.setState({
        student
      })
    }

    this.showAddDialog = () => {
      const emptyStudent = {
        name: '',
        email: ''
      }
      this.setState({
        isAddDialogShown: true,
        isNewRecord: true,
        student: emptyStudent
      })
    }

    this.hideAddDialog = () => {
      this.setState({
        isAddDialogShown: false
      })
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }

    this.edit = (rowData) => {
      this.setState({
        student: Object.assign({}, rowData),
        isAddDialogShown: true,
        isNewRecord: false
      })
    }

    this.addDialogFooter = (
      <div className='centered'>
      <Button label='save' icon="pi pi-save" className="p-button-rounded p-button-outlined" onClick={this.save} />
    </div>
    )

    this.tableFooter = (
      <div className='centered'>
        <Button icon="pi pi-plus" className="p-button-rounded p-button-outlined" onClick={this.showAddDialog} />
      </div>
    )

    this.opsTemplate = (rowData) => {
      return (
        <div className='ops-container'>
          <span className='spaced'>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-outlined p-button-danger" onClick={() => this.delete(rowData.id)} />            
          </span>
          <span className='spaced'>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-outlined p-button-info" onClick={() => this.edit(rowData)} />            
          </span>
        </div>
      )
    }
  }

  componentDidMount () {
    this.store.getAll()
    
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        students: this.store.data
      })
    })
  }


  render () {
    return (
      <div className='student-editor'>
        <h3 className='centered'>
          i am the student editor for {this.props.match.params.sgid}
        </h3>
        <div>
          <DataTable value={this.state.students} footer={this.tableFooter} >
            <Column header='Name' field='name' />
            <Column header='Email' field='email' />
            <Column body={this.opsTemplate} />
          </DataTable>
          <Dialog   visible={this.state.isAddDialogShown} 
                  onHide={this.hideAddDialog} 
                  header='Add a student' 
                  className='p-fluid' 
                  footer={this.addDialogFooter}>
          <div className='p-field'>
            <label htmlFor="name">Name</label>
            <InputText id="name" name="name" onChange={this.handleChange} value={this.state.student.name} />
          </div>
          <div className='p-field'>
            <label htmlFor="email">Email</label>
            <InputText id="email" name="email" onChange={this.handleChange} value={this.state.student.email} />
          </div>
        </Dialog>
        </div>
      </div>
    )
  }
}

export default withRouter(StudentEditor)