<template>

    <div class="content-alert">
        <div class="text-blue-600 mr-4">
            <i class="fas fa-exclamation"></i>
        </div>
        Объявление
    </div>

    <div v-if="isLoadingMore" class="preloader">
        Загрузка
    </div>

    <div class="scroll-container" ref="scrollContainer">
        <div ref="listContainer" class="posts-list" v-if="posts">
            <PostItem v-for="post in posts"
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

import { mapGetters } from 'vuex'
import PostItem from "@/components/PostItem";

export default {
    name: "HomePage",
    data(){
        return {
        }
    },
    components: {PostItem},
    computed: {
        ...mapGetters(['posts', 'next_page', 'isLoadingMore', 'canLoadMore']),
    },
    methods: {
        loadNextPosts(){
            this.$store.dispatch('loadIndexPage');
        },
        setUpInterSectionObserver() {
            let options = {
                root: this.$refs.app,
                margin: "10px",
            };
            this.listEndObserver = new IntersectionObserver(
                this.handleIntersection,
                options
            );
            this.listEndObserver.observe(this.$refs.sentinel);
        },
        handleIntersection([entry]) {
            console.log("1");
            if (entry.isIntersecting) {
                console.log("sentinel intersecting");
            }
            if (entry.isIntersecting && this.canLoadMore && !this.isLoadingMore) {
                //this.loadMore();
                console.log('ok');
                this.loadNextPosts();
            }
        },
    },
    mounted() {
        if(!this.posts.length){
            this.$store.dispatch('loadIndexPage');
        }
        console.log('mounted');
        this.setUpInterSectionObserver();
    },
    unmounted() {
        console.log('unmounted');
    }
}
</script>

<style>

</style>