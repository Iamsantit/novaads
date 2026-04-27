@echo off
setlocal EnableDelayedExpansion
title NovaAds — Deploy a Vercel
color 0B

echo.
echo ============================================================
echo   NovaAds Deploy
echo   Sube tu proyecto a Vercel + variables de entorno
echo ============================================================
echo.

cd /d "%~dp0frontend"

REM ---- 1. Verificar Node ----
where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js no esta instalado. Instalalo de https://nodejs.org
  pause
  exit /b 1
)

REM ---- 2. Login ----
echo [1/4] Verificando login en Vercel...
call npx --yes vercel@latest whoami >nul 2>&1
if errorlevel 1 (
  echo.
  echo Necesitamos loggearte en Vercel ^(solo una vez^).
  echo Te abrira el navegador. Cierra esta ventana NO, cuando termine vuelves aqui.
  echo.
  call npx --yes vercel@latest login
  if errorlevel 1 (
    echo [ERROR] Login fallo.
    pause
    exit /b 1
  )
)

REM ---- 3. Link del proyecto ----
echo.
echo [2/4] Vinculando proyecto Vercel...
call npx --yes vercel@latest link --yes

REM ---- 4. Subir variables de entorno desde .env.local ----
echo.
echo [3/4] Subiendo variables de entorno desde .env.local...
if not exist ".env.local" (
  echo [WARN] No se encontro .env.local. Saltando este paso.
) else (
  for /f "usebackq tokens=1,* delims==" %%A in (".env.local") do (
    set "KEY=%%A"
    set "VAL=%%B"
    REM Saltar comentarios y lineas vacias
    if not "!KEY!"=="" if not "!KEY:~0,1!"=="#" (
      echo   - !KEY!
      REM Borra version previa silenciosamente
      call npx --yes vercel@latest env rm "!KEY!" production --yes >nul 2>&1
      REM Sube la nueva
      echo !VAL! | call npx --yes vercel@latest env add "!KEY!" production >nul 2>&1
    )
  )
)

REM ---- 5. Deploy ----
echo.
echo [4/4] Desplegando a produccion...
echo.
call npx --yes vercel@latest --prod

echo.
echo ============================================================
echo   LISTO. Tu URL aparece arriba.
echo   Si quieres redeplegar despues de cambios, vuelve a ejecutar
echo   este mismo deploy.bat.
echo ============================================================
echo.
pause
