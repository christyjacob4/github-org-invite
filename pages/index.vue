<template>
  <div class="w-screen h-screen bg-background items-center justify-center flex">
    <Alert :error="error" :message="message" :show="message ? true : false" />

    <form
      @submit="sendInvite"
      class="
        flex flex-col
        bg-white
        p-10
        rounded-xl
        shadow-2xl
        items-center
        space-y-8
        max-w-md
        text-lg
        text-gray-700
      "
    >
      <img :src="orgAvatar" class="h-44 rounded-lg" alt="" />

      <p class="text-center">
        You've been invited to join the
        <b class="capitalize">{{ $config.orgName }}</b> org on GitHub! Drop in
        your username to receive your invite!
      </p>

      <div v-if="$config.enableDiscord " class="flex flex-col space-y-4 w-full">
        <label class="block text-md font-medium" for="discord"
          >Discord Username</label
        >
        <input
          name="discord"
          type="text"
          required
          v-model="discord"
          class="
            focus:ring-accent
            focus:border-accent
            block
            w-full
            rounded-md
            sm:text-sm
            border-gray-300
            py-3
            px-3
          "
          placeholder="Enter your Discord username"
        />
      </div>

      <div class="flex flex-col space-y-4 w-full">
        <label class="block text-md font-medium" for="github"
          >Github Username</label
        >
        <input
          name="github"
          type="text"
          required
          v-model="github"
          class="
            focus:ring-accent
            focus:border-accent
            block
            w-full
            rounded-md
            sm:text-sm
            border-gray-300
            py-3
            px-3
          "
          placeholder="Enter your GitHub username"
        />
      </div>

      <button
        type="submit"
        class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-accent filter hover:brightness-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
          />
        </svg>
        <p>Send me an Invite!</p>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discord: "",
      github: "",
      message: "",
      error: false
    };
  },
  async asyncData({ params, error, $http }) {
    const res = await $http.$get("/api/org");
    return {
      orgAvatar: res.url
    };
  },
  mounted() {
    console.log(this.org);
  },
  methods: {
    async sendInvite(e) {
      e.preventDefault();

      console.log(
        `Sending invite to user with Discord: ${this.discord} and GitHub: ${this.github}`
      );

      const res = await this.$http.$get(`/api/add/${this.github}/${this.discord}`);

      console.log(res);

      (this.error = res.error), (this.message = res.message);
    }
  }
};
</script>
