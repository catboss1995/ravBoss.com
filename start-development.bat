@echo off
title RavBoss.com Development Environment
color 0A

echo ========================================
echo    RavBoss.com Development Environment
echo ========================================
echo.

echo Checking for existing processes...
taskkill /f /im node.exe 2>nul
echo Cleaned up existing Node.js processes.
echo.

echo Starting Backend Server (Port 3000)...
cd /d "%~dp0backend"
start "RavBoss Backend" cmd /c "title RavBoss Backend Server && npm start"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server (Port 5173)...
cd /d "%~dp0frontend"
start "RavBoss Frontend" cmd /c "title RavBoss Frontend Server && npm run dev"

echo.
echo ========================================
echo   Development Servers Started!
echo ========================================
echo.
echo 🚀 Backend API:  http://localhost:3000/
echo 🌐 Frontend:     http://localhost:5173/
echo 🔑 Admin Login:  admin / admin123
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
echo Press any key to open the website...
pause > nul

start http://localhost:5173/