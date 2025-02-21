<script setup>
  import NavBar from '@/components/NavBar.vue';
  import EventCard from '../components/EventCard.vue'
  import Header from '../components/Header.vue'
</script>



<template>
  <Header title = 'Schedule'></Header>
  <main>
    <div class="mt-2">
      <b-tabs content-class="mt-3">
        <b-tab title-link-class="mytabs" :title="fixtures['schedule']['day_1']['date']" active>
          <EventCard v-for="(fixture) in fixtures['schedule']['day_1']['events']" :item="fixture" />
        </b-tab>
        <b-tab :title="fixtures['schedule']['day_2']['date']">
          <EventCard v-for="(fixture) in fixtures['schedule']['day_2']['events']" :item="fixture" />
        </b-tab>
        <b-tab :title="fixtures['schedule']['day_3']['date']">
          <EventCard v-for="(fixture) in fixtures['schedule']['day_3']['events']" :item="fixture" />
        </b-tab>
      </b-tabs>
    </div>
  </main>


  <NavBar />

</template>

<style>

.tabs.mytabs .nav-tabs .nav-link.active {
  background-color: #ccaaaa !important;
}
</style>
