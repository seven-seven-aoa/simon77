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

Set-PSDebug -Off;
Write-Host;
Set-PSDebug -Trace 1;
git commit -m "Added by PROD_DEPLOY.ps1";

Set-PSDebug -Off;
Write-Host;
Set-PSDebug -Trace 1;
git push;


