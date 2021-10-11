<template>
  <div
    class="absolute top-4 right-4 p-4 rounded-lg text-white shadow-2xl font-medium max-w-sm w-full"
    :class="[error ? 'bg-red-500' : 'bg-green-500', show ? 'block' : 'hidden']"
  >
    {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
    error: Boolean,
    message: String
  },
  //   data() {
  //     return {
  //       show: false
  //     };
  //   },
  mounted() {

    const callback = function() {
        console.log("Execuiting timeout");
        this.show = false
    }
    setTimeout(callback, 3000);
  }
};
</script>
