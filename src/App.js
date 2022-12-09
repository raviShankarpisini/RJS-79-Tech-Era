import {Route, Switch, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'
import Home from './components/Home'
import CourseItem from './components/CourseItem'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItem} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
