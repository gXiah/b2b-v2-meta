<template>
	<button @click="clicked">Increment : {{num}}</button>
</template>

<script>

	export default{
		name : 'vuiButton',

		data(){
			return {
				
			}
		},

		props: [
			'value'
		],

		mounted(){
			this.$store.dispatch(
							'pipeline/subscribe',
							{
								public_id: "id",
								private_key:"key",
								signatures: ["button","custom"]
							}
						)
		},

		components: {},

		methods: {
			clicked(){
				this.$store.dispatch('pipeline/val')
			}
		},

		computed: {

			/*num(){
				return this.$store.getters['pipeline/val'](2)
			}*/

		}
	};
	
</script>

<style scoped>
	
</style>