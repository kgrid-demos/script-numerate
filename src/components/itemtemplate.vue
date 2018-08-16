<template>
  <div>
    <b>#{{item.rxcui}}</b>
    <span>{{ item.name }}</span>
    <!-- <abbr>{{item.rxcui}}</abbr> -->
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>
