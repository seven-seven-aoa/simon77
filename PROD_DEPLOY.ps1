using namespace System.IO;
using namespace System.Text;

function Add-LocalChanges {
    git status;
    if ($true -eq (Get-Confirmation)) {
        git add .;
        git commit -m "Existing local changes added by PROD_DEPLOY.ps1";
        return $true;
    }
    return $false;
}

function Get-Confirmation {
    $title = "== Confirm Production Deployment ==";
    $question = "`nExisting local changes will be applied.`nAre you sure you want to continue?`n`n";
    $choices = "&Yes", "&No";
    
    $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1);
    Write-Host  "DDDD"  + $decision;

    if ($decision -eq 0) {
        Write-Host "Proceeding with production deployment..." -ForegroundColor Green;
        return $true;
    }
    Write-Host "Production deployment aborted." -ForegroundColor Yellow;
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

Clear-Host;
if ($true -eq (Add-LocalChanges)) {
    Write-DeploymentStamp;
    git add .;
    git commit -m "Time-stamped by PROD_DEPLOY.ps1";
    git push;
    Write-Host "Production deployment initiated." -ForegroundColor Green;
}