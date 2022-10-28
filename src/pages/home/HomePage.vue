<template>
    <div class="scroll-container">
        <div class="posts-list" v-if="posts">
            <PostItem v-for="post in posts"
                      :key="post.id"
                      :post="post"
            />
        </div>

        <LoadNextContent v-show="next_page" id="sentinel" @onVisible="loadPostsNext"/>
    </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { setMetaTags } from '@/helpers';
import store from '@/store/indexStore';
import PostItem from "@/components/PostItem";
import LoadNextContent from "@/components/LoadNextContent";

export default {
    name: "HomePage",
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('storeHomePage/loadPosts');
        setMetaTags('Блог', { description: 'Тестовый блог.' });
        //next(vm => vm.setData(resLoadPosts));
        next();
    },
    computed: {
        ...mapGetters(['is_loading_page']),
        ...mapGetters('storeHomePage', ['posts', 'next_page']),
    },
    methods: {
        ...mapActions('storeHomePage', ['loadPostsNext']),
    },
    components: { LoadNextContent, PostItem },
}
</script>