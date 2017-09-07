#!/bin/bash

trap "echo 'Terminate signal received! Exiting...'; exit 2;" INT TERM

echo "Sleeping..."
sleep 10m
echo "Awaken!"
