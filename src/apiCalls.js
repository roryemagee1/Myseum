const apiCalls = {
  fetchPaintingIDs(search) {
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=${search}`)
      .then(response => response.json())
  },

  fetchPainting(id) {
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      .then(response => response.json())
  }
}

export default apiCalls;

// https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sunflowers

// https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=sunflowers

// https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]

