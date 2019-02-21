<template>
  <label>{{title}}
    <input type="number" maxlength="2" min="2" max="40" size="3"
      v-bind:value="mutableValue"
      v-on:input="$emit('input', $event.target.value)">
  </label>
</template>

<script>
export default {
  name: 'Input',
  props: {
    title: String,
    value: String,
  },
  data: function () {
    return {
      mutableValue: this.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  margin-right: 15px;
}
input {
  padding: 6px 12px;
  border-radius: 4px;
}

input:invalid {
  border-color: red;
}
</style>
