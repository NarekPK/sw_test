<template>
  <nav :class="$style['people-nav']">
    <router-link
      :to="`/people?page=${navigationInfo.previous}`"
      :class="[$style['people-nav__item'], { 'people-nav__item_disabled': !navigationInfo.previous }]"
    >Previous</router-link>
    <router-link
      v-for="page in navigationInfo.count"
      :key="page"
      :to="`/people?page=${page}`"
      :class="$style['people-nav__item']"
    >{{ page }}</router-link>
    <router-link
      :to="`/people?page=${navigationInfo.next}`"
      :class="[$style['people-nav__item'], { 'people-nav__item_disabled': !navigationInfo.next }]"
    >Next</router-link>
  </nav>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PeopleNav extends Vue {
  get navigationInfo() {
    return this.$store.state.navigationInfo
  }
}
</script>


<style module lang="scss">
.people-nav {
  color: inherit;
  
  &__item {
    padding: 10px;
    color: #007bff;
    background: #fff;
    border: 1px solid #dee2e6;
    margin: 10px 0 10px -1px;
    text-decoration: none;
    display: inline-block;

    &:hover {
      color: #0056b3;
      background: #e9ecef;
      border-color: #dee2e6;
    }
  }

  :global {
    .people-nav__item_disabled {
      pointer-events: none;
      color: #0c5460;
    }

    .router-link-exact-active {
      pointer-events: none;
      color: #fff;
      background: #007bff;
      border-color: #007bff;
    }
  }
}
</style>