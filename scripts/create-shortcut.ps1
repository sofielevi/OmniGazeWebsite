$ProjectRoot = (Resolve-Path "$PSScriptRoot\..").Path
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$ProjectRoot\Deploy Staging.lnk")
$Shortcut.TargetPath = "C:\Windows\System32\cmd.exe"
$Shortcut.Arguments = "/c `"$ProjectRoot\Deploy-Staging.bat`""
$Shortcut.WorkingDirectory = $ProjectRoot
$Shortcut.IconLocation = "C:\Windows\System32\imageres.dll,63"
$Shortcut.Description = "Deploy OmniGaze Website to Staging"
$Shortcut.Save()
Write-Host "Shortcut created: Deploy Staging.lnk" -ForegroundColor Green
Write-Host "You can now pin this to your taskbar!" -ForegroundColor Cyan
