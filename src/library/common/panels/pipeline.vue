<template>
    <div id="panel-dashboard">
        <h2>Pipeline View</h2>
        <br>
        
        <div class="col-3">
            <h5>Direct Msg | {{listener[0].length}}</h5>
            <hr><br>
            <p 
                v-for="req in listener[0]" v-bind:key="req"
                style="border:1px solid black;padding:5px; margin-bottom:5px;margin-right:3px"
            >
                Sender ID # {{ req.sender_id }}
                <br>
                Sender Key {{ req.sender_key ? req.sender_key : '***********' }}
                <br>
                Body : {{ req.request_body }}
                <br>
                Target : {{ req.target_id }}
                <br>
            </p>
        </div>
        <div class="col-3">
            <h5>Broadcast (ARP) | {{listener[1].length}}</h5>
            <hr><br>
            <p 
                v-for="req in listener[1]" v-bind:key="req"
                style="border:1px solid black;padding:5px; margin-bottom:5px;margin-right:3px"
            >
                Sender ID # {{ req.sender_id }}
                <br>
                Sender Key {{ req.sender_key ? req.sender_key : '***********' }}
                <br>
                Body : {{ req.request_body }}
                <br>
                Target : {{ req.target_id }}
                <br>
            </p>
        </div>
        <div class="col-3">
            <h5>Signatures (SIG) | {{listener[2].length}}</h5>
            <hr><br>
            <p 
                v-for="req in listener[2]" v-bind:key="req"
                style="border:1px solid black;padding:5px; margin-bottom:5px;"
            >
                Sender ID # {{ req.sender_id }}
                <br>
                Sender Key {{ req.sender_key ? req.sender_key : '***********' }}
                <br>
                Body : {{ req.request_body }}
                <br>
                Target : {{ req.target_id }}
                <br>
            </p>
        </div>
    </div>
</template>

<script>
    import { GUID } from '@guid';
    
    export default{

        name: 'pipelineView',

        data(){
            return {
                public_id: `pipeline-1`,
                private_key: GUID.generate()
            }
        },

        props: [
            'signature'
        ],

        components: {
        },

        mounted(){
            this.$store.dispatch(
                            'pipeline/subscribe',
                            {
                                public_id: this.public_id,
                                private_key: this.private_key,
                                signatures: [this.$props.signature]
                            }
                        )
        },

        computed: {

            listener(){
                let ret = this.$store.getters['pipeline/listen'](this.private_key);
                return ret

            }

        }

    };

</script>

<style scoped>

    #panel-dashboard{
        background-color: orange;
        padding: 5px;
    }

</style>