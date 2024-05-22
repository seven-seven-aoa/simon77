# using namespace System.IO;
# using namespace System.Text;

# param(
#     [switch] $no_confirm,
#     [switch] $prod_deploy,
#     [switch] $dev_deploy
# )

# Clear-Host;
# Write-Host "== Begin Deployment ==`n" -ForegroundColor Cyan;
# if ($dev_deploy) {
#     Write-Host "- DEV" -ForegroundColor Yellow;
# }
# if ($prod_deploy) {
#     Write-Host "- PROD" -ForegroundColor Yellow;
# }


# function Add-LocalChanges {
#     if ($true -eq $(Get-Confirmation)) {
#         git add .;
#         git commit -m "Existing local changes added by deploy.ps1";
#         return $true;
#     }
#     return $false;
# }

# function Get-Confirmation {
#     if ($no_confirm.IsPresent) {
#         return $true;
#     }

#     $title = "== Confirm Deployment ==";
#     $question = "`nExisting local changes will be applied.`nAre you sure you want to continue?`n`n";
#     $choices = "&Yes", "&No";
#     $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1);

#     if ($decision -eq 0) {
#         Write-Host "`nProceeding with production deployment..." -ForegroundColor Green;
#         return $true;
#     }
#     Write-Host "`nProduction deployment aborted." -ForegroundColor Yellow;
#     return $false;
# }

# function Write-DeploymentStamp {
#     [Regex] $regex = [Regex]::new("^(.*)DEPLOYED ON \[.*\](.*?)$");
#     [StringBuilder] $sb = [StringBuilder]::new();
#     [string] $app_tsx = $PSScriptRoot + "/src/App.tsx";
#     [File]::ReadAllLines($app_tsx) | ForEach-Object {
#         if (!($regex.IsMatch($_))) {
#             $sb.AppendLine($_) > $null;
#             return;
#         }
#         $sb.AppendLine($regex.Replace($_, "`$1DEPLOYED ON [" + (Get-Date).ToString("yyyy-MM-dd HH:mm:ss") + "]`$2")) > $null;
#     };
#     [File]::WriteAllText($app_tsx, $sb.ToString());
# }

# npm run release;
# [bool] $build_success = (Test-Path "$PSScriptRoot/build.success");
# if (!($build_success)) {
#     Write-Host "`nDeployment stopped due to build error." -ForegroundColor Red;
#     exit;
# }

# git status;
# if ($true -eq $(Add-LocalChanges)) {
#     Write-DeploymentStamp;
#     git add .;
#     git commit -m "Time-stamped by deploy.ps1";
    
#     if ($prod_deploy.IsPresent) {
#         git push;
#     }
#     if ($dev_deploy.IsPresent) {
#         Remove-Item .\simon77.maui\wwwroot -Recurse -Force;
#         Copy-Item .\dist .\simon77.maui\wwwroot -Recurse -Force;
#     }

#     git log -2;
#     git status;
#     Write-Host "`nDeployment initiated." -ForegroundColor Green;
# }