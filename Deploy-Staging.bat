@echo off
title OmniGaze - Deploy to Staging
cd /d "F:\RootContext\OmniGazeWebsite"
echo.
echo ========================================
echo   OmniGaze Website - Staging Deploy
echo ========================================
echo.
call npm run deploy:staging
echo.
echo Press any key to close...
pause >nul
