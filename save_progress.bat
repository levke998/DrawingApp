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

:: If commit failed, it's likely the identity error. Fix it and retry.
if %errorlevel% neq 0 (
    echo.
    echo ===================================================
    echo  Git Identity Missing or Invalid
    echo ===================================================
    echo.
    echo Please enter your details to configure Git for this project.
    echo.
    
    set /p u_name="Enter your Name: "
    set /p u_email="Enter your Email: "
    
    :: Use call to ensure variables are used immediately
    call git config user.name "%%u_name%%"
    call git config user.email "%%u_email%%"
    
    echo.
    echo Identity updated! Retrying save...
    echo.
    
    call git commit -m "%commit_msg%"
)

echo.
if %errorlevel% equ 0 (
    echo Changes saved successfully!
) else (
    echo Still could not save. Please check the error messages above.
)
pause
