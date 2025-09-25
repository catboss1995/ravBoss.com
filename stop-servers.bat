@echo off
title Stop RavBoss Servers
color 0E

echo ========================================
echo     Stopping RavBoss Development Servers
echo ========================================
echo.

echo Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul

echo Cleaning up any remaining processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000"') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do taskkill /f /pid %%a 2>nul

echo.
echo ✅ All development servers have been stopped.
echo.

pause