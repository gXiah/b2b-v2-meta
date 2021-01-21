What is section
===============

This section aims te define the components of Porthole, as well as to explain
how to use / modify them.

***********
State Store
***********



********************
Configuration System
********************

What it is
##########

The configuration system is a set of **tools** and of **rules** that aim to
provide an interface between the apps components, and their configuration.

The goal is to have an independant configuration interface, to modify the
apps behaviors without having to directly modify their code files.

How it works
############

The configuration system is located in ```./src/configuration``` and is made of
**3 main components** :

* The controllers : which are ```index.js``` and ```config.obj.js```
* The Global Config file : A global configuration file that acts as a default configuration
* The Custom Config Directory : A folder that contains custom configuration files that can override the global configuration.

How to use it
#############

How to add a configuration file
*******************************

How to Read / Write from a configuration file
*********************************************