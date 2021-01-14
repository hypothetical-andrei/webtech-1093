import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

import { withRouter } from 'react-router-dom'

import './StudyGroupEditor.css'

import store from './StudyGroupStore'

class StudyGroupEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      studyGroups: [],
      isAddDialogShown: false,
      isNewRecord: true,
      studyGroup: {
        description: '',
        type: ''
      }
    }

    this.hideAddDialog = () => {
      this.setState({
        isAddDialogShown: false
      })
    }

    this.showAddDialog = () => {
      this.setState({
        isAddDialogShown: true,
        isNewRecord: true
      })
    }

    this.save = () => {
      if (this.state.isNewRecord) {
        store.addOne(this.state.studyGroup)
      } else {
        store.saveOne(this.state.studyGroup.id, this.state.studyGroup)
      }
      this.setState({
        isAddDialogShown: false
      })
    }

    this.addDialogFooter = (
      <div className='centered'>
      <Button label='save' icon="pi pi-save" className="p-button-rounded p-button-outlined" onClick={this.save} />
    </div>
    )

    this.handleChange = (evt) => {
      const studyGroup = this.state.studyGroup
      studyGroup[evt.target.name] = evt.target.value
      this.setState({
        studyGroup: studyGroup
      })
    }

    this.delete = (id) => {
      store.deleteOne(id)
    }

    this.edit = (rowData) => {
      this.setState({
        studyGroup: Object.assign({}, rowData),
        isAddDialogShown: true,
        isNewRecord: false
      })
    }

    this.select = (id) => {
      this.props.history.push(`/study-groups/${id}`)
    }

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
          <span className='spaced'>
            <Button icon="pi pi-search-plus" className="p-button-rounded p-button-outlined p-button-info" onClick={() => this.select(rowData.id)} />            
          </span>
        </div>
      )
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
    const typeOptions = [{
      label: 'Workshop',
      value: 'WORKSHOP'
    }, {
      label: 'Theoretical',
      value: 'THEORETICAL'
    }]
    return (
      <div className='study-group-editor'>
        <DataTable value={this.state.studyGroups} footer={this.tableFooter} >
          <Column header='Description' field='description' />
          <Column header='Type' field='type' />
          <Column body={this.opsTemplate} />
        </DataTable>
        <Dialog   visible={this.state.isAddDialogShown} 
                  onHide={this.hideAddDialog} 
                  header='Add a study group' 
                  className='p-fluid' 
                  footer={this.addDialogFooter}>
          <div className='p-field'>
            <label htmlFor="description">Description</label>
            <InputText id="description" name="description" onChange={this.handleChange} value={this.state.studyGroup.description} />
          </div>
          <div className='p-field'>
            <label htmlFor="type">Type</label>
            <Dropdown options={typeOptions} id="type" name="type" onChange={this.handleChange} value={this.state.studyGroup.type} />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(StudyGroupEditor)