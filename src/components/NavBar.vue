<script>
  export default {
    data() {
      return {
        isLab: false,
        isDetail: false,
        isPDF: false
      }
    },
    mounted() {
      this.isLab = this.$route.path.split('/')[1] == 'labs';
      this.isDetail = this.$route.path.split('/').length == 3 && (this.$route.path.split('/')[1] == 'labs' || this.$route.path.split('/')[1] == 'directory');
      this.isPDF = this.$route.path.split('/')[2] == 'reimbursement';
    }
  }
</script>

<template>
  <b-navbar fixed="bottom" id="nav-container">
    <b-nav pill>
      <b-nav-item to="/" active-class="active"><img src="/images/calendar.svg" alt="calendar"></b-nav-item>
      <b-nav-item :class="{ active: isDetail && !isLab}" to="/directory" active-class="active"><img src="/images/staff.svg" alt="staff contacts"></b-nav-item>
      <b-nav-item :class="{ active: isDetail && isLab}" to="/labs" active-class="active"><img src="/images/labs.svg" alt="labs"></b-nav-item>
      <b-nav-item :class="{ active: isPDF}" to="/more-info" active-class="active"><img src="/images/info.svg" alt="more information"></b-nav-item>
    </b-nav>
  </b-navbar>
</template>

<style scoped>
 nav {
    height: 5em;
  }

  .nav {
    width: 100%;
    height: 5em;
    overflow: hidden;
    position: fixed;
    margin:0;
  }

  .nav-item {
    width: 25%;
    background-color: rgb(241, 241, 241);
  }

  .nav-item:not(.active):not(li:has(> a.active)):hover {
    background-color: rgb(234, 234, 234);
  }

  img {
    height: 100%;
    max-height: 32px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.75em;
  }

  li:has(> a.active),  li.active {
    background-color: rgb(200, 200, 200);
  }
</style>
