<script setup lang="ts">
import { useVirtualList } from "@vueuse/core";
import { debounce } from "lodash";

const handleRecentSearch = (searchTerm) => {
  // we could do this in a more efficient way, but for the sake of simplicity, we'll just use localStorage
  // we also could limit the number of recent searches, etc...

  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];
  if (recentSearches.includes(searchTerm)) return;
  recentSearches.push(searchTerm);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
};

let recentSearches = [];
if (process.client) {
  recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
}

const searchTerms = ref("");

const {
  data: searchResults,
  execute,
  status,
  error,
} = await useAsyncData(
  `wiki-search-${searchTerms.value}`,
  () =>
    $fetch("/api/search", {
      query: { text: searchTerms.value, limit: 30 },
    })
      .then((res) => res.results)
      .catch((err) => err),
  {
    immediate: false,
  }
);

const update = debounce(() => {
  if (searchTerms.value) {
    handleRecentSearch(searchTerms.value);
  }

  execute();
}, 500);

const { list, containerProps, wrapperProps } = useVirtualList(
  computed(() => searchResults.value ?? []),
  {
    itemHeight: 150,
  }
);

watch(() => searchTerms.value, update);
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="text-center py-10 space-y-6">
    <h4 id="moving-gradient" class="text-2xl font-semibold gradient-text">
      Search for your Wikipedia articles<br />fast and easy!
    </h4>

    <FieldsInput v-model="searchTerms" />
    <div v-if="recentSearches.length > 0">
      <h5 class="text-lg font-semibold">Recent Searches</h5>
      <div class="flex flex-wrap justify-center space-x-2 gap-2">
        <span
          v-for="search in recentSearches"
          :key="search"
          class="cursor-pointer bg-white rounded-lg px-2 py-1"
          @click="searchTerms = search"
        >
          {{ search }}
        </span>
      </div>
    </div>
    <div v-if="status === 'pending'" class="text-center">
      <p class="font-medium">Loading content...</p>
    </div>
    <div v-if="error" class="text-center">
      <h4 class="text-red-500">
        Error while fetching information {{ error.message }}
      </h4>
    </div>
    <div v-if="status === 'success'">
      <div
        v-if="
          searchResults &&
          searchResults.results &&
          searchResults.results.length === 0
        "
        class="text-center"
      >
        <h4 class="text-red-500">No results found.</h4>
      </div>
    </div>
    <div style="height: 400px" v-bind="containerProps">
      <div v-bind="wrapperProps" class="flex gap-4 flex-col">
        <div v-for="item in list" :key="item.index" style="height: 150px">
          <Card
            :title="item.data.title"
            :description="item.data.snippet"
            :url="item.data.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>
