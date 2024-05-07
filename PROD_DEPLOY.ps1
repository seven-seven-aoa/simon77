using namespace System.IO;
using namespace System.Text;

function Get-Confirmation {
    $title = "== Confirm Production Deployment ==";
    $question = "Are you sure you want to proceed?";
    $choices = "&Yes", "&No";
    
    $decision = $Host.UI.PromptForChoice($title, $question, $choices, 1);
    Write-Host;

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
git status;

if (!(Get-Confirmation)) {
    exit;
}

Write-Host; git add .;
Write-DeploymentStamp;
Write-Host; git add .;
Write-Host; git commit -m "Added by PROD_DEPLOY.ps1";
Write-Host; git push;
Write-Host; Write-Host "Production deployment initiated." -ForegroundColor Green;