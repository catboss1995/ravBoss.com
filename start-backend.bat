@echo off
title RavBoss Backend Server
color 0C
cd /d "%~dp0backend"

echo ========================================
echo       RavBoss Backend API Server
echo ========================================
echo.
echo Starting Express server with MongoDB...
echo Backend API will be available at: http://localhost:3000/
echo.

npm start

pause