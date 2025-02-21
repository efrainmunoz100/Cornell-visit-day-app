<script>
export default {
  props:{
    title: String
  }
}

</script>

<template>
<div class = 'header-container'>
  <h1>{{title}}</h1>
</div>

</template>

<style scoped>
.header-container {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding-left: 2rem;
  padding-bottom: 1rem;
  background-color: #DB6239;
  height: 105px;
  margin: 0 auto;
}
</style>
