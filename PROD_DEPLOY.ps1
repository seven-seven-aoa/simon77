using namespace System.IO;
using namespace System.Text;

[bool] $no_confirm = $false;
Clear-Host;
Write-Host "== Production Deployment ==`n" -ForegroundColor Cyan;

function Add-LocalChanges {
    if ($true -eq $(Get-Confirmation)) {
        git add .;
        git commit -m "Existing local changes added by PROD_DEPLOY.ps1";
        return $true;
    }
    return $false;
}

function Get-Confirmation {
    if ($no_confirm) {
        return $true;
    }

    $title = "== Confirm Production Deployment ==";
    $question = "`nExisting local changes will be applied.`nAre you sure you want to continue?`n`n";
    $choices = "&Yes", "&No";
    $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1);

    if ($decision -eq 0) {
        Write-Host "`nProceeding with production deployment..." -ForegroundColor Green;
        return $true;
    }
    Write-Host "`nProduction deployment aborted." -ForegroundColor Yellow;
    return $false;
}

function Write-DeploymentStamp {
    [Regex] $regex = [Regex]::new("^(.*)DEPLOYED ON \[.*\](.*?)$");
    [StringBuilder] $sb = [StringBuilder]::new();
    [string] $app_tsx = $PSScriptRoot + "/src/App.tsx";
    [File]::ReadAllLines($app_tsx) | ForEach-Object {
        if (!($regex.IsMatch($_))) {
            $sb.AppendLine($_) > $null;
            return;
        }
        $sb.AppendLine($regex.Replace($_, "`$1DEPLOYED ON [" + (Get-Date).ToString("yyyy-MM-dd HH:mm:ss") + "]`$2")) > $null;
    };
    [File]::WriteAllText($app_tsx, $sb.ToString());
}

npm run build;
[bool] $build_success = (Test-Path "$PSScriptRoot/build.success");
if (!($build_success)) {
    Write-Host "`nProduction deployment stopped due to build error." -ForegroundColor Red;
    exit;
}

git status;
if ($true -eq $(Add-LocalChanges)) {
    Write-DeploymentStamp;
    git add .;
    git commit -m "Time-stamped by PROD_DEPLOY.ps1";
    git push;
    Write-Host "`nProduction deployment initiated." -ForegroundColor Green;
}