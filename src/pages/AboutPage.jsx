import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About this project</h1>
        <p>This is React app to leave feedback on your project.</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to={{
            pathname: '/',
            search: '?sort=name',
            hash: '#hello'
          }}>
            Back to Home
          </Link>
        </p>
      </div>
    </Card>
  )
}

export default AboutPage
