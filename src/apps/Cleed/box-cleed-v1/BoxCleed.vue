<template>

  <panelDashboard panel_id="1"></panelDashboard>
  <br>
  <panelDashboard panel_id="2"></panelDashboard>
  <!-- ==== EXAMPLE ====
    <leftPane></leftPane>
    <topPane1></topPane1>
    <topPane2></topPane2>
    <mainChatPane></mainChatPane>
  -->
</template>

<script>

  import panelDashboard from '@commonpnl/dashboard.vue';

  export default {
    name: 'BoxCleed',
    
    props: {},

    components: {
      panelDashboard
    },

    data(){
      return {}
    },

    computed:{},
    
    watch:{},
    
    methods: {},
    
    created(){},
    
    mounted(){}
  };

</script>

<style scoped>

</style>