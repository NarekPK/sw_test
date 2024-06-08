<template>
  <div :class="$style['people-card']">
    <div :class="$style['people-card__title']">{{ people.name }}</div>
    <div :class="$style['people-card__content']">
      <div :class="$style['people-card__properties']">
        <div :class="$style['people-card__properties-item']">Gender: <b>{{ people.gender }}</b></div>
        <div :class="$style['people-card__properties-item']">Height: <b>{{ people.height }}</b></div>
        <div :class="$style['people-card__properties-item']">Mass: <b>{{ people.mass }}</b></div>
      </div>
      <div :class="$style['people-card__starships']">
        <div :class="$style['people-card__starships-title']">Starships:</div>
        <div v-if="people.starships.length">
          <div 
            v-for="starshipName in starshipNames"
            :key="starshipName + people.url"
            :class="$style['people-card__starship']"
          >{{ starshipName }}</div>
        </div>
        <div v-else :class="$style['people-card__starships-empty']">I haven't starship (</div>
      </div>
    </div>
    <router-link 
        :to="people && `/person/${people.url.split('/').reverse()[1]}`"
        :class="$style['people-card__more']"
      >See more info Person</router-link>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PeopleUnit from '@/interfaces/PeopleUnit'
import axios from 'axios'

@Component
export default class PeopleCard extends Vue {
  @Prop() people!: PeopleUnit
  starshipNames: string[] = []

  getStarshipNames(starshipURLs: string[]): void {
    starshipURLs.forEach((starshipURL) => {
      const securedURL = this.replaceHttpUrl(starshipURL)
      axios
      .get(securedURL)
      .then(response =>  this.starshipNames.push(response.data.name))
    })
  }

  replaceHttpUrl(url: string) {
    const urlParts = url.split(':')
    urlParts[0] = 'https:'
    return urlParts.join('')
  }

  created(): void {
    this.getStarshipNames(this.people.starships)
  }
}
</script>


<style module lang="scss">
.people-card {
  flex-basis: 500px;
  margin: 10px;
  padding: 20px;
  border-radius: 4px;
  background: #d1ecf1;
  line-height: 1.2;

  &__content {
    border-bottom: 1px solid #abdde5;
    padding-bottom: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-flow: row wrap;
  }

  &__title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__properties {
    flex-basis: 50%;
  }

  @media (max-width: 767px) {
    &__properties {
      flex-basis: 100%;
    }
  }

  &__properties-item {
    margin-bottom: 5px;
  }

  &__starships {
    flex-basis: 50%;
  }

  @media (max-width: 767px) {
    &__starships {
      flex-basis: 100%;
    }
  }

  &__starships-title {
    margin-bottom: 5px;
    font-weight: bold;
  }

  &__starships-empty {
    color: #fff;
    background-color: red;
    padding: 2px 4px;
    border-radius: 4px;
    width: 120px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  }
  
  &__starship {
    color: #fff;
    background-color: #17a2b8;
    border-radius: 4px;
    font-size: 12px;
    padding: 2px 4px;
    text-align: center;
    display: inline-block;
    margin: 0 5px 5px 0;
    font-weight: bold;
  }

  &__more {
    color: #fff;
    background: #17a2b8;
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    text-decoration: none;
    float: right;

    &:hover {
      background: #138496;
    }
  }
}
</style>