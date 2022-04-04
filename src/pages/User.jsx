import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import GithubContext from "../context/github/GithubContext"

function User() {
    const {getUser, user} = useContext(GithubContext)

    //using useParams to get the params in the URL of this page - then params.login underneath to get that specific param
    const params = useParams()

    useEffect(() => {
        getUser(params.login)
    }, [])

  return (
    <img src={user.avatar_url} alt="" />
  )
}
export default User