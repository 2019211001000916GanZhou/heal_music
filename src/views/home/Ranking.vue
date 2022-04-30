<template>
    <div>
        <h1>Ranking</h1>
        
    </div>
</template>

<script>
import {get} from '../../utils/axios'
    export default {
        data() {
            return {
                
            }
        },
        components:{
            
        },
        methods: {
            async getNavTopList(){
                const data = await get('/toplist/artist')
                console.log(data);
            }
        },
        created() {
            this.getNavTopList()
        },
    }
</script>

<style scoped>

</style>