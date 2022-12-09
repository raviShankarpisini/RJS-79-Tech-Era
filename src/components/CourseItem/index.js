import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../header'
import FailureView from '../FailureView'

const EachLogo = props => {
  const {each} = props
  const {name, id, imageUrl, description} = each
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

const fetchConstants = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class CourseItem extends Component {
  state = {fetchStatus: fetchConstants.initial, data: []}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({fetchStatus: fetchConstants.loading})
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      const formatData = [
        {
          name: data.course_details.name,
          id: data.course_details.id,
          imageUrl: data.course_details.image_url,
          description: data.course_details.description,
        },
      ]

      this.setState({data: formatData, fetchStatus: fetchConstants.success})
    } else {
      this.setState({fetchStatus: fetchConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    console.log(data, 'efw')
    return (
      <ul>
        {data.map(each => (
          <EachLogo each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  retryFun = () => this.getCourseData()

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

export default CourseItem
