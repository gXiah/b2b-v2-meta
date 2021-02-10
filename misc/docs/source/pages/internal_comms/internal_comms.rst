Internal Communication Process
==============================

This section aims te define the way components communicate with *each other*
The external communication process will be described later in this documentation

*********************
Internal Commnication
*********************

The internal components can communicate with each others using Orders and Requests.
Orders are messages that contains a header and a body of data.

There are 2 main internal message types :
 - The DIRECT orders :  Orders sent from one component directly to another one.
 - The BROADCAST requests : Orders sent from one component to *ALL* the other ones

************
How it works
************

 - Let's assume that an application has 2 components : the component A and the component B

 - If both components want to be able to send and receive communications, they have to first subscribe to the communication pipeline

 - A subscription is a list of data, that can contain the component's public id , private key , and signatures

 - Subscriptions are in the subscription list

 - Once subscribed, component A can send a message to be, using a provided method.

 - To receive messages, a component has to listen to communications sent to it (Either direct messages, or broadcast type communications).

 - To listen, the component must provide its private key


A component that wants to be able to communicate needs to provide some data, to subscribe with the intenral communication pipeline, and to listen to message.

***************
The needed data
***************

A component has a *public id* that other components can use to contact it.
And it has a *private_key* for authentication purposes (For example, a component needs to be authentified in order to listen to the messages it receives).

The authentification helps prevent components from accessing messages that aren't meant for them.

.. code-block:: javascript
	:linenos:

	data(){
            return {
                public_id: `pipeline-${GUID.min_gen()}`, // A string public id
                private_key: GUID.generate() // A string private key
            }
        },

***********
Subscribing
***********

In order to subscribe to the pipeline, a component has to provide a set of data entries,

which are :
 - Its *public_id* and *privat_key*
 - A list of *signatures*

Signatures are another was for components to communicate with each other, indeed while each components should have a unique set of public id / private key, multiple components can share the signatures (think of sigantures as *tags* or HTML *classes*)
This way, components can send messages that are aimed towards a groupd of other components at the same time.

.. code-block:: javascript
	:linenos:
	
	mounted(){
            this.$store.dispatch(
                            'pipeline/subscribe',
                            {
                                public_id: this.public_id,
                                private_key: this.private_key,
                                signatures: ["button"]
                            }
                        )
        },



*********
Listening
*********

And finally, in order to listen to messages, a component need to authentify itself using its *private_key*.

.. code-block:: javascript
	:linenos:

	computed: {

            listener(){
                let ret = this.$store.getters['pipeline/listen'](this.private_key);

                return ret

            }

        }



*****************
Sending a message
*****************

There are several types of messages that can be sent

Types of messages
-----------------

There are several types of messages :

 - Direct messages : Messages that target a specific ID
 - Broadcast messages : Messages that are aimed towards *ALL* the components
 - Signatures messages : Messages that are aimed towards *one or more* signatures

Sending a message
-----------------
*Direct Messages*


.. code-block:: javascript
	:linenos:

	this.$store.dispatch('pipeline/send',{	
					sender_key: this.private_key,
					sender_id:this.public_id,
					request_body: {a:1,b:"2"},
					target_id: "target-id"
					}
				)

*Broadcast Messages*

.. code-block:: javascript
	:linenos:

	this.$store.dispatch('pipeline/send',{	
					sender_key: this.private_key,
					sender_id:this.public_id,
					request_body: {a:1,b:"2"},
					target_id: "#ARP::Broadcast"
					}
				)


*Signatures Messages*


.. code-block:: javascript
	:linenos:

	this.$store.dispatch('pipeline/send',{	
					sender_key: this.private_key,
					sender_id:this.public_id,
					request_body: {a:1,b:"2"},
					target_id: "#SIG-targetSig"
					}
				)

@todo