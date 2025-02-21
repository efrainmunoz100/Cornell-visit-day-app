<script setup>
  import NavBar from '@/components/NavBar.vue';
</script>

<script>
  export default {
    data(){
      return {
        isLab: false
      }
    },
    created() {
      this.isLab = this.$route.path.split('/')[1] == 'labs';
    },
    computed: {
    item() {
        // grabs the json key for the prof/lab associated with this detail page
        return this.fixtures[this.isLab ? 'labs' : 'professors'][this.isLab ? this.$route.params.lab_key : this.$route.params.prof_key];
    }
  },
  methods: {
    epochToString(epochTime) {
        const dateObj = new Date(epochTime * 1000);
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getDay()].substring(0,3)
        const hoursIn24 = dateObj.getHours();
        const hours = hoursIn24 % 12 ? hoursIn24 % 12 : '12';
        const minutes = ("0" + dateObj.getMinutes()).slice(-2);
        const amOrPm = hoursIn24 < 12 ? 'AM' : 'PM';
        return `<b>${day}</b> ${hours}:${minutes} ${amOrPm}`;
      },
    epochToStringMinusDay(epochTime){
      const dateObj = new Date(epochTime * 1000);
      const hoursIn24 = dateObj.getHours();
      const hours = hoursIn24 % 12 ? hoursIn24 % 12 : '12';
      const minutes = ("0" + dateObj.getMinutes()).slice(-2);
      const amOrPm = hoursIn24 < 12 ? 'AM' : 'PM';
      return `${hours}:${minutes} ${amOrPm}`;
    },
    timeRange(startEpoch, endEpoch) {
      return `${this.epochToString(startEpoch)} - ${this.epochToStringMinusDay(endEpoch)}`;
    }
  }
}
</script>

<template>
  <nav id="top-nav" class=" navbar navbar-light bg-white fixed-top">
    <div class="container-fluid">
        <b-button id="back-btn" size = 'sm' variant="outline-light" class = 'py-0 sm back-btn' :to = "`${isLab ? '/labs' : '/directory'}`"><img src = "/images/navigation/chevron-left.svg" alt = 'back chevron'/></b-button>
    </div>
  </nav>

  <main>
  <b-card id="detail-photo"
    :img-src="`${baseDir}images/${isLab ? 'labs' : 'professors'}/${item['img']}.jpeg`">
  </b-card>

<h1>{{ item['name'] }}</h1>

<p>{{ item['campus'] }} • {{ item['office'] }}</p>
<p v-for = 'day in item["hours"]' v-html="timeRange(day['start'], day['end'])"></p>

<p class="email"><b-link class="email" :href="'mailto:' + `${item['email']}`">{{ item['email'] }}</b-link></p>

<div id="detail-more-info">
  <div id="detail-about">
    <h2>About</h2>
    <p>{{ item['about'] }}</p>
  </div>

  <div v-if=!isLab>
    <h2> Interests </h2>
    <li v-for="field in item['interests']">
      {{ field }}
    </li>
  </div>

  <div v-else>
    <h2> Research Area </h2>
    <li v-for="field in item['research_area']">
      {{ field }}
    </li>
  </div>
</div>
</main>

<NavBar></NavBar>

</template>

<style scoped>
 h1, h2, p, li {
  text-align: center;
 }



 p, li {
  font-size: 1.05em;
 }

 #detail-more-info {
  margin-top: 2em;
  padding-top: 1.5em;
  border-top: solid thin gray;
  margin-right: auto;
  margin-left: auto;
 }

 #detail-more-info h2, li, #detail-about p {
  text-align: left;
 }

 #detail-about p {
  margin-bottom: 2em;
 }

 .email {
  color: darksalmon;
 }

#back-btn {
  width: 10px;
}
</style>
