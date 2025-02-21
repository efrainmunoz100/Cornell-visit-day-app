<script>
  export default{
    props: {
    item: Object,
    route: String,
    isLab: Boolean,
    isFavorited: Boolean
    },
    methods: {
      redirectTo(page) {
        this.$router.push(page);
      }
    }
  }
</script>

<template>
  <b-card role="button" class = 'directorycard mb-3 position-relative'>
    <b-row @click= "redirectTo(`/${isLab ? 'labs' : 'directory'}/${route}`)" no-gutters class = 'd-flex align-items-center'>
      <b-col cols = '3'>
        <img :src="`${baseDir}images/${isLab ? 'labs' : 'professors'}/${item.img}.jpeg`">
      </b-col>
      <b-col>
        <div class = 'namecontainer'>
          <h2 class = 'd-inline mb-0'>{{ item.name }}</h2>
        </div>



        <b-card-text class = 'text-secondary mb-0 mb-2'>{{ item.campus }}</b-card-text>
        <b-button disabled = "true"  variant="light" size = "sm" class = 'interest-tag me-2 mb-1' v-for = "interest in item[isLab ? 'research_area' : 'interests']">{{interest}}</b-button>
      </b-col>
    </b-row>
    <div class = 'go'>
      <b-button variant="outline-light" :to= "`/${isLab ? 'labs' : 'directory'}/${route}`">
        <img src = "/images/navigation/chevron-right.svg" alt = 'right chevron'/>
      </b-button>
    </div>
    <div class = 'favoritebutton'>
      <b-button variant = 'light' @click="$emit('toggleFavorite')">{{ isFavorited ? '★' : '☆' }}</b-button>
    </div>

  </b-card>


</template>

<style scoped>
.favoritebutton{
  position: absolute;
  top: 12px;
  right: 12px;

  border-radius: 50% !important;
  overflow: hidden !important;

}

.go{
  position: absolute;
  right: 12px;
  top: 50%;
  bottom: 33%;
}
.go > b-button {
  color: red;
  background-color: red;
  border: none;
}
.go img{
  height: 24px;
  width: 24px;
}

img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.directorycard{
  color: black;
}

.directorycard:hover {
  filter: brightness(.95);
}

.imageholder{
  width: 50px;
  height: 50px;
  background-color: gray;
}

.interest-tag {
  background-color: rgb(229, 229, 229) !important;
  pointer-events: none !important;
  border-radius: 8px !important;
}

</style>
