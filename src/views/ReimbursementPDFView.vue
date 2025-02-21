<script setup>
    import NavBar from '@/components/NavBar.vue';
</script>

<template>
   <nav id="top-nav" class=" navbar navbar-light bg-white fixed-top">
    <div class="container-fluid">
        <b-button id="back-btn" size = 'sm' variant="outline-light" class = 'py-0 sm back-btn' to = "/more-info"><img src = "/images/navigation/chevron-left.svg" alt = 'back chevron'/></b-button>
    </div>
  </nav>

    <div id="pdf-container">
        <iframe :src="`${baseDir}documents/travel-reimbursement-form.pdf`"></iframe>
        <!-- <iframe src="/documents/travel-reimbursement-form.pdf"></iframe> -->
    </div>
    <NavBar></NavBar>
</template>

<style scoped>
    #app {
        height: 100% !important;
    }
    #pdf-container {
        height: 100vh;
    }
    iframe {
        width: 100%;
        height: 100%;
    }
</style>
