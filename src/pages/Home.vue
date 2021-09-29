<template>
    <zb-responsive-list :datas="datas" title="My Dns Records" description="Hello cruel world"/>
</template>

<script setup>
import { ref } from 'vue'
import ZbResponsiveList from '../components/ResponsiveList.vue'

const datas = ref([
    {
        id: 1,
        title: 'one.google.com',
        body: "192.168.0.1"
    },
    {
        id: 2,
        title: 'two.google.com',
        body: "192.168.0.2"
    },
    {
        id: 3,
        title: 'three.google.com',
        body: "192.168.0.3"
    },
    {
        id: 4,
        title: 'four.google.com',
        body: "192.168.0.4"
    },
    {
        id: 5,
        title: 'five.google.com',
        body: "192.168.0.5"
    },{
        id: 6,
        title: 'six.google.com',
        body: "192.168.0.1"
    },
    {
        id: 7,
        title: 'seven.google.com',
        body: "192.168.0.2"
    },
    {
        id: 8,
        title: 'eight.google.com',
        body: "192.168.0.3"
    },
    {
        id: 9,
        title: 'nine.google.com',
        body: "192.168.0.4"
    },
    {
        id: 10,
        title: 'ten.google.com',
        body: "192.168.0.5"
    },
])

</script>