import { useContext, useEffect } from "react"
import GithubContext from "../../context/github/GithubContext"
import RepoItem from "./RepoItem"

function RepoList() {
    const {repos} = useContext(GithubContext)

  return (
    <>
    {repos.map(repo => <RepoItem key={repo.id} repo={repo}/>)}
    </>
  )
}
export default RepoList