const springCleaning = {
  removeImagelessData(input) {
    if (input.primaryImage) {
      return true
    } else {
      return false
    }
  }
}

export default springCleaning;