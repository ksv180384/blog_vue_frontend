<template>
    <PostItem v-if="post" :post="post"/>

    <div v-if="comments">
        <PostCommentItem v-for="comment in comments" :comment="comment" :key="comment.id"/>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

import PostItem from '@/components/PostItem';
import PostCommentItem from '@/components/PostCommentItem';

export default {
    components: {PostCommentItem, PostItem},
    data(){
        return {}
    },
    computed: {
        ...mapGetters(['post', 'comments']),
    },
    mounted() {
        this.$store.dispatch('loadPost', this.$route.params.id);
    }
}
</script>

<style scoped>

</style>