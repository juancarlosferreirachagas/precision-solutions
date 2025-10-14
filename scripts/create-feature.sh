#!/bin/bash

# Script para criar nova feature branch
# Uso: ./scripts/create-feature.sh nome-da-feature

if [ -z "$1" ]; then
    echo "❌ Erro: Forneça o nome da feature"
    echo "Uso: ./scripts/create-feature.sh nome-da-feature"
    exit 1
fi

FEATURE_NAME=$1
BRANCH_NAME="feature/$FEATURE_NAME"

echo "🚀 Criando nova feature branch: $BRANCH_NAME"

# Verificar se estamos na main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Aviso: Você não está na branch main. Mudando para main..."
    git checkout main
fi

# Atualizar main
echo "📥 Atualizando branch main..."
git pull origin main

# Criar nova branch
echo "🌿 Criando branch: $BRANCH_NAME"
git checkout -b $BRANCH_NAME

echo "✅ Feature branch criada com sucesso!"
echo "📝 Próximos passos:"
echo "   1. Desenvolver a feature"
echo "   2. git add ."
echo "   3. git commit -m 'feat: Descrição da feature'"
echo "   4. git push origin $BRANCH_NAME"
echo "   5. Fazer merge para main após revisão"
