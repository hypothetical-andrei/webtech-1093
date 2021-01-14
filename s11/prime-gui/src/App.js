import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import StudyGroupEditor from './StudyGroupEditor'
import StudentEditor from './StudentEditor'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <StudyGroupEditor />
          </Route>
          <Route path='/study-groups/:sgid'>
            <StudentEditor />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App