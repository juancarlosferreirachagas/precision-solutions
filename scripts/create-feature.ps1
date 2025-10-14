# Script PowerShell para criar nova feature branch
# Uso: .\scripts\create-feature.ps1 nome-da-feature

param(
    [Parameter(Mandatory=$true)]
    [string]$FeatureName
)

$BranchName = "feature/$FeatureName"

Write-Host "🚀 Criando nova feature branch: $BranchName" -ForegroundColor Green

# Verificar se estamos na main
$CurrentBranch = git branch --show-current
if ($CurrentBranch -ne "main") {
    Write-Host "⚠️  Aviso: Você não está na branch main. Mudando para main..." -ForegroundColor Yellow
    git checkout main
}

# Atualizar main
Write-Host "📥 Atualizando branch main..." -ForegroundColor Blue
git pull origin main

# Criar nova branch
Write-Host "🌿 Criando branch: $BranchName" -ForegroundColor Blue
git checkout -b $BranchName

Write-Host "✅ Feature branch criada com sucesso!" -ForegroundColor Green
Write-Host "📝 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Desenvolver a feature" -ForegroundColor White
Write-Host "   2. git add ." -ForegroundColor White
Write-Host "   3. git commit -m 'feat: Descrição da feature'" -ForegroundColor White
Write-Host "   4. git push origin $BranchName" -ForegroundColor White
Write-Host "   5. Fazer merge para main após revisão" -ForegroundColor White
