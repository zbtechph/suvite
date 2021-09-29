<template>
    <div>
        <div class="p-2 rounded mb-2">
            <div class="py-4 text-center">
                <h1 class="text-xl" v-text="props.title"></h1>
                <p class="text-sm" v-text="props.description"></p>
            </div>
            <div class="flex flex-row items-center space-x-2">
                <div class="relative w-3/4">
                    <div class="absolute p-3 pointer-events-none">
                        <svg class="fill-current h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                    </div>
                    <input type="text" class="rounded border w-full p-2 pl-10 focus:outline-none"/>
                </div>
                <div class="w-1/4">
                    <button type="button" class="p-2 w-full bg-green-500 text-green-100 font-semibold rounded focus:outline-none focus:ring focus:ring-green-300 focus-ring-opacity-50 disabled:opacity-50"> SEARCH </button>
                </div>
            </div>
        </div>
        <ul class="divide-y divide-gray-300 divide-solid">
            <zb-responsive-list-item v-for="( data, index ) in datas" :key="data.id" :content="data" @dblclick="select(data,$event)" @click="selectHighlight(data, $event)" @click.shift="highlightMultiple($event)"/>
        </ul>
        <zb-responsive-list-pager class="p-2"/>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ZbResponsiveListItem from './ResponsiveListItem.vue';
import ZbResponsiveListPager from './ResponsiveListPager.vue'

const props = defineProps({
    datas: Array,
    title: String,
    description: String,
})

const selectHistory = ref([])
const dblClickStarted = ref(false)

const selectedCount = computed(()=>{
    let count = 0;
    props.datas.forEach(data => {
        if(data.selected) count++
    })
    return count;
})

const select = (data, e) => {
    dblClickStarted.value = true;
    highlight(data,e);
}

const selectHighlight = (data, e) => {
    if(dblClickStarted.value){
        highlight(data,e)
    }
    if(selectedCount.value === 0){
        dblClickStarted.value = false;
    }
}

const highlight = (data, e) => {
    if(selectHistory.value[selectHistory.value.length] !== data) {
        selectHistory.value.push(data)
    }
    const ignoreBtns = e.target.closest("li").querySelector(".btns")
    if(ignoreBtns !== e.target && ! ignoreBtns.contains(e.target)){
        data.selected = !data.selected;
    }
}

const highlightMultiple = ( e ) => {
    e.preventDefault()
    let history = selectHistory.value;
    if(history.length <= 0){
        return;
    }
    const last = history.pop()
    const first = history.pop()

    const start = first.id < last.id ? first : last;
    const end = last.id > first.id ? last : first;
    
    props.datas.forEach((item)=>{
        if(start.id <= item.id && end.id >= item.id){
            item.selected = first.selected
        }
    })

}

</script>