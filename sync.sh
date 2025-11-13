#!/usr/bin/env bash

ng build -c production && rsync -av --no-perms --no-owner --no-group --no-times \
    dist/cloud-castle-frontend/browser/ debian@194.182.190.147:/home/cloud_castle/frontend/
