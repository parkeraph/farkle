<script lang="ts">
    import { onMounted, ref } from 'vue'
    import { INote } from "../models/intefaces"

    export default {
        setup() {
            const name = ref('parker');

            const doIt = () => console.log(`Hello ${name.value}`);

            onMounted(() => {
                doIt();
            });

            return { name };
        }
    };
</script>

<template>
   <li>
       <div>{{props.note.content}}</div>
   </li>
</template>
