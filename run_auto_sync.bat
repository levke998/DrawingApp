@echo off
title Auto-Sync to GitHub (Keep working, I'm watching!)

echo ========================================================
echo   Auto-Sync Active
echo   I will check for changes every 10 seconds and upload.
echo ========================================================
echo.
echo [Info] You can minimize this window and keep working.
echo [Info] Close this window to stop auto-sync.
echo.

:loop
:: Wait 10 seconds
timeout /t 10 /nobreak >nul

:: Try to commit any new changes
git add .
git commit -m "Auto-save: %date% %time%" >nul 2>&1

:: If proper commit happened (errorlevel 0), push it
if %errorlevel% equ 0 (
    echo.
    echo [Sync] Detected changes. Uploading to GitHub...
    git push origin main
    
    if %errorlevel% equ 0 (
        echo [Success] Uploaded at %time%
    ) else (
        echo [Error] Push failed. Will retry next cycle.
    )
)

goto loop
