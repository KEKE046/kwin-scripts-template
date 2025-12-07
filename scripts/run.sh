#!/bin/bash

plugin_name=$1
script_name=$(realpath $2)

unload_resp=$(qdbus6 \
    org.kde.KWin /Scripting \
    org.kde.kwin.Scripting.unloadScript \
    "$plugin_name")

echo Plugin name: $plugin_name

if [[ $unload_resp == "false" ]]; then
    echo "No existing script to unload."
else
    echo "Unloaded existing script: $plugin_name"
fi

echo "Loading script: $script_name"
load_resp=$(qdbus6 \
    org.kde.KWin /Scripting \
    org.kde.kwin.Scripting.loadScript \
    "$script_name" \
    "$plugin_name")

if [[ $load_resp == "-1" ]]; then
    echo "Failed to load script: $script_name"
    exit 1
else
    echo "Loaded script with ID: $load_resp"
fi

echo "Restarting KWin Scripting Engine..."
qdbus6 \
    org.kde.KWin /Scripting \
    org.kde.kwin.Scripting.start