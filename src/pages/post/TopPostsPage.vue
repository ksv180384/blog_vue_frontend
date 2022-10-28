<template>
    <div class="scroll-container">
        <div class="posts-list" v-if="posts">
            <PostItem v-for="post in posts"
                      :key="post.id"
                      :post="post"
            />
        </div>

        <LoadNextContent v-show="posts.length && next_page" id="sentinel" @onVisible="loadPostsNext"/>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from "vuex";
import { setMetaTags } from "@/helpers";
import store from "@/store/indexStore";
import PostItem from "@/components/PostItem";
import LoadNextContent from "@/components/LoadNextContent";

export default {
    name: "TopPosts",
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('storeTopPostsPage/loadPosts');
        setMetaTags(`Лучшее - блог`, { description: `Лучшее - блог` });
        next();
    },
    computed: {
        ...mapGetters('storeTopPostsPage', ['posts', 'next_page']),
    },
    methods: {
        ...mapMutations('storeTopPostsPage', ['setPosts']),
        ...mapActions('storeTopPostsPage', ['loadPostsNext']),
    },
    unmounted() {
        this.setPosts([]);
    },
    components: { PostItem, LoadNextContent }
}
</script>

<style scoped>

</style>