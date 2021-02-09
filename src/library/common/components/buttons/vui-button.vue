<template>
	<button @click="clicked">{{public_id}} -> {{targetId}}</button>
</template>

<script>

	import { GUID } from '@guid';

	export default{
		name : 'vuiButton',

		data(){
			return {
				public_id: `vui-button-${GUID.min_gen()}`,
				private_key: GUID.generate()
			}
		},

		props: [
			'targetId',
			"signature"
		],

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

		components: {},

		methods: {
			clicked(){
				this.$store.dispatch('pipeline/send', 
										{	
											sender_key: this.private_key,
											sender_id:this.public_id,
											request_body: {a: `msg from ${this.public_id}`},
											target_id: this.$props.targetId
										}
									)
			}
		},

		computed: {

			listener(){
				return this.$store.getters['pipeline/listen'](this.private_key);

			}

		}
	};
	
</script>

<style scoped>
	
	button{
		padding: 5px;
		font-weight: bold;
	}

</style>