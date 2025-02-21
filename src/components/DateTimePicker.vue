<script>
  export default {
    data() {
      return {
        options: this.fixtures.timeFilterOptions,
        selections: ['2023-03-12', '1', '00', 'AM'],
      }
    },
    methods: {
      onUpdate() {
        const dateArr = this.universalDateArr;
        const epoch = Math.floor((new Date(dateArr[0], dateArr[1], dateArr[2], dateArr[3], dateArr[4])).getTime() / 1000);
        this.$emit("update", epoch);
      }
    },
    computed: {
      universalDateArr() {
        const [year, month, day] = this.selections[0].split('-');
        var [hour, minute, amOrPm] = this.selections.slice(1,4);
        if (hour == '12' && amOrPm == 'AM') {
          hour = '0';
        }
        else if (amOrPm == 'PM' && hour != '12') {
          hour = `${parseInt(hour) + 12}`
        }
        return [year, month - 1, day, hour, minute];
      }
    }
  }
</script>

<template>
  <scroll-picker
    :options="options"
    v-model="selections"
    @update:modelValue="onUpdate"
  />
</template>
