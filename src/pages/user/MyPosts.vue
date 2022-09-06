<template>
    <h1>Мои посты</h1>

    <div class="scroll-container" ref="scrollContainer">
        <div ref="listContainer" class="posts-list" v-if="my_posts">
            <PostItem v-for="post in my_posts"
                      :key="post.id"
                      :post="post"
            />
            <div class="text-center pb-3">
                <button class="btn btn-primary" @click="loadNextPosts">еще</button>
            </div>
        </div>
        <div ref="sentinel">oooo</div>
    </div>
</template>

<script>

import PostItem from "@/components/PostItem";

import api from "@/api";

export default {
    name: "MyPosts",
    components: {PostItem},
    data(){
        return {
            my_posts: []
        }
    },
    /*computed: {
        my_posts: []
    },*/
    methods: {
        async loadMyPosts(){
            const res = await api.get('/my-posts');
            this.my_posts = res.posts.data;
        },
        loadNextPosts(){
            //this.$store.dispatch('loadIndexPage');
        },
    },
    mounted() {
        this.loadMyPosts();
        //this.$store.dispatch('loadMyPosts', this.$route.params.id);
    }
}
</script>

<style scoped>

</style>