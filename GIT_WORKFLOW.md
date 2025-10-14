# 🚀 Workflow Git - Precision Solutions

## 📋 **Estrutura de Branches**

### **Branches Principais:**
- `main` - Branch principal (produção)
- `develop` - Branch de desenvolvimento

### **Branches de Feature:**
- `feature/nome-da-feature` - Para novas funcionalidades
- `feature/menu-mobile` - Menu hambúrguer mobile
- `feature/internacionalizacao` - Sistema de idiomas
- `feature/otimizacoes` - Melhorias de performance

### **Branches de Correção:**
- `hotfix/correcao-urgente` - Correções críticas
- `bugfix/nome-do-bug` - Correções de bugs

## 🔄 **Comandos Git Essenciais**

### **Criar e Trocar de Branch:**
```bash
# Criar nova branch
git checkout -b feature/nome-da-feature

# Trocar para branch existente
git checkout main
git checkout feature/nome-da-feature

# Listar todas as branches
git branch -a
```

### **Trabalhar com Features:**
```bash
# 1. Criar branch da feature
git checkout -b feature/nova-funcionalidade

# 2. Fazer commits
git add .
git commit -m "feat: Adicionar nova funcionalidade"

# 3. Push da branch
git push origin feature/nova-funcionalidade

# 4. Merge para main (após revisão)
git checkout main
git merge feature/nova-funcionalidade
git push origin main

# 5. Deletar branch local
git branch -d feature/nova-funcionalidade
```

## 📝 **Convenção de Commits**

### **Tipos de Commit:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, espaços, etc.
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Tarefas de manutenção

### **Exemplos:**
```bash
git commit -m "feat: Adicionar seletor de idiomas"
git commit -m "fix: Corrigir menu hambúrguer no mobile"
git commit -m "docs: Atualizar README com instruções"
git commit -m "style: Ajustar espaçamentos do CSS"
```

## 🌟 **Workflow Recomendado**

### **Para Novas Features:**
1. **Criar branch:** `git checkout -b feature/nome-da-feature`
2. **Desenvolver:** Fazer commits pequenos e frequentes
3. **Testar:** Verificar funcionamento
4. **Push:** `git push origin feature/nome-da-feature`
5. **Merge:** Fazer merge para main após revisão
6. **Limpeza:** Deletar branch da feature

### **Para Correções:**
1. **Criar branch:** `git checkout -b hotfix/correcao-urgente`
2. **Corrigir:** Implementar correção
3. **Testar:** Verificar se corrigiu
4. **Push:** `git push origin hotfix/correcao-urgente`
5. **Merge:** Merge imediato para main

## 🏷️ **Versionamento**

### **Tags de Versão:**
```bash
# Criar tag de versão
git tag -a v1.0.0 -m "Versão 1.0.0 - Lançamento inicial"
git push origin v1.0.0

# Listar tags
git tag -l
```

### **Estrutura de Versão:**
- `v1.0.0` - Versão principal (Major)
- `v1.1.0` - Nova feature (Minor)
- `v1.1.1` - Correção (Patch)

## 🔧 **Comandos Úteis**

### **Status e Logs:**
```bash
# Ver status atual
git status

# Ver histórico de commits
git log --oneline

# Ver diferenças
git diff

# Ver arquivos modificados
git diff --name-only
```

### **Desfazer Mudanças:**
```bash
# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer mudanças não commitadas
git checkout -- arquivo.txt

# Desfazer todas as mudanças
git reset --hard HEAD
```

## 📚 **Boas Práticas**

1. **Commits Pequenos:** Faça commits frequentes e pequenos
2. **Mensagens Claras:** Use mensagens descritivas em português
3. **Branches Descritivas:** Nomes claros para as branches
4. **Teste Antes:** Sempre teste antes de fazer merge
5. **Documentação:** Mantenha documentação atualizada
6. **Backup:** Sempre faça push das branches importantes

## 🚨 **Situações de Emergência**

### **Conflitos de Merge:**
```bash
# Resolver conflitos
git status
# Editar arquivos com conflitos
git add arquivo-resolvido.txt
git commit -m "fix: Resolver conflitos de merge"
```

### **Reverter Commit:**
```bash
# Reverter último commit
git revert HEAD

# Reverter commit específico
git revert <hash-do-commit>
```

---

**💡 Dica:** Sempre trabalhe em branches separadas para features e nunca commite diretamente na main!
