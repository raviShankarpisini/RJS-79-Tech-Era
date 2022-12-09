import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../header'
import FailureView from '../FailureView'

const EachLogo = props => {
  const {each} = props
  const {name, id, logoUrl} = each
  return (
    <li>
      <Link to={`courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

const fetchConstants = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class Home extends Component {
  state = {fetchStatus: fetchConstants.initial, data: []}

  componentDidMount() {
    this.getHomeData()
  }

  getHomeData = async () => {
    this.setState({fetchStatus: fetchConstants.loading})
    const response = await fetch('https://apis.ccbp.in/te/courses')

    if (response.ok) {
      const data = await response.json()
      const formatData = data.courses.map(each => ({
        name: each.name,
        id: each.id,
        logoUrl: each.logo_url,
      }))
      this.setState({data: formatData, fetchStatus: fetchConstants.success})
    } else {
      this.setState({fetchStatus: fetchConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {data.map(each => (
            <EachLogo each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  retryFun = () => this.getHomeData()

  renderSwitch = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case fetchConstants.success:
        return this.renderSuccessView()
      case fetchConstants.failure:
        return <FailureView retryFun={this.retryFun} />
      case fetchConstants.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />

        {this.renderSwitch()}
      </div>
    )
  }
}

export default Home
