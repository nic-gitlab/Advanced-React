import React, { useState, useEffect } from "react"

import ArticleShow from "./ArticleShow"

const ArticleForm = (props) => {
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
  })
  
  const [errors, setErrors] = useState("")

  const handleChange = (event) => {
    setNewArticle({
      ...newArticle,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newArticle.title === "" && newArticle.content === "") {
      setErrors("Error: Both fields are empty")
    } else if (newArticle.title === "") {
      setErrors("Error: Title field is empty")
    } else if (newArticle.content === "") {
      setErrors("Error: Content field is empty")
    } else {
      props.addNewArticle(newArticle)
      
    }
  }

  let errorMessage
  if (errors) {
    errorMessage = <h3>{errors}</h3>
  }

  const handleClear = (event) => {
    setNewArticle({title:'', content:''})
    setErrors("")
  }

  
    

  return (
    <form className="new-article-form callout" onSubmit={handleSubmit}>
      {errorMessage}
      <label>
        Article Title:
        <input
          name="title"
          id="title"
          type="text"
          onChange={handleChange}
          value={newArticle.title}
        />
      </label>
      <label>
        Article Content:
        <textarea name="content" id="content" onChange={handleChange} value={newArticle.content} />
      </label>

      <div className="button-group">
        <button className="button" type="reset" onClick={handleClear}>Clear</button>
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default ArticleForm
