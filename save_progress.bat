@echo off
title Save Progress
echo Saving your work...

:: Fix lock file if it exists
if exist .git\index.lock del .git\index.lock

:: Stop tracking node_modules
git rm -r --cached node_modules >nul 2>&1
git rm -r --cached .next >nul 2>&1

:: Add files
git add .

set /p commit_msg="Enter a description of your changes (default: 'Update'): "
if "%commit_msg%"=="" set commit_msg="Update"

:: Try to commit
git commit -m "%commit_msg%"

:: If commit failed (likely identity), retry once with input
if %errorlevel% neq 0 (
    echo.
    echo Git Identity Missing. Please configure:
    set /p u_name="Enter your Name: "
    set /p u_email="Enter your Email: "
    call git config user.name "%%u_name%%"
    call git config user.email "%%u_email%%"
    call git commit -m "%commit_msg%"
)

echo.
echo ===================================================
echo  Syncing with GitHub...
echo ===================================================
echo.

:: Ensure branch is main
git branch -M main

:: Add remote if it doesn't exist
git remote add origin https://github.com/levke998/DrawingApp.git >nul 2>&1

:: Push to GitHub
echo Pushing changes to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Push failed. 
    echo If the remote repo has files (like a README), we might need to sync first.
    echo.
    choice /M "Do you want to force upload (WARNING: Overwrites remote files)?"
    if errorlevel 1 (
        git push -u origin main --force
        echo.
        echo Force push completed.
    )
)

echo.
echo Done!
pause
