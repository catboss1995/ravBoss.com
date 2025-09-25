@echo off
echo Testing RavBoss servers...
echo.

echo Testing Backend (http://localhost:3000/)...
curl -s http://localhost:3000/ || echo Backend is not responding

echo.
echo Testing Frontend (http://localhost:5173/)...
curl -s -I http://localhost:5173/ | find "200 OK" && echo Frontend is OK || echo Frontend is not responding

echo.
pause