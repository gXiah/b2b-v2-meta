*Description by directories*

***********
src/library
***********

-------------------------------------

Description
^^^^^^^^^^^
The libraries stores the app's graphic components (Buttons, forms, panels, ...). It is divided into two categories, each one divided into two others.

- library /
	- common /
		- components /
			- SampleComponent/
				* component_1.vue
				* component_2.vue
		- panels
	- custom /
		- components /
		- panels /

The components are *Vue single-file components*

Importing a component
^^^^^^^^^^^^^^^^^^^^^

To import a component, use one of the following links :

- ``@lib`` -> ./src/library
	- ``@libcommon`` -> ./src/library/common
		- ``@commoncmp`` -> ./src/library/common/components
		- ``@commonpnl`` -> ./src/library/common/panels
	- ``@libcustom`` -> ./src/library/custom

.. code-block:: html
	:linenos:

	// Importing a sample component

	import vuiButton from '@commoncmp/buttons/vui-button.vue';

	<template>

	    <!-- (...) -->

	    <vuiButton :targetId="targetId" :signature="signature"></vuiButton>

	    <!-- (...) -->

	</template>

	<script>

		// (...)

		components: {
	        vuiButton
	    }

	    // (...)

	</script>
