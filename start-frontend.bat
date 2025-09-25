@echo off
title RavBoss Frontend Server
color 0B
cd /d "%~dp0frontend"

echo ========================================
echo      RavBoss Frontend Development
echo ========================================
echo.
echo Starting Vite development server...
echo Frontend will be available at: http://localhost:5173/
echo.

npm run dev

pause