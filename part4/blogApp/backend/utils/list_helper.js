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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}