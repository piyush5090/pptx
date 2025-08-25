@echo off
echo ------------------------------------
echo Starting Downloading
echo ------------------------------------

:: Go to the folder where this .bat is located
cd /d %~dp0

:: Step 1 - Install dependencies if not present
if not exist node_modules (
    echo node_modules folder not found. Installing dependencies...
    npm install
) else (
    echo Dependencies already installed.
)

:: Step 2 - Run the project
echo Running index.js...
node index.js

pause
