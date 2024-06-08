import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    peopleInfo: [],
    navigationInfo: {
      'count': 0,
      'previous': '',
      'next': '',
    }
  },
  mutations: {
    addPeopleInfo(state, data) {
      state.peopleInfo = data.results
    },
    addNavigationInfo(state, data) {
      function getPageNumber(pageLink: string): string {
        const query = pageLink.split('?')[1].split('&');
        let page = '';
        query.forEach( (item: string) => {
          if (item.includes('page=')) {
            const startIndex = item.indexOf('=') + 1
            page += item.slice(startIndex)
          }
        });
        return page
      }

      state.navigationInfo.count = Math.ceil( data.count/10 )

      const previous = data.previous
      const next = data.next

      state.navigationInfo.previous = previous ? getPageNumber(previous) : ''
      state.navigationInfo.next = next ? getPageNumber(next) : ''
    },
  },
  actions: {
    async getPeopleInfo(context, page) {
      const queryURL = page ? `https://swapi.dev/api/people/?page=${page}`
                            : 'https://swapi.dev/api/people/?page=1' 

                            const response = await axios
        .get(queryURL)

      context.commit('addPeopleInfo', response.data)
      context.commit('addNavigationInfo', response.data)
    },
  },
  modules: {
  }
})
