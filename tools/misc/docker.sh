#!/bin/bash

# Build and run
docker build -t cleed/b2b-v2-meta .
docker run -it -p 8080:8080 --rm --name container-box-cleed cleed/b2b-v2-meta