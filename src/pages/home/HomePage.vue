<template>

    <div class="content-alert">
        <div class="text-blue-600 mr-4">
            <i class="fas fa-exclamation"></i>
        </div>
        Объявление!!!
    </div>

    <div v-if="is_loading_more_posts" class="preloader">
        Загрузка
    </div>

    <div class="scroll-container" ref="scrollContainer">
        <div ref="listContainer" class="posts-list" v-if="posts">
            <PostItem v-for="post in posts"
                      :key="post.id"
                      :post="post"
            />

            <LoadNextContent v-show="next_page" ref="sentinel"/>

        </div>
    </div>

</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import PostItem from "@/components/PostItem";
import {getPostsNext, getPostsPage} from "@/servises/post_servise";
import LoadNextContent from "@/components/LoadNextContent";

export default {
    name: "HomePage",
    data(){
        return {
            is_loading_more_posts: false,
        }
    },
    components: {LoadNextContent, PostItem },
    computed: {
        ...mapGetters(['is_loading_page']),
        ...mapGetters('storeHomePage', ['posts', 'next_page']),
    },
    methods: {
        ...mapMutations(['setIsLoadingPage']),
        ...mapMutations('storeHomePage', ['setPosts', 'pushPosts', 'setNextPage']),
        /*async loadNextPosts(){
            const resPostsPage = await getPostsPage({ page: this.next_page});

        },*/
        async loadPosts(){
            this.setIsLoadingPage(true);
            const resPostsPage = await getPostsPage();
            this.setIsLoadingPage(true);
            this.setPosts(resPostsPage.posts.data)
            this.setNextPage(resPostsPage.posts.pagination.next_page);
        },
        async loadPostsNext(){
            this.is_loading_more_posts = true;
            const resPostsPage = await getPostsNext({ page: this.next_page});
            this.is_loading_more_posts = false;
            this.pushPosts(resPostsPage.posts.data);
            this.setNextPage(resPostsPage.posts.pagination.next_page);
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
            this.listEndObserver.observe(this.$refs.sentinel.$el);
        },
        handleIntersection([entry]) {
            /*
            console.log("1");
            if (entry.isIntersecting) {
                console.log("sentinel intersecting");
            }*/
            if (entry.isIntersecting) {
                console.log('ok');
                //this.loadPostsNext();
            }
        },
    },
    mounted() {
        if(!this.posts.length){
            //this.$store.dispatch('loadIndexPage');
            this.loadPosts();
        }

        this.setUpInterSectionObserver();
    },
    unmounted() {
        console.log('unmounted');
    }
}
</script>