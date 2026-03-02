@echo off
start chrome http://localhost:5173/
if %ERRORLEVEL% NEQ 0 (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:5173/
)
if %ERRORLEVEL% NEQ 0 (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:5173/
)
