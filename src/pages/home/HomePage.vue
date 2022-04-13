<template>

    <div class="content-alert">
        <div class="text-blue-600 mr-4">
            <i class="fas fa-exclamation"></i>
        </div>
        Объявление
    </div>

    <div class="posts-list" v-if="posts">
        <PostItem v-for="post in posts"
                  :key="post.id"
                  :post="post"
        />
        <div class="text-center pb-3">
            <button class="btn btn-primary" @click="loadNextPosts">еще</button>
        </div>
    </div>

</template>

<script>

import { mapGetters } from 'vuex'
import PostItem from "@/components/PostItem";

export default {
    name: "HomePage",
    components: {PostItem},
    computed: {
        ...mapGetters(['posts', 'next_page']),
    },
    methods: {
        loadNextPosts(){
            this.$store.dispatch('loadIndexPage');
        }
    },
    mounted() {
        if(!this.posts.length){
            this.$store.dispatch('loadIndexPage');
        }
        console.log('mounted');
    },
    unmounted() {
        console.log('unmounted');
    }
}
</script>

<style scoped>

</style>