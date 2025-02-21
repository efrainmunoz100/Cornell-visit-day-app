<script setup>
  import NavBar from '@/components/NavBar.vue';
  import Filter from '@/components/Filter.vue';
  import DirectoryCard from '@/components/DirectoryCard.vue';
  import Header from '../components/Header.vue'

</script>

<script>
  export default {
    data() {
      return {
        isLab: false,
        selected: new Set(),
        startTime: Number,
        endTime: Number,
        favorites: new Set(),
        showFavoritesOnly: false
      }
    },
    mounted() {
      this.isLab = this.$route.path.split('/')[1] == 'labs';
    },
    methods: {
      filterClicked(filter) {
        if (this.selected.has(filter)) {
          // filter is already selected, so remove it
          this.selected.delete(filter)
        }
        else {
          this.selected.add(filter)
        }
      },
      hasTimeOverlap(fixture) {
        const fixtureHours = fixture.hours;
        if (typeof this.startTime != "number" && typeof this.endTime != "number") {
          // if there is no filter based on Time, let this fixture be shown
          return true
        }
        else if (typeof this.startTime != "number") {
          // if there is only an end time, check if the fixture has hours available before the filter end time
          return fixtureHours.some(fixtureHour => fixtureHour.start < this.endTime)
        }
        else if (typeof this.endTime != "number") {
          // if there is only a start time, check that the fixture has hours available after the filter start time
          return fixtureHours.some(fixtureHour => fixtureHour.end >= this.startTime)
        }
        // otherwise, assume there is a start and end time filter, and check both
        return fixtureHours.some(fixtureHour => fixtureHour.end >= this.startTime && fixtureHour.start < this.endTime)
      },
      checkFavoriteFilters(route) {
        if (this.showFavoritesOnly === true) {
          return this.favorites.has(route);
        }
        return true;
      },
      isShown(fixture, route) {
        if (this.selected.size == 0) {
          //if no filters are selected, check the time filter,
          return this.hasTimeOverlap(fixture) && this.checkFavoriteFilters(route);
        }
        const filters = this.isLab ? fixture.research_area : fixture.interests;
        return filters.some(filter => this.selected.has(filter)) && this.hasTimeOverlap(fixture) && this.checkFavoriteFilters(route);
      },
      updateTimeFilter(event) {
        if (event.startOrFinish == "start") {
          this.startTime = event.epoch;
        }
        else {
          this.endTime = event.epoch;
        }
      },
      noCardsShown() {
        const fixtureKeys = Object.keys(this.fixtures[this.isLab ? "labs" : "professors"]);
        const retVal = fixtureKeys.every(fixtureKey => !this.isShown(this.fixtures[this.isLab ? 'labs' : 'professors'][fixtureKey], fixtureKey))
        return retVal;
      },
      toggleFavorite(route) {
        if (this.favorites.has(route)) {
          this.favorites.delete(route);
        }
        else {
          this.favorites.add(route);
        }
      },
      toggleFavoritesOnly() {
        this.showFavoritesOnly = ! this.showFavoritesOnly;
      },
      redirectTo(page) {
        this.$router.push(page);
      }
    },
  }
</script>

<template>
  <Header :title = "isLab ? `Lab Directory` : `Professor Directory`"></Header>
  <main>
    <Filter
      class="filter"
      :isLab="isLab"
      :selected="selected"
      @filterClicked="filterClicked($event)"
      @updateTimeFilter="event => updateTimeFilter(event)"
      @favoritesOnly="toggleFavoritesOnly()">
    </Filter>
    <DirectoryCard
      v-for = '(fixture, route) in fixtures[isLab ? "labs" : "professors"]'
      v-show="isShown(fixture, route)"
      :item = "fixture"
      :route = "route"
      :isLab = "isLab"
      :isFavorited="favorites.has(route)"
      @toggleFavorite="toggleFavorite(route)">
    </DirectoryCard>
    <b-alert :modelValue="noCardsShown()">
      {{ `No ${isLab ? 'labs' : 'professors'} matched your filters. Change some filters and try again.` }}
    </b-alert>
  </main>
  <NavBar></NavBar>
</template>

<style>
  .filter {
    padding-bottom: 20px;
  }
</style>
