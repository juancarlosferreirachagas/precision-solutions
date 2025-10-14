# 🌍 Sistema de Tradução - Precision Solutions

## 📋 **Visão Geral**

O sistema de tradução implementado permite que o site seja exibido em **3 idiomas**:
- 🇧🇷 **Português** (padrão)
- 🇺🇸 **English** 
- 🇪🇸 **Español**

## 🔧 **Estrutura do Sistema**

### **Arquivos de Tradução:**
```
locales/
├── pt/translations.json    # Português (revisado)
├── en/translations.json    # Inglês
└── es/translations.json    # Espanhol
```

### **Sistema JavaScript:**
- `assets/js/i18n.js` - Classe principal de internacionalização
- Integração com `assets/js/script.js` - Seletor de idiomas

## 🎯 **Funcionalidades Implementadas**

### ✅ **1. Carregamento Automático:**
- Detecta idioma salvo no localStorage
- Carrega traduções automaticamente
- Fallback para português em caso de erro

### ✅ **2. Troca Dinâmica:**
- Seletor de idiomas no menu
- Troca instantânea sem recarregar página
- Persistência da escolha do usuário

### ✅ **3. Tradução Completa:**
- **Navegação**: Menu principal e dropdowns
- **Hero Section**: Títulos e subtítulos do carrossel
- **Diferenciais**: Títulos e descrições
- **Meta Tags**: Title, description, keywords

### ✅ **4. Data Attributes:**
- `data-i18n` - Para texto simples
- `data-i18n-html` - Para HTML complexo
- `data-i18n-attr` - Para atributos (placeholder, title, etc.)

## 📝 **Como Usar**

### **1. Adicionar Nova Tradução:**

#### **No HTML:**
```html
<h1 data-i18n="hero.title">Título em Português</h1>
<p data-i18n="hero.subtitle">Subtítulo em Português</p>
```

#### **No JSON de Tradução:**
```json
{
  "hero": {
    "title": "Título em Português",
    "subtitle": "Subtítulo em Português"
  }
}
```

### **2. Traduzir para Outros Idiomas:**

#### **Inglês (en/translations.json):**
```json
{
  "hero": {
    "title": "Title in English",
    "subtitle": "Subtitle in English"
  }
}
```

#### **Espanhol (es/translations.json):**
```json
{
  "hero": {
    "title": "Título en Español",
    "subtitle": "Subtítulo en Español"
  }
}
```

## 🔄 **API do Sistema**

### **Métodos Principais:**

```javascript
// Obter instância global
const i18n = window.i18n;

// Trocar idioma
i18n.changeLanguage('en');

// Obter tradução específica
const translation = i18n.getTranslation('hero.title');

// Obter idioma atual
const currentLang = i18n.getCurrentLanguage();

// Listar idiomas disponíveis
const languages = i18n.getAvailableLanguages();
```

### **Eventos:**
```javascript
// Escutar mudança de idioma
document.addEventListener('languageChanged', function(event) {
    console.log('Idioma alterado para:', event.detail.language);
});
```

## 📚 **Estrutura das Traduções**

### **Seções Organizadas:**
- `meta` - Meta tags (title, description, keywords)
- `navigation` - Menu e navegação
- `hero` - Seção principal com carrossel
- `differentials` - Diferenciais da empresa
- `about` - Quem somos
- `services` - Serviços oferecidos
- `solutions` - Soluções
- `contact` - Formulário de contato
- `footer` - Rodapé
- `buttons` - Botões e CTAs
- `common` - Textos comuns

### **Exemplo de Estrutura:**
```json
{
  "navigation": {
    "home": "HOME",
    "about": "QUEM SOMOS",
    "services": "SERVIÇOS"
  },
  "hero": {
    "title1": "Excelência em Soluções Tecnológicas",
    "subtitle1": "Nosso objetivo é proporcionar excelência..."
  }
}
```

## 🎨 **Integração com HTML**

### **Tipos de Data Attributes:**

#### **1. Texto Simples:**
```html
<h1 data-i18n="hero.title">Título Padrão</h1>
```

#### **2. HTML Complexo:**
```html
<div data-i18n-html="about.description">
    <p>Descrição padrão com <strong>HTML</strong></p>
</div>
```

#### **3. Atributos:**
```html
<input data-i18n-attr="placeholder:contact.form.name" type="text">
```

## 🔧 **Configuração**

### **1. Inicialização:**
O sistema é inicializado automaticamente quando a página carrega:
```javascript
// Em i18n.js
const i18n = new I18n();
window.i18n = i18n;
```

### **2. Persistência:**
O idioma escolhido é salvo no localStorage:
```javascript
localStorage.setItem('precision-language', 'en');
```

### **3. Fallback:**
Se houver erro ao carregar traduções, volta para português:
```javascript
if (this.currentLanguage !== 'pt') {
    this.currentLanguage = 'pt';
    this.loadTranslations();
}
```

## 🚀 **Próximos Passos**

### **Para Completar a Tradução:**

1. **Atualizar HTML restante** com data attributes
2. **Traduzir seções** que ainda não foram traduzidas
3. **Testar** todas as traduções
4. **Revisar** ortografia e gramática
5. **Fazer merge** para branch main

### **Seções Pendentes:**
- [ ] Seção "Quem Somos" completa
- [ ] Seção "Serviços" completa  
- [ ] Seção "Soluções" completa
- [ ] Formulário de contato
- [ ] Rodapé
- [ ] Páginas individuais de serviços

## 📋 **Checklist de Qualidade**

### **Revisão de Português:**
- ✅ Ortografia corrigida
- ✅ Gramática revisada
- ✅ Terminologia técnica adequada
- ✅ Tom profissional mantido

### **Traduções:**
- ✅ Inglês: Tradução profissional
- ✅ Espanhol: Tradução profissional
- ✅ Consistência terminológica
- ✅ Contexto cultural adequado

### **Funcionalidade:**
- ✅ Troca de idiomas funcional
- ✅ Persistência no localStorage
- ✅ Fallback para português
- ✅ Performance otimizada

---

**💡 Dica:** Sempre teste as traduções em diferentes navegadores e dispositivos para garantir compatibilidade!
