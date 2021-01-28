<template>
    <div id="panel-dashboard">
        <h2>Panel #{{panel_id}}</h2>
        <vuiButton targetId="#ARP::Broadcast"></vuiButton>
    </div>
</template>

<script>
    import vuiButton from '@commoncmp/buttons/vui-button.vue';
    
    export default{

        name: 'panelDashboard',

        props: [
            'panel_id'
        ],

        components: {
            vuiButton
        }

    };

</script>

<style scoped>

    #panel-dashboard{
        background-color: grey;
        padding: 5px;
    }

</style>