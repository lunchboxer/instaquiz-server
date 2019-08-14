import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { TERMS_AND_ALL } from '../../data/queries'
// import { CREATE_TERM } from '../../data/mutations'

const createTermsStore = () => {
  const { subscribe, set, update } = writable(null, set => {
    request(TERMS_AND_ALL).then(response => set(response.terms))
  })

  return {
    subscribe,
    update,
    get: async (id) => {
      if (!id) {
        request(TERMS_AND_ALL).then(response => set(response.terms))
      } else {
        // load a term by id and add it to terms
      }
    }
  }
}

export const terms = createTermsStore()