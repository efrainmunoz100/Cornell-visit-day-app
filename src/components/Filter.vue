<script setup>
  import DateTimePicker from '@/components/DateTimePicker.vue';
  const props = defineProps({
    isLab: false,
    selected: Set
  })
</script>

<script>
  export default {
    data() {
      return {
        showStartPicker: false,
        showEndPicker: false,
        timeFilterOpen: false,
        startTime: Number,
        endTime: Number,
        showFavoritesOnly: false
      }
    },
    computed: {
      find_filters() {
        const filters = new Set();
        if (this.isLab) {
          for (const lab in this.fixtures.labs) {
            const possibly_new_filters = this.fixtures.labs[lab].research_area;
            possibly_new_filters.forEach(possibly_new_filter => filters.add(possibly_new_filter))
          }
        }
        else {
          for (const prof in this.fixtures.professors) {
            const possibly_new_filters = this.fixtures.professors[prof].interests;
            possibly_new_filters.forEach(possibly_new_filter => filters.add(possibly_new_filter))
          }
        }
        return filters;
      },
      timeFilterText() {
        var text = "";
        if (typeof this.startTime == 'number' && typeof this.endTime == 'number') {
          text = `<nobr>${this.epochToString(this.startTime)}</nobr> — <nobr>${this.epochToString(this.endTime)}`;
        }
        else if (typeof this.startTime == 'number') {
          const startDateObj = new Date(this.startTime * 1000);
          text = `<nobr>${this.epochToString(this.startTime)} —`
        }
        else if (typeof this.endTime == 'number') {
          const endDateObj = new Date(this.endTime * 1000);
          text = `<nobr>— ${this.epochToString(this.endTime)}`
        }
        else {
          text = `<nobr>Available between...`
        }
        text += this.timeFilterOpen ? " ▲" : " ▼";
        text += "</nobr>"
        return text;
      }
    },
    methods: {
      passToParent(startOrFinish, epoch) {
        if (startOrFinish == "start") {
          this.startTime = epoch;
        }
        else {
          this.endTime = epoch;
        }
        this.$emit('updateTimeFilter', {startOrFinish, epoch})
      },
      epochToString(epochTime) {
        const dateObj = new Date(epochTime * 1000);
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getDay()].substring(0,3)
        const hoursIn24 = dateObj.getHours();
        const hours = hoursIn24 % 12 ? hoursIn24 % 12 : '12';
        const minutes = ("0" + dateObj.getMinutes()).slice(-2);
        const amOrPm = hoursIn24 < 12 ? 'AM' : 'PM';
        return `${day} ${hours}:${minutes} ${amOrPm}`;
      },
      clearStartTime() {
        this.showStartPicker = false;
        this.startTime = Number;
        this.$emit('updateTimeFilter', {startOrFinish: 'start', epoch: null})
      },
      clearEndTime() {
        this.showEndPicker = false;
        this.endTime = Number;
        this.$emit('updateTimeFilter', {startOrFinish: 'end', epoch: null})
      },
      initFilter(startOrFinish) {
        if (startOrFinish == 'start') {
          this.startTime = 1678600800;
          this.showStartPicker = true;
        }
        else {
          this.endTime = 1678600800;
          this.showEndPicker = true;
        }
        this.passToParent(startOrFinish, 1678600800)
      },
      toggleShowFavorites() {
        this.showFavoritesOnly = !this.showFavoritesOnly;
        this.$emit('favoritesOnly');
      }
    }
  }
</script>

<template>
  <div id="filterWrapper">
    <b-button-group class="filters w-100">
      <h6 class="align-middle filter-text">Filters:</h6>
      <b-button pill v-b-toggle="'timeFilter'" @click="timeFilterOpen=!timeFilterOpen" :class="`filter-btn ms-2 rounded ${timeFilterOpen ? 'active' : ''}`" variant="danger" v-html="timeFilterText"></b-button>
      <b-button pill @click="toggleShowFavorites()" :class="`filter-btn ms-2 rounded ${showFavoritesOnly ? 'active' : ''}`" variant="danger">★ Only</b-button>
      <b-button pill
        v-for="filter in find_filters"
        :class="`filter-btn ms-2 rounded ${selected.has(filter) ? 'active' : ''}`"
        variant="danger"
        @click="$emit('filterClicked', filter)">
          {{ `${filter}${selected.has(filter) ? ' &times;' : ''}` }}
        </b-button>
    </b-button-group>
    <b-collapse id="timeFilter">
      <div class="timePickerSection mt-3">
        <h4>Start</h4>
        <b-button @click="initFilter('start')" v-show="!showStartPicker" class="add-time-btn">
          Add Start Time &plus;
        </b-button>
        <div v-show="showStartPicker">
          <DateTimePicker @update="epoch => passToParent('start', epoch)"></DateTimePicker>
          <b-button @click="clearStartTime" class="close-time-btn mt-3">Clear Start Time</b-button>
        </div>
      </div>
      <div class="timePickerSection mt-4">
        <h4>End</h4>
        <b-button @click="initFilter('end')" v-show="!showEndPicker" class="add-time-btn">
          Add End Time &plus;
        </b-button>
        <div v-show="showEndPicker">
          <DateTimePicker @update="epoch => passToParent('end', epoch)"></DateTimePicker>
          <b-button @click="clearEndTime" class="close-time-btn mt-3">Clear End Time</b-button>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<style scoped>

  .filters {
    overflow-x: scroll;
    align-items: center;
    margin-top: .7em;
  }
  .filter-btn {
    color: white;
    border-radius: 10%;
    height: 3em;
    font-size: 10pt;
    width:fit-content;
    white-space: nowrap;
    background-color:darksalmon;
    border: none;
  }

  .filter-text {
    font-size: 11pt;
  }

  .timePickerSection {
    margin-bottom: 10px;
  }

  .add-time-btn {
    background-color: darkgrey;
    border: none;
    font-size: 11pt;
  }

  .close-time-btn {
    /* background-color: darkgrey; */
    border: none;
    font-size: 11pt;
  }
</style>
