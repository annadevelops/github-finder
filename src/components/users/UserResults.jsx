import {useEffect, useState} from 'react'
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {

  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const response = await fetch(process.env.REACT_APP_GITHUB_URL + '/users', {
      headers: {
        'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}` 
      }
    })

    const data = await response.json()
    setUserResults(data)
    setLoading(false)
    console.log(data)

  }

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {userResults.map((userResult) => 
          (<UserItem key={userResult.login} user={userResult}/>)
        )}
      </div>
    )
  } else {
    return (<Spinner />)
  }
    
}
export default UserResults