function c { Clear-Host }
function gc { git clean -fdxn }
function gcx { git clean -fdx }
function gf { git fetch }
function gp { git pull }
function gpx { git push }
function gq { git add .; git commit -m 'quick commit' }
function gqx { gq; git push }
function gs { git status }
function gsa { git stash apply }
function gsx { git stash -u }
function nb { npm run build }
function nbx { nb; gqx }
function nd { npm run dev }

