<template>
  <div class="col-2">
    <div class="col-2">
      <panelDashboard panel_id="1" targetId="#ARP::Broadcast"></panelDashboard>
      <br>
      <panelDashboard panel_id="2" targetId="#ARP"></panelDashboard>
      <br>
      <panelDashboard panel_id="3" targetId="#SIG-pipesig"></panelDashboard>
      <br>
      <panelDashboard panel_id="4" targetId="#SIG-wrongSig"></panelDashboard>
      <br>
      <panelDashboard panel_id="5" targetId="wrong" signature="mysig"></panelDashboard>
      <br>
      <panelDashboard panel_id="6" targetId="pipeline-1"></panelDashboard>
      <br>
      <panelDashboard panel_id="7" targetId="pipeline-wrong"></panelDashboard>
      <br>
    </div>
    <div class="col-2">
      
    </div>
  </div>
  <div class="col-2">
    <pipelineView signature="pipesig"></pipelineView>
  </div>
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