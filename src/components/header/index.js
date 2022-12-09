import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const {history} = props
  console.log(history)

  return (
    <div>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </Link>
    </div>
  )
}

export default withRouter(Header)
