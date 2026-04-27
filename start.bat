@echo off
setlocal
title NovaAds Dev Server (auto-restart)
color 0B

cd /d "%~dp0frontend"

echo.
echo ============================================
echo  NovaAds dev server — http://localhost:4321
echo  Si se cae, vuelve a arrancar solo.
echo  Pulsa Ctrl+C dos veces para salir de verdad.
echo ============================================
echo.

:loop
call npm run dev
echo.
echo [auto-restart] El server salio. Reiniciando en 3s...
echo [auto-restart] Pulsa Ctrl+C ahora para cancelar.
timeout /t 3 /nobreak >nul
goto loop
