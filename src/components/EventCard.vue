<script>
export default {
  props: {
    item: Object
  }
}
</script>

<template>
  <b-card no-body class="color overflow-hidden my-2" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col cols="4">
        <b-card-body>
          <b-card-text class="title my-0">{{ item.start }}</b-card-text>
          <b-card-text class="my-0">- {{ item.end }}</b-card-text>
        </b-card-body>
      </b-col>
      <b-col cols="8">
        <b-card-body>
          <b-card-text class="title mb-1">
            {{ item.name }}
          </b-card-text>
          <b-card-text class="text-secondary">
            {{ item.location }}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<style>
.title {
  font-size: 14pt;
  font-weight: 500;
}

.time {
  color: darksalmon;
}

.color {
  border-left: 5pt solid darksalmon !important;
}
</style>
