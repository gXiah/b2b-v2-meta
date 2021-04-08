*Description by directories*

********
src/data
********

-------------------------------------

Description
^^^^^^^^^^^

The *./src/data/* directory represents the app's store, in a Vuex sense.
Inside *./src/data/state/* you will find the main store file : ``index.js`` as well as the store's modules in *./modules* and the store's logic in *./assets/*


index.js
^^^^^^^^

The index file defines the Vuex store in a fairly common manner. It is important to notice that **The store's modules are namespaced**

Refer to this `documentation page <https://vuex.vuejs.org/guide/modules.html#namespacing>`_

The 'main' module
^^^^^^^^^^^^^^^^^

Stores the session lifespan ``session_lifespan``. Set to ``-1`` for a non-expiring session, or set to a lifespan in *seconds*.

The session is stored as a persisted state element (See: ``./src/data/state/index.js`` -> ``sessionPersistedState`` variable). 

You may also read more about persisted states `here <https://www.npmjs.com/package/vuex-persistedstate>`_


The 'pipeline' module
^^^^^^^^^^^^^^^^^^^^^

*Not done yet*

The 'session' module
^^^^^^^^^^^^^^^^^^^^

Defines the user's session. A user is attributed a V4 UUID upon first visit, the session can then be regenerated after expiry, or non-expiring.