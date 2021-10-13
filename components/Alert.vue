<template>
  <div
    class="text-white px-6 py-4 border-2 border-white rounded-md shadow-2xl absolute right-0 top-0 mt-10 mr-10"
    :class="[isError ? 'bg-red-500' : 'bg-green-500']"
  >
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell" />
    </span>
    <span class="inline-block align-middle font-semibold mr-8">
      {{ message }}
    </span>
    <button
      @click="dismissAlert"
      class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
    >
      <span>×</span>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: ["message", "isError"],
  data() {
    return {
      timeout: null
    };
  },
  methods: {
    ...mapMutations(["setAlert"]),
    dismissAlert() {
      this.setAlert({ show: false });
      this.timeout && clearTimeout(this.timeout);
    }
  },
  created() {
    this.timeout = setTimeout(() => this.setAlert({ show: false }), 4000);
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  }
};
</script>
