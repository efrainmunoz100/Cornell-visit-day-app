<script>
  export default{
    props: {
    item: Object
    }
    }
</script>

<template>
  <b-card class = 'facultycard mb-3'>
    <b-row class = 'd-flex align-items-top'>
      <b-col class = 'col-3'>
        <img :src="`${baseDir}images/professors/${item.img}.jpeg`">
      </b-col>
      <b-col class = ''>
        <h2>{{ item.name }}</h2>
        <p>{{ item.campus }}</p>
        <b-button class = 'me-2' v-for = "interest in item.interests">{{interest}}</b-button>
      </b-col>

    </b-row>
  </b-card>
</template>

<style scoped>

img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.facultycard{
  color: black;
}
.imageholder{
  width: 50px;
  height: 50px;
  background-color: gray;
}

</style>
