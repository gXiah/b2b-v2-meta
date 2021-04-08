*Description by directories*

********
src/apps
********

-------------------------------------

Description
^^^^^^^^^^^
The ``./src/apps/`` directory contains the boxes applications, as seen by a user. A box app is a ``.vue`` file that describes the box from a user's perspective, for example : A box can be a combination of **1)** A header for the title and close button, **2)** A main panel for message, and picture, ... , **3)** And finally, an input panel for user interraction.

This description is done inside the ``<template>`` tag of the ``.vue`` file, and the ``<script>`` tag is used to import the required panels and components, and **only** that.

Example
^^^^^^^

.. code-block:: html
	:linenos:

	<!-- 
		AppExample.vue

		 _______________
		|               |
		| Custom Header |
		|_______________|
		|               |
		|               |
		|    Message    |
		|    Panel      |
		|               |
		|               |
		|_______________|
		|   Input Area  |
		|_______________|
	-->

	<template>

		<Custom-Header></Custom-Header>

		<Messages-Panel></Messages-Panel>

		<Input-Area></Input-Area>

	</template>

	<script>

		import CustomHeader from './path/to';
		import MessagesPanel from './path/to';
		import InputArea from './path/to';

		export default {

			name: 'app-name',

			components: {
				CustomHeader,
				MessagesPanel,
				InputArea
			},

			data(){
				return{}
			}

		};

	</script>

Important Notice
^^^^^^^^^^^^^^^^

* Do not include logic in the ``<script>`` tag
	* Any logic should be added inside the components or sub-components thereof
* Do not use the ``<slot>``
	* `Vuejs components slots <https://vuejs.org/v2/guide/components-slots.html>`_


Folder structure
^^^^^^^^^^^^^^^^

For better structure, it is strongly recommended to name the box files as follows:

.. code-block::

	s_[store_id]-b_[box_name]-v_[version_number].vue

	// Regex
	// s_([a-z0-9_]{2,})-b_([a-z0-9_]{2,})-v_([a-z0-9_]+).vue

.. code-block:: json

	./src/apps/

		Store_1/
			Default_box/
				s_1-b_default-v_2020_1.vue
			Easter_box/
				s_1-b_easter-v_2021_1.vue
			X-max_box/
				s_1-b_x_max-v_2021_2.vue

		Store_2/
			Default_box/
			Spring_box/
			Summer_box/