<script setup>
import { defineProps } from "vue";

const props = defineProps(["title", "description", "url"]);
</script>

<template>
  <NuxtLink :to="url">
    <div
      style="height: 150px"
      class="cursor-pointer bg-white rounded-xl shadow-sm p-4 space-y-2 text-left"
    >
      <h5>{{ title }}</h5>
      <!-- Descriptions are disabled in the Wikimedia API, can be done using different API but wonder if it's needed ?-->
      <p>{{ description }}</p>
      <p class="text-sm text-gray-500 break-all">{{ url }}</p>
    </div>
  </NuxtLink>
</template>
