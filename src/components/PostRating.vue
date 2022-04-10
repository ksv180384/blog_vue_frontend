<template>
    <div class="post-item-left">
        <div @click.prevent="up" class="left-rating-up" :class="{ active: this.use_rating == 1 }">
            <i class="fas fa-sort-up -mb-3"></i>
        </div>
        <div class="left-rating-count" :class="{ 'text-red-600': this.rating < 0 }">{{ this.rating }}</div>
        <div @click.prevent="down" class="left-rating-down" :class="{ active: this.use_rating === 2 }">
            <i class="fas fa-sort-down -mt-2.5"></i>
        </div>
    </div>
</template>

<script>

import api from "@/api";

export default {
    name: "PostRating",
    props: {
        post_id: {
            type: Number,
            required: true
        },
        post_rating: {
            type: Number,
            required: true
        },
        post_use_rating: {
            type: Number
        }
    },
    data(){
      return {
          rating: this.post_rating,
          use_rating: this.post_use_rating,
      }
    },
    methods: {
        up(){
            if(!this.$store.state.auth){
                return true;
            }
            api.post('post/up', { id: this.post_id }).then(response => {
                const p = response.post;
                this.rating = p.rating;
                //this.up_count = p.up_count;
                //this.down_count = p.down_count;
                this.use_rating = p.use_rating;
            }).catch(error => {
                console.log(error);
            });
        },
        down(){
            if(!this.$store.state.auth){
                return true;
            }
            api.post('post/down', { id: this.post_id }).then(response => {
                const p = response.post;
                this.rating = p.rating;
                //this.up_count = p.up_count;
                //this.down_count = p.down_count;
                this.use_rating = p.use_rating;
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>

</style>