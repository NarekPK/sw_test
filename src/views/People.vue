<template>
  <div class="people">
    <Loading :is-loading="isLoading" />
    <div :class="$style['people-cards']">
      <PeopleCard 
        v-for="people in peopleInfo"
        :key="people.url"
        :people="people" 
      />
      <PeopleNav />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '@/components/Loading.vue'
import PeopleCard from '@/components/PeopleCard.vue'
import PeopleNav from '@/components/PeopleNav.vue'
import { Route } from 'vue-router'

Component.registerHooks([
  'beforeRouteUpdate'
])

@Component({
  components: {
    PeopleCard,
    PeopleNav,
    Loading
  },
})
export default class People extends Vue {
  isLoading = true

  get peopleInfo() {
      return this.$store.state.peopleInfo
  }

  getPeople(page = this.$route.query.page) {
    this.$store.dispatch('getPeopleInfo', page).then(() => {
      this.isLoading = false
    })
  }

  created(): void {
    this.getPeople()
  }

  beforeRouteUpdate(to: Route, from: Route, next: Function): void {
    if (to.query.page) {
      this.isLoading = true
      this.getPeople(to.query.page)
    }
    next()
  }
}
</script>


<style module lang="scss">
.people-cards {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
  max-width: 1200px;
  margin: 0 auto 15px;
}
</style>