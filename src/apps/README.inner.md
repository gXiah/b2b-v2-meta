## Apps directory

The ``./src/apps/`` directory contains the boxes applications, as seen by a user. A box app is a ``.vue`` file that describes the box from a user's perspective, for example : A box can be a combination of **1)** A header for the title and close button, **2)** A main panel for message, and picture, ... , **3)** And finally, an input panel for user interraction.

This description is done inside the ``<template>`` tag of the ``.vue`` file, and the ``<script>`` tag is used to import the required panels and components, and **only** that.