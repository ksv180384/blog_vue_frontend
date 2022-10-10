<template>
    <div class="post-item-left">
        <div @click.prevent="handleRating('up')" class="left-rating-up" :class="{ active: this.use_rating == 1 }">
            <i class="fas fa-sort-up -mb-3"></i>
        </div>
        <div class="left-rating-count" :class="{ 'text-red-600': this.rating < 0 }">{{ this.rating }}</div>
        <div @click.prevent="handleRating('down')" class="left-rating-down" :class="{ active: this.use_rating === 2 }">
            <i class="fas fa-sort-down -mt-2.5"></i>
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";
import { postUp, postDown } from "@/services/post_service";

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
    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        async handleRating(action){
            if(!this.auth){
                return true;
            }
            try {
                let resPostRating;
                if(action === 'up'){
                    resPostRating = await postUp(this.post_id);
                }else if(action === 'down'){
                    resPostRating = await postDown(this.post_id);
                }
                const post = resPostRating?.post;
                this.rating = post.rating;
                this.use_rating = post.use_rating;
            } catch (e) {
                console.log(e);
            }
        },
    }
}
</script>

<style scoped>
.post-item-left{
    @apply absolute -left-10 text-gray-400 text-center
}

.left-rating-up,
.left-rating-down{
    @apply cursor-pointer hover:text-blue-400 transition duration-300 text-2xl
}

.left-rating-up>i,
.left-rating-down>i{
    @apply block
}

.left-rating-up.active{
    @apply text-green-600
}

.left-rating-down.active{
    @apply text-red-600
}

.left-rating-count{
    @apply text-xs font-bold
}
</style>