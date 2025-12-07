#!/bin/bash

plugin_name=$1

unload_resp=$(qdbus6 \
    org.kde.KWin /Scripting \
    org.kde.kwin.Scripting.unloadScript \
    "$plugin_name")

if [[ $unload_resp == "false" ]]; then
    echo "No existing script to unload."
else
    echo "Unloaded existing script: $plugin_name"
fi
