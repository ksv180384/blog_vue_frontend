<template>
    <div class="post-comment-rating">
        <i @click="up" class="fas fa-sort-up"></i>
        {{ comment_item.rating }}
        <i @click="down" class="fas fa-sort-down"></i>
    </div>
</template>

<script>
import api from "@/api";

export default {
    name: "PostCommentRating",
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            comment_item: this.comment,
        }
    },
    methods: {
        up(){
            if(!this.$store.state.auth){
                return true;
            }
            api.post('/post/comment/up', { id: this.comment_item.id }).then(response => {
                this.comment_item.rating = response.rating;
                this.comment_item.up_count = response.up_count;
                this.comment_item.down_count = response.down_count;
                this.comment_item.use_rating = response.use_rating;

            }).catch(error => {
                console.log(error);
            });
        },
        down(){
            if(!this.$store.state.auth){
                return true;
            }
            api.post('post/comment/down', { id: this.comment.id }).then(response => {
                this.comment_item.rating = response.rating;
                this.comment_item.up_count = response.up_count;
                this.comment_item.down_count = response.down_count;
                this.comment_item.use_rating = response.use_rating;
            }).catch(error => {
                console.log(error);
            });
        },
    }
}
</script>

<style scoped>

</style>