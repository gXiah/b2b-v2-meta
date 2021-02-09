<template>

  <panelDashboard panel_id="1" targetId="#ARP::Broadcast"></panelDashboard>
  <br>
  <panelDashboard panel_id="6" targetId="#ARP"></panelDashboard>
  <br>
  <panelDashboard panel_id="2" targetId="#SIG-mysig-1"></panelDashboard>
  <br>
  <panelDashboard panel_id="2" targetId="wrong" signature="mysig"></panelDashboard>
  <br>
  <panelDashboard panel_id="2" targetId="pipeline-1"></panelDashboard>
  <br>
  <pipelineView></pipelineView>
  <!-- ==== EXAMPLE ====
    <leftPane></leftPane>
    <topPane1></topPane1>
    <topPane2></topPane2>
    <mainChatPane></mainChatPane>
  -->
</template>

<script>

  import panelDashboard from '@commonpnl/dashboard.vue';
  import pipelineView from '@commonpnl/pipeline.vue';

  export default {
    name: 'BoxCleed',
    
    props: {},

    components: {
      panelDashboard,
      pipelineView
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