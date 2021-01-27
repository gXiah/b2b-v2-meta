<template>
	<button @click="clicked">Increment : {{num}}</button>
</template>

<script>

	import { GUID } from '@guid';

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
								public_id: `vui-button-${GUID.min_gen()}`,
								private_key: GUID.generate(),
								signatures: ["button"]
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
	
	button{
		padding: 5px;
		font-weight: bold;
	}

</style>