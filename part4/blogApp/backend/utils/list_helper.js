const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => sum + current.likes,0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    return blogs.reduce((currentBest, current) => {
        if (current.likes > currentBest.likes) {return current} else {return currentBest}
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    
    const grouped = lodash.groupBy(blogs, (blog) => blog.author)
    
    const counted = lodash.map(grouped, (authorBlogs, author) => ({
        author: author,
        blogs: authorBlogs.length
    }))
    
    return lodash.maxBy(counted, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}