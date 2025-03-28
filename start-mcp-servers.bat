@echo off
REM Batch file wrapper to run the PowerShell script without showing the PowerShell window
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0start-mcp-servers.ps1"
echo MCP servers started in background