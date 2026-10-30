#!/bin/bash
set -e
export DOTNET_CLI_TELEMETRY_OPTOUT=1
mkdir -p wwwroot
cp index.html wwwroot/index.html
curl -sSL https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 8.0 --install-dir "$HOME/dotnet"
export DOTNET_ROOT="$HOME/dotnet"
export PATH="$HOME/dotnet:$PATH"
dotnet publish MilaPoll.csproj -c Release -o out
