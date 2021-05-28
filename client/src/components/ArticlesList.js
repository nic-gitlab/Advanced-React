import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ArticleTile from "./ArticleTile"
import ArticleForm from "./ArticleForm"

const ArticlesList = props => {
  const [articles, setArticles] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [id, setId] = useState()
  // Fetch all articles
  const fetchArticles = async () => {
    
    try {
      const response = await fetch("/api/v1/articles")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setArticles(body.articles)
      
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  
  

  useEffect(() => {
    fetchArticles()
  }, [])

  const addNewArticle = async formPayload => {
    try {
      const response = await fetch("/api/v1/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload) 
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      } 
      const body = await response.json()
      setId(body.article.id)
      setArticles([...articles, body.article])
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  if (shouldRedirect) {
    
    return <Redirect to={`/articles/${id}`} />
    
}

  const articleTiles = articles.map(article => {
    return (
      <ArticleTile
        key={article.id}
        id={article.id}
        title={article.title}
        content={article.content}
      />
    )
  })

  return (
    <div className="row">
      <div className="small-8 small-centered columns">
        <h1>My Blog!</h1>
        <hr />
        {articleTiles}
        <ArticleForm addNewArticle={addNewArticle} />
      </div>
    </div>
  )
}

export default ArticlesList
