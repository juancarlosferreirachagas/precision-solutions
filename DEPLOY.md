# 🚀 Deploy no Vercel - Precision Solutions

## 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Git**: Instalado no computador
3. **Repositório**: Projeto no GitHub/GitLab/Bitbucket

## 🔧 Passos para Deploy

### 1. 📁 Preparar o Repositório

```bash
# Inicializar Git (se não existir)
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit - Precision Solutions website"

# Conectar ao repositório remoto
git remote add origin https://github.com/SEU_USUARIO/precision-solutions.git

# Push para o repositório
git push -u origin main
```

### 2. 🌐 Deploy no Vercel

#### **Opção A: Via Dashboard**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Selecione o projeto "precision-solutions"
5. Clique em "Deploy"

#### **Opção B: Via CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### 3. ⚙️ Configurações Automáticas

O projeto já está configurado com:
- ✅ `vercel.json` - Configurações do Vercel
- ✅ `package.json` - Metadados do projeto
- ✅ `.gitignore` - Arquivos ignorados
- ✅ `.vercelignore` - Arquivos ignorados no deploy

### 4. 🔄 Deploy Automático

Após o primeiro deploy:
- **Push automático**: Qualquer push no repositório gera novo deploy
- **Preview**: Pull requests geram previews automáticos
- **Domínio**: Site fica disponível em `https://precision-solutions.vercel.app`

## 📱 Teste Mobile

Após o deploy, teste no celular:
1. **URL**: `https://SEU_DOMINIO.vercel.app`
2. **Responsivo**: Layout otimizado para mobile
3. **Performance**: Carregamento rápido
4. **HTTPS**: Certificado SSL automático

## 🎯 Estrutura do Projeto

```
precision-solutions/
├── index.html              # Página principal
├── pages/                  # Páginas de serviços
├── assets/                 # Recursos estáticos
│   ├── css/               # Estilos
│   ├── js/                # Scripts
│   ├── images/            # Imagens
│   └── documents/         # Documentos (PDF ANATEL)
├── vercel.json            # Configurações Vercel
├── package.json           # Metadados
├── .gitignore            # Git ignore
└── .vercelignore         # Vercel ignore
```

## 🚀 Comandos Úteis

```bash
# Deploy local para teste
vercel dev

# Deploy para produção
vercel --prod

# Ver logs
vercel logs

# Ver domínios
vercel domains
```

## 📞 Suporte

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Status**: [vercel-status.com](https://vercel-status.com)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
