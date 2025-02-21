<script setup>
  import NavBar from '@/components/NavBar.vue';
  import Header from '../components/Header.vue'

</script>

<template>
  <Header title = 'More Information'></Header>
  <main>
    <h2>{{ fixtures['about']['title'] }}</h2>
    <p id="about">{{ fixtures['about']['text'] }}</p>

    <h2 id="reimburse-section">{{ fixtures['about']['reimbursement-title'] }}</h2>
    <p id="reimburse-info">{{ fixtures['about']['reimbursement-text'] }}</p>
    <p id="reimburse-contact">To submit the completed form, email a copy with your receipts to Olivia Howarth (<b-link class="email" href="mailto:oah23@cornell.edu">oah23@cornell.edu</b-link>).</p>

  <b-link :href="`${baseDir}more-info/reimbursement`">
    <b-button>
      <div id="btn-content">
        <p>Download Reimbursement Form</p>
        <img id="download" src="/images/download.svg" alt="download reimbursement form"/>
      </div>
    </b-button>
  </b-link>
  </main>

  <NavBar></NavBar>
</template>

<style scoped>
  #download {
    display: inline;
    max-width: 10%;
  }
  .btn {
    background-color: darksalmon;
    color: white;
    width: 50%;
    font-weight: bold;
    padding-right: 3em;
    border: none;
  }

  .btn:hover {
    background-color: #DB6239;
    color: white;
  }

  #about, #reimburse-info {
    font-size: 1.25em;
    margin-top: 2em;
  }

  #reimburse-contact {
    font-size: 1.25em;
  }

  #reimburse-section {
    margin-top: 1.5em;
  }

  #btn-content {
    display: flex;
    width: 100%;
    align-items: center;
  }

  #btn-content > p {
    white-space: nowrap;
    margin: 0;
    padding-right: 1em;
  }

  .email {
    color: darksalmon;
  }

  @media (max-width: 800px) {
    .btn {
      width: 100%;
    }
  }

</style>
