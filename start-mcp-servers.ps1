# Start-MCP-Servers.ps1
# Script to start Cursor MCP servers in the background without stealing window focus

$mcpConfigPath = "$env:USERPROFILE\.cursor\mcp.json"

# Check if config file exists
if (-not (Test-Path $mcpConfigPath)) {
    Write-Host "MCP configuration file not found at: $mcpConfigPath"
    exit 1
}

# Read the MCP configuration
try {
    $mcpConfig = Get-Content -Path $mcpConfigPath -Raw | ConvertFrom-Json
    Write-Host "Found MCP configuration file"
} catch {
    Write-Host "Error reading MCP configuration: $($_.Exception.Message)"
    exit 1
}

# Function to start a process hidden (no window)
function Start-HiddenProcess {
    param(
        [Parameter(Mandatory=$true)]
        [string]$FilePath,

        [Parameter(Mandatory=$false)]
        [string]$Arguments = ""
    )

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $FilePath
    $startInfo.Arguments = $Arguments
    $startInfo.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
    $startInfo.CreateNoWindow = $true
    $startInfo.UseShellExecute = $false

    [System.Diagnostics.Process]::Start($startInfo)
}

# Check if the configuration has a mcpServers property
if ($mcpConfig.PSObject.Properties.Name -contains "mcpServers") {
    $mcpServers = $mcpConfig.mcpServers
    $serverCount = 0

    # Create a list to store server info
    $serversList = @()

    # Process each server in mcpServers
    foreach ($serverName in $mcpServers.PSObject.Properties.Name) {
        $serverConfig = $mcpServers.$serverName

        # Skip empty server configs
        if ($null -eq $serverConfig -or $serverConfig -eq "") {
            continue
        }

        # Get command property
        $command = $null
        if ($serverConfig.PSObject.Properties.Name -contains "command") {
            $command = $serverConfig.command
        }

        # Get args array property
        $args = @()
        if ($serverConfig.PSObject.Properties.Name -contains "args" -and $serverConfig.args -ne $null) {
            $args = $serverConfig.args
        }

        # If we found a command, add to the servers list
        if ($command) {
            $serversList += [PSCustomObject]@{
                Name = $serverName
                Command = $command
                Arguments = $args
            }
            $serverCount++
        }
    }

    Write-Host "Found $serverCount MCP servers to start"

    # Start each server
    foreach ($server in $serversList) {
        $serverName = $server.Name
        $serverCommand = $server.Command
        $serverArgs = $server.Arguments

        Write-Host "Starting MCP server: $serverName"

        # Convert arguments array to string, handling escaping correctly
        $argumentsString = ""
        if ($serverArgs -and $serverArgs.Count -gt 0) {
            $escapedArgs = @()
            foreach ($arg in $serverArgs) {
                # Check if the argument contains spaces or special characters
                if ($arg -match '\s|[&|<>^]' -and -not $arg.StartsWith('"') -and -not $arg.EndsWith('"')) {
                    # Wrap in quotes if it contains spaces or special characters
                    $escapedArgs += "`"$arg`""
                } else {
                    $escapedArgs += $arg
                }
            }
            $argumentsString = $escapedArgs -join " "
        }

        try {
            $process = Start-HiddenProcess -FilePath $serverCommand -Arguments $argumentsString
            Write-Host "Started $serverName in background (PID: $($process.Id))"
        } catch {
            Write-Host "Error starting $serverName`: $($_.Exception.Message)"
        }
    }
} else {
    Write-Host "No mcpServers property found in MCP configuration"
}

Write-Host "MCP server background start script completed"