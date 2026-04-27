$Host.UI.RawUI.WindowTitle = "NovaAds Dev Server (auto-restart)"
Set-Location "$PSScriptRoot\frontend"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  NovaAds dev server - http://localhost:4321" -ForegroundColor Cyan
Write-Host "  Auto-restart si se cae." -ForegroundColor Cyan
Write-Host "  Ctrl+C dos veces para salir." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

while ($true) {
  npm run dev
  Write-Host ""
  Write-Host "[auto-restart] Server salio. Reiniciando en 3s..." -ForegroundColor Yellow
  Start-Sleep -Seconds 3
}
