@echo off
title Install script
set server_dir=server
set client_dir=client

:install_server
echo Installing server requirements
cd %server_dir%
pipenv install
if %ERRORLEVEL% NEQ 0 goto error
echo.
cd ..

:install_client
echo Installing client requirements
cd %client_dir%
call npm install
if %ERRORLEVEL% NEQ 0 goto error
echo.
cd ..

:execute
cls
start "Server" cmd.exe /c "cd %server_dir% & pipenv run flask run & cd .."
start "Client" cmd.exe /c "cd %client_dir% & npm start & cd .."
exit

:error
echo.
echo Something went wrong with the install
pause