<template>
  <div :class="$style['person']">
    <Loading :is-loading="isLoading" />
    <div :class="$style['person-header']">
      <div :class="$style['person-header__title']">{{ person.name }}</div>
      <button :class="$style['person-header__button']" 
              @click="goBack">Back to List</button>
    </div>
    <div :class="$style['person-properties']">
      <div :class="$style['person-table']">
        <div :class="$style['person-table__row']">Birth Year: <b>{{ person.birth_year }}</b></div>
        <div :class="$style['person-table__row']">Gender: <b>{{ person.gender }}</b></div>
        <div :class="$style['person-table__row']">Height: <b>{{ person.height }}</b></div>
        <div :class="$style['person-table__row']">Mass: <b>{{ person.mass }}</b></div>
        <div :class="$style['person-table__row']">Hair Color: <b>{{ person.hair_color }}</b></div>
        <div :class="$style['person-table__row']">Skin Color: <b>{{ person.skin_color }}</b></div>
        <div :class="$style['person-table__row']">Eye Color: <b>{{ person.eye_color }}</b></div>
      </div>
      <div :class="$style['person-films']">
        <div :class="$style['person-films__title']">Films:</div>
        <div v-if="person.films && person.films.length">
          <div 
            v-for="filmName in filmsNames"
            :key="filmName + person.url"
            :class="$style['person-films__item']"
          >{{ filmName }}</div>
        </div>
        <div v-else :class="$style['person-films__empty']">I haven't films (</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Loading from '@/components/Loading.vue'
import PersonUnit from '@/interfaces/PersonUnit'
import axios from 'axios'

@Component({
  components: {
    Loading
  },
})
export default class Person extends Vue {
  @Prop() id!: string
  isLoading = true
  person: PersonUnit = {}
  filmsNames: string[] = []

  getPerson(id: string) {
    axios
      .get(`https://swapi.dev/api/people/${id}/`)
      .then(response =>  {
        this.person = response.data
        this.getFilmNames(this.person.films)
      })
  }

  getFilmNames(filmURLs: string[] = []) {
    filmURLs.forEach((filmURL) => {
      const securedURL = this.replaceHttpUrl(filmURL)
      axios
      .get(securedURL)
      .then((response) =>  {
        const filmTitle = response.data.title
        this.filmsNames.push(filmTitle)
        this.isLoading = false
      })
    })
  }

  replaceHttpUrl(url: string) {
    const urlParts = url.split(':')
    urlParts[0] = 'https:';
    return urlParts.join('');
  }

  goBack(): void {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
  }

  created(): void {
    this.getPerson(this.id)
  }
}
</script>


<style module lang="scss">
.person {
  max-width: 1200px;
  margin: 0 auto 15px;

  &-header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding-bottom: 15px;

    &__title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__button {
      font-size: 16px;
      line-height: 16px;
      padding: 10px;
      border: 0;
      border-radius: 4px;
      text-align: center;
      color: #fff;
      background-color: #28a745;

      &:hover {
        background: #218838;
        cursor: pointer;
      }
    }
  }

  &-properties {
    padding: 15px 0;
    display: flex;
    flex-flow: row nowrap;
  }

  @media (max-width: 767px) {
    &-properties {
      flex-wrap: wrap;
    }
  }

  &-table {
    color: #0c5460;
    background-color: #bee5eb;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 4px;
    flex-basis: 50%;

    &__row {
      padding: 10px;
      & + & {
        border-top: 1px solid rgba(0,0,0,.125);
      }
    }
  }

  @media (max-width: 767px) {
    &-table {
      flex-basis: 100%;
    }
  }

  &-films {
    flex-basis: 50%;
    padding: 10px 20px;

    &__title {
      font-size: 24px;
      margin-bottom: 5px;
      font-weight: bold;
    }

    &__item {
      color: #fff;
      background: #17a2b8;
      border-radius: 4px;
      font-size: 14px;
      padding: 5px;
      text-align: center;
      display: inline-block;
      margin: 0 5px 5px 0;
      font-weight: bold;
    }

    &__empty {
      color: #fff;
      background: red;
      border-radius: 4px;
      font-size: 14px;
      padding: 5px;
      text-align: center;
      display: inline-block;
      margin: 0 5px 5px 0;
      font-weight: bold;
    }
  }

  @media (max-width: 767px) {
    &-films {
      flex-basis: 100%;
    }
  }
}
</style>