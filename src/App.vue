<template>
  <div style="background-color: #fffbea; min-height: 100vh;">
    <nav class="navbar navbar-light bg-white shadow sticky-top">
      <div class="container-fluid justify-content-between">
        <a class="navbar-brand fw-semibold text-secondary" href="#">MEMO BOX</a>
        <form class="d-flex" role="search">
          <input class="form-control rounded-pill" type="search" placeholder="Search..." aria-label="Search" v-model="search" @input="filterNotes" />
        </form>
      </div>
    </nav>

    <MemoBoxHome :searchQuery="search" />
  </div>
</template>

<script>
import MemoBoxHome from './views/MemoBoxHome.vue'


export default {
  name: 'App',
  components: { MemoBoxHome },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    filterNotes() {
      // We will pass this.search to MemoBoxHome to filter notes
    }
  }
}
</script>
