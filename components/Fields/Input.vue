<script setup>
const model = defineModel();

function update(value) {
  model.value = value.target.value;
}
</script>

<template>
  <input
    class="input border shadow-md rounded-lg p-2 text-gray-700 border-gray-100 font-medium min-w-[300px] outline-green-500"
    placeholder="Search for articles..."
    @input="update"
  />
</template>
