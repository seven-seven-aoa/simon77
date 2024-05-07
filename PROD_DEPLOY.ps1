using namespace System.IO;
using namespace System.Text;
Set-PSDebug -Trace 1;
Clear-Host;
git status;

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

Set-PSDebug -Off;
if (!(Get-Confirmation)) {
    exit;
}


Write-Host;
Set-PSDebug -Off;
Write-Host;
Set-PSDebug -Trace 1;
git add .;


[Regex] $regex = [Regex]::new("^(.*)DEPLOYED ON \[.*\](.*?)$");
[StringBuilder] $sb = [StringBuilder]::new();
[string] $app_tsx = $PSScriptRoot + "/src/App.tsx";
[File]::ReadAllLines($app_tsx) | ForEach-Object {
    if ($regex.IsMatch($_)) {
        $sb.AppendLine($regex.Replace($_, "`$1DEPLOYED ON [`$2" + (Get-Date).ToString("yyyy-MM-dd HH:mm:ss") + "]`$3"));
    } else {
        $sb.AppendLine($_);
    }
};
[File]::WriteAllText($app_tsx, $sb.ToString());


Set-PSDebug -Off;
Write-Host;
Set-PSDebug -Trace 1;
git add .;


Set-PSDebug -Off;
Write-Host;
Set-PSDebug -Trace 1;
git commit -m "Added by PROD_DEPLOY.ps1";


Set-PSDebug -Off;
Write-Host;
Set-PSDebug -Trace 1;
git push;


Set-PSDebug -Off;
Write-Host;
Write-Host "Production deployment initiated." -ForegroundColor Green;
        
