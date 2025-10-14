// Sistema de Internacionalização - Precision Solutions
class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'pt';
        this.translations = {};
        this.init();
    }

    init() {
        this.loadTranslations();
        this.applyTranslations();
    }

    // Obter idioma armazenado no localStorage
    getStoredLanguage() {
        return localStorage.getItem('precision-language') || 'pt';
    }

    // Armazenar idioma no localStorage
    setStoredLanguage(lang) {
        localStorage.setItem('precision-language', lang);
    }

    // Carregar traduções
    loadTranslations() {
        // Traduções embutidas para evitar problemas de fetch
        const translations = {
            pt: {
                "meta": {
                    "title": "Precision Solutions - Excelência em Soluções Tecnológicas",
                    "description": "Proporcionamos excelência na gestão da sua rede e aplicações através de produtos e serviços de alta qualidade.",
                    "keywords": "telecomunicações, tecnologia, redes, consultoria, certificação ANATEL"
                },
                "navigation": {
                    "home": "HOME",
                    "about": "QUEM SOMOS",
                    "services": "SERVIÇOS",
                    "solutions": "SOLUÇÕES",
                    "events": "EVENTOS",
                    "contact": "CONTATO",
                    "consulting": "Consultoria",
                    "integration": "Integração",
                    "operation": "Operação",
                    "certification": "Certificação",
                    "training": "Treinamento"
                },
                "hero": {
                    "title1": "Excelência em Soluções Tecnológicas",
                    "subtitle1": "Nosso objetivo é proporcionar excelência na gestão da sua rede e aplicações através de produtos e serviços de alta qualidade.",
                    "title2": "Consultoria Especializada",
                    "subtitle2": "Soluções personalizadas para suas necessidades de rede e telecomunicações",
                    "title3": "Certificação ANATEL",
                    "subtitle3": "Laboratório acreditado pela CGCRE conforme ISO 17025 para ensaios de equipamentos",
                    "title4": "Integração de Redes",
                    "subtitle4": "Implantação e validação de redes multisserviços com tecnologia de ponta",
                    "cta": "Entre em Contato"
                },
                "differentials": {
                    "title": "Diferenciais Precision Solutions",
                    "professional": {
                        "title": "Profissionais Altamente Qualificados",
                        "description": "Time especializado com décadas de experiência em telecomunicações e tecnologia da informação."
                    },
                    "technology": {
                        "title": "Tecnologia de Ponta",
                        "description": "Utilizamos as mais modernas ferramentas e equipamentos para garantir a excelência em nossos serviços."
                    },
                    "support": {
                        "title": "Suporte 24/7",
                        "description": "Nossa equipe está sempre disponível para atender suas necessidades e garantir a continuidade dos seus serviços."
                    },
                    "certification": {
                        "title": "Certificação ANATEL",
                        "description": "Laboratório acreditado pela CGCRE conforme ISO 17025, garantindo qualidade e confiabilidade em nossos ensaios."
                    }
                },
                "about": {
                    "title": "SOBRE A PRECISION SOLUTIONS",
                    "description": "A Precision Solutions é uma empresa especializada em prover soluções tecnológicas que permitem visibilidade, teste, monitoração e otimização de redes no segmento de telecomunicações, eletrônica, energia e tecnologia da informação. Com base em décadas de experiência, nosso time de profissionais está sempre disponível para entender a necessidade de nossos clientes e de forma consultiva definir a melhor estratégia para atender as demandas de teste & medição, implantação de redes multisserviços e certificação de equipamentos.",
                    "mission": {
                        "title": "NOSSA MISSÃO",
                        "description": "Prover serviços e produtos no setor de tecnologia da informação e telecomunicações para suportar nossos clientes em seus desafios e objetivos"
                    },
                    "vision": {
                        "title": "NOSSA VISÃO",
                        "description": "Ser líder e referência no setor telecomunicações para implantação, monitoração e certificação de redes através da busca incansável de conhecimento pioneiro e qualidade sem limite."
                    },
                    "values": {
                        "title": "NOSSOS VALORES",
                        "items": [
                            "Compromisso e satisfação total dos nossos clientes",
                            "Confiabilidade visando ausência de falhas",
                            "Valorização e respeito às pessoas",
                            "Ética, honestidade e seriedade",
                            "Responsabilidade social"
                        ]
                    }
                },
                "services": {
                    "title": "SERVIÇOS OFERECIDOS",
                    "consulting": {
                        "title": "Consultoria em Redes",
                        "description": "Possuímos um portfólio extenso de serviços de consultoria para atender a necessidade de nossos clientes. Entre os serviços realizamos:",
                        "items": [
                            "Desenho de redes backbone e FTTX",
                            "Testes de desempenho em redes de transporte e L2/L3 até 400Gbps",
                            "Monitoração de redes até camada 7 e operação"
                        ]
                    },
                    "integration": {
                        "title": "Integração de Redes",
                        "description": "Os serviços de Integração de Redes Multiserviços da Precision Solutions permitem que sua empresa tenha um planejamento, implantação, certificação e validação da rede de forma organizada e seguindo o estado da arte em cada tecnologia envolvida. Nossos profissionais possuem experiência em projetos de alta complexidade e de missão crítica. Podemos auxiliar cada cliente em diversas fases do projeto desde a engenharia até a validação da rede."
                    },
                    "operation": {
                        "title": "Operação e Manutenção de Redes",
                        "description": "Junte-se ao conjunto de empresas que confiam em nossos serviços de Operação e Manutenção de Redes. Através de um time extremamente capacitado provemos diagnósticos rápidos e principalmente assertivos o que permite a realização de um troubleshooting eficiente e eficaz. Seja através de nosso NOC que prove suporte Nível 3 ou de nosso time de Field Services trabalhamos 24x7 todos os dias para que sua empresa e seus clientes tenham o menor impacto possível."
                    },
                    "certification": {
                        "title": "Certificação ANATEL",
                        "description": "A Precision Solutions possui Laboratório de Ensaios para certificação ANATEL. Somos acreditados pela CGCRE conforme ISO 17025. Nosso escopo de ensaios é bastante completo e pode ser conferido no link abaixo. Como diferencial provemos serviço de qualidade unido a flexibilidade e agilidade nos ensaios.",
                        "scope": "Clique aqui para visualizar nosso Escopo Acreditado"
                    },
                    "training": {
                        "title": "Treinamento em Tecnologia",
                        "description": "Através de nossos treinamentos compartilhamos as melhores práticas e conceitos absorvidos em anos de experiência no segmento de telecomunicações e tecnologia da informação. Além da base teórica enriquecemos os treinamentos com a aplicação prática do conceito lecionado permitindo assim uma visão muito mais completa do assunto."
                    }
                },
                "solutions": {
                    "title": "NOSSAS SOLUÇÕES TECNOLÓGICAS",
                    "testing": {
                        "title": "Teste e Medição",
                        "description": "Soluções completas para teste e medição de redes de fibra óptica, incluindo OTDR, OLTS e equipamentos de certificação."
                    },
                    "monitoring": {
                        "title": "Monitoramento de Redes",
                        "description": "Sistemas avançados de monitoramento 24/7 para garantir máxima disponibilidade e performance das redes."
                    },
                    "certification": {
                        "title": "Certificação ANATEL",
                        "description": "Laboratório acreditado para certificação de equipamentos conforme padrões ANATEL e ISO 17025."
                    },
                    "consulting": {
                        "title": "Consultoria Especializada",
                        "description": "Consultoria técnica especializada em telecomunicações, redes e infraestrutura de alta performance."
                    }
                },
                "contact": {
                    "title": "CONTATO",
                    "subtitle": "ENTRE EM CONTATO AGORA MESMO E ENCONTRAREMOS A MELHOR SOLUÇÃO PARA A SUA EMPRESA.",
                    "form": {
                        "title": "Envie sua mensagem e retornaremos o quanto antes.",
                        "name": "Nome",
                        "email": "Email",
                        "phone": "Telefone",
                        "company": "Empresa",
                        "message": "Mensagem",
                        "send": "Enviar Mensagem",
                        "requestType": "Tipo de Solicitação",
                        "budget": "Solicitar Orçamento",
                        "support": "Suporte Técnico",
                        "consulting": "Consultoria",
                        "training": "Treinamento",
                        "others": "Outros",
                        "productInterest": "Produto de Interesse (opcional)",
                        "subject": "Assunto"
                    },
                    "info": {
                        "address": "ENDEREÇO",
                        "addressValue": "Av. Nova Independência, 87 cj32<br>Cidade Monções, São Paulo - SP",
                        "phone": "TELEFONE",
                        "email": "EMAIL",
                        "whatsapp": "WHATSAPP",
                        "hours": "Horário de Funcionamento",
                        "hoursValue": "Segunda a Sexta: 8h às 18h"
                    }
                },
                "footer": {
                    "description": "Precision Solutions - Excelência em Soluções Tecnológicas",
                    "rights": "PRECISION SOLUTIONS © Todos os direitos reservados. Implementação de conteúdo e material fornecidos pelo administrador.",
                    "privacy": "Política de Privacidade",
                    "terms": "Termos de Uso"
                }
            },
            en: {
                "meta": {
                    "title": "Precision Solutions - Excellence in Technological Solutions",
                    "description": "We provide excellence in managing your network and applications through high-quality products and services.",
                    "keywords": "telecommunications, technology, networks, consulting, ANATEL certification"
                },
                "navigation": {
                    "home": "HOME",
                    "about": "ABOUT US",
                    "services": "SERVICES",
                    "solutions": "SOLUTIONS",
                    "events": "EVENTS",
                    "contact": "CONTACT",
                    "consulting": "Consulting",
                    "integration": "Integration",
                    "operation": "Operation",
                    "certification": "Certification",
                    "training": "Training"
                },
                "hero": {
                    "title1": "Excellence in Technological Solutions",
                    "subtitle1": "Our goal is to provide excellence in managing your network and applications through high-quality products and services.",
                    "title2": "Specialized Consulting",
                    "subtitle2": "Personalized solutions for your network and telecommunications needs",
                    "title3": "ANATEL Certification",
                    "subtitle3": "Laboratory accredited by CGCRE according to ISO 17025 for equipment testing",
                    "title4": "Network Integration",
                    "subtitle4": "Implementation and validation of multiservice networks with cutting-edge technology",
                    "cta": "Get in Touch"
                },
                "differentials": {
                    "title": "Precision Solutions Differentiators",
                    "professional": {
                        "title": "Highly Qualified Professionals",
                        "description": "Specialized team with decades of experience in telecommunications and information technology."
                    },
                    "technology": {
                        "title": "Cutting-Edge Technology",
                        "description": "We use the most modern tools and equipment to ensure excellence in our services."
                    },
                    "support": {
                        "title": "24/7 Support",
                        "description": "Our team is always available to meet your needs and ensure continuity of your services."
                    },
                    "certification": {
                        "title": "ANATEL Certification",
                        "description": "Laboratory accredited by CGCRE according to ISO 17025, ensuring quality and reliability in our testing."
                    }
                },
                "about": {
                    "title": "ABOUT PRECISION SOLUTIONS",
                    "description": "Precision Solutions is a company specialized in providing technological solutions that enable visibility, testing, monitoring and optimization of networks in the telecommunications, electronics, energy and information technology segments. Based on decades of experience, our team of professionals is always available to understand our clients' needs and consultatively define the best strategy to meet the demands of testing & measurement, multiservice network implementation and equipment certification.",
                    "mission": {
                        "title": "OUR MISSION",
                        "description": "To provide services and products in the information technology and telecommunications sector to support our clients in their challenges and objectives"
                    },
                    "vision": {
                        "title": "OUR VISION",
                        "description": "To be a leader and reference in the telecommunications sector for network implementation, monitoring and certification through the relentless pursuit of pioneering knowledge and unlimited quality."
                    },
                    "values": {
                        "title": "OUR VALUES",
                        "items": [
                            "Commitment and total satisfaction of our clients",
                            "Reliability aiming at absence of failures",
                            "Valuing and respecting people",
                            "Ethics, honesty and seriousness",
                            "Social responsibility"
                        ]
                    }
                },
                "services": {
                    "title": "OUR SERVICES",
                    "consulting": {
                        "title": "Network Consulting",
                        "description": "We have an extensive portfolio of consulting services to meet our clients' needs. Among the services we provide:",
                        "items": [
                            "Backbone and FTTX network design",
                            "Performance testing in transport and L2/L3 networks up to 400Gbps",
                            "Network monitoring up to layer 7 and operation"
                        ]
                    },
                    "integration": {
                        "title": "Network Integration",
                        "description": "Precision Solutions' Multiservice Network Integration services allow your company to have planning, implementation, certification and network validation in an organized way and following the state of the art in each technology involved. Our professionals have experience in high complexity and mission critical projects. We can assist each client in various phases of the project from engineering to network validation."
                    },
                    "operation": {
                        "title": "Network Operation and Maintenance",
                        "description": "Join the group of companies that trust our Network Operation and Maintenance services. Through an extremely capable team we provide fast and mainly assertive diagnostics which allows the realization of efficient and effective troubleshooting. Whether through our NOC that provides Level 3 support or our Field Services team we work 24x7 every day so that your company and your customers have the least possible impact."
                    },
                    "certification": {
                        "title": "ANATEL Certification",
                        "description": "Precision Solutions has a Testing Laboratory for ANATEL certification. We are accredited by CGCRE according to ISO 17025. Our testing scope is quite comprehensive and can be checked in the link below. As a differential we provide quality service combined with flexibility and agility in testing.",
                        "scope": "Click here to view our Accredited Scope"
                    },
                    "training": {
                        "title": "Technology Training",
                        "description": "Through our training we share the best practices and concepts absorbed in years of experience in the telecommunications and information technology segment. In addition to the theoretical base we enrich the training with the practical application of the taught concept thus allowing a much more complete view of the subject."
                    }
                },
                "solutions": {
                    "title": "OUR TECHNOLOGICAL SOLUTIONS",
                    "testing": {
                        "title": "Testing and Measurement",
                        "description": "Complete solutions for testing and measurement of fiber optic networks, including OTDR, OLTS and certification equipment."
                    },
                    "monitoring": {
                        "title": "Network Monitoring",
                        "description": "Advanced 24/7 monitoring systems to ensure maximum network availability and performance."
                    },
                    "certification": {
                        "title": "ANATEL Certification",
                        "description": "Accredited laboratory for equipment certification according to ANATEL and ISO 17025 standards."
                    },
                    "consulting": {
                        "title": "Specialized Consulting",
                        "description": "Specialized technical consulting in telecommunications, networks and high-performance infrastructure."
                    }
                },
                "contact": {
                    "title": "GET IN TOUCH",
                    "subtitle": "WE ARE READY TO MEET YOUR NEEDS. CONTACT US.",
                    "form": {
                        "title": "Send your message and we will get back to you as soon as possible.",
                        "name": "Name",
                        "email": "Email",
                        "phone": "Phone",
                        "company": "Company",
                        "message": "Message",
                        "send": "Send Message",
                        "requestType": "Request Type",
                        "budget": "Request Quote",
                        "support": "Technical Support",
                        "consulting": "Consulting",
                        "training": "Training",
                        "others": "Others",
                        "productInterest": "Product of Interest (optional)",
                        "subject": "Subject"
                    },
                    "info": {
                        "address": "ADDRESS",
                        "addressValue": "Av. Nova Independência, 87 cj32<br>Cidade Monções, São Paulo - SP",
                        "phone": "PHONE",
                        "email": "EMAIL",
                        "whatsapp": "WHATSAPP",
                        "hours": "Business Hours",
                        "hoursValue": "Monday to Friday: 8am to 6pm"
                    }
                },
                "footer": {
                    "description": "Precision Solutions - Excellence in Technological Solutions",
                    "rights": "PRECISION SOLUTIONS © All rights reserved. Content implementation and material provided by the administrator.",
                    "privacy": "Privacy Policy",
                    "terms": "Terms of Use"
                }
            },
            es: {
                "meta": {
                    "title": "Precision Solutions - Excelencia en Soluciones Tecnológicas",
                    "description": "Proporcionamos excelencia en la gestión de su red y aplicaciones a través de productos y servicios de alta calidad.",
                    "keywords": "telecomunicaciones, tecnología, redes, consultoría, certificación ANATEL"
                },
                "navigation": {
                    "home": "INICIO",
                    "about": "QUIÉNES SOMOS",
                    "services": "SERVICIOS",
                    "solutions": "SOLUCIONES",
                    "events": "EVENTOS",
                    "contact": "CONTACTO",
                    "consulting": "Consultoría",
                    "integration": "Integración",
                    "operation": "Operación",
                    "certification": "Certificación",
                    "training": "Capacitación"
                },
                "hero": {
                    "title1": "Excelencia en Soluciones Tecnológicas",
                    "subtitle1": "Nuestro objetivo es proporcionar excelencia en la gestión de su red y aplicaciones a través de productos y servicios de alta calidad.",
                    "title2": "Consultoría Especializada",
                    "subtitle2": "Soluciones personalizadas para sus necesidades de red y telecomunicaciones",
                    "title3": "Certificación ANATEL",
                    "subtitle3": "Laboratorio acreditado por CGCRE según ISO 17025 para pruebas de equipos",
                    "title4": "Integración de Redes",
                    "subtitle4": "Implementación y validación de redes multiservicio con tecnología de vanguardia",
                    "cta": "Ponte en Contacto"
                },
                "differentials": {
                    "title": "Diferenciadores Precision Solutions",
                    "professional": {
                        "title": "Profesionales Altamente Calificados",
                        "description": "Equipo especializado con décadas de experiencia en telecomunicaciones y tecnología de la información."
                    },
                    "technology": {
                        "title": "Tecnología de Vanguardia",
                        "description": "Utilizamos las herramientas y equipos más modernos para garantizar la excelencia en nuestros servicios."
                    },
                    "support": {
                        "title": "Soporte 24/7",
                        "description": "Nuestro equipo está siempre disponible para atender sus necesidades y garantizar la continuidad de sus servicios."
                    },
                    "certification": {
                        "title": "Certificación ANATEL",
                        "description": "Laboratorio acreditado por CGCRE según ISO 17025, garantizando calidad y confiabilidad en nuestras pruebas."
                    }
                },
                "about": {
                    "title": "SOBRE PRECISION SOLUTIONS",
                    "description": "Precision Solutions es una empresa especializada en proporcionar soluciones tecnológicas que permiten visibilidad, pruebas, monitoreo y optimización de redes en los segmentos de telecomunicaciones, electrónica, energía y tecnología de la información. Basados en décadas de experiencia, nuestro equipo de profesionales está siempre disponible para entender las necesidades de nuestros clientes y de forma consultiva definir la mejor estrategia para atender las demandas de pruebas y medición, implementación de redes multiservicio y certificación de equipos.",
                    "mission": {
                        "title": "NUESTRA MISIÓN",
                        "description": "Proporcionar servicios y productos en el sector de tecnología de la información y telecomunicaciones para apoyar a nuestros clientes en sus desafíos y objetivos"
                    },
                    "vision": {
                        "title": "NUESTRA VISIÓN",
                        "description": "Ser líder y referencia en el sector de telecomunicaciones para implementación, monitoreo y certificación de redes a través de la búsqueda incansable de conocimiento pionero y calidad sin límite."
                    },
                    "values": {
                        "title": "NUESTROS VALORES",
                        "items": [
                            "Compromiso y satisfacción total de nuestros clientes",
                            "Confiabilidad buscando ausencia de fallas",
                            "Valorización y respeto a las personas",
                            "Ética, honestidad y seriedad",
                            "Responsabilidad social"
                        ]
                    }
                },
                "services": {
                    "title": "NUESTROS SERVICIOS",
                    "consulting": {
                        "title": "Consultoría en Redes",
                        "description": "Contamos con un portafolio extenso de servicios de consultoría para atender las necesidades de nuestros clientes. Entre los servicios que realizamos:",
                        "items": [
                            "Diseño de redes backbone y FTTX",
                            "Pruebas de rendimiento en redes de transporte y L2/L3 hasta 400Gbps",
                            "Monitoreo de redes hasta capa 7 y operación"
                        ]
                    },
                    "integration": {
                        "title": "Integración de Redes",
                        "description": "Los servicios de Integración de Redes Multiservicio de Precision Solutions permiten que su empresa tenga una planificación, implementación, certificación y validación de la red de forma organizada y siguiendo el estado del arte en cada tecnología involucrada. Nuestros profesionales poseen experiencia en proyectos de alta complejidad y de misión crítica. Podemos auxiliar a cada cliente en diversas fases del proyecto desde la ingeniería hasta la validación de la red."
                    },
                    "operation": {
                        "title": "Operación y Mantenimiento de Redes",
                        "description": "Únase al conjunto de empresas que confían en nuestros servicios de Operación y Mantenimiento de Redes. A través de un equipo extremadamente capacitado proporcionamos diagnósticos rápidos y principalmente asertivos lo que permite la realización de un troubleshooting eficiente y eficaz. Ya sea a través de nuestro NOC que proporciona soporte Nivel 3 o de nuestro equipo de Field Services trabajamos 24x7 todos los días para que su empresa y sus clientes tengan el menor impacto posible."
                    },
                    "certification": {
                        "title": "Certificación ANATEL",
                        "description": "Precision Solutions posee Laboratorio de Ensayos para certificación ANATEL. Somos acreditados por CGCRE según ISO 17025. Nuestro alcance de ensayos es bastante completo y puede ser consultado en el enlace a continuación. Como diferencial proporcionamos servicio de calidad unido a flexibilidad y agilidad en los ensayos.",
                        "scope": "Haga clic aquí para visualizar nuestro Alcance Acreditado"
                    },
                    "training": {
                        "title": "Capacitación en Tecnología",
                        "description": "A través de nuestras capacitaciones compartimos las mejores prácticas y conceptos absorbidos en años de experiencia en el segmento de telecomunicaciones y tecnología de la información. Además de la base teórica enriquecemos las capacitaciones con la aplicación práctica del concepto enseñado permitiendo así una visión mucho más completa del asunto."
                    }
                },
                "solutions": {
                    "title": "NUESTRAS SOLUCIONES TECNOLÓGICAS",
                    "testing": {
                        "title": "Pruebas y Medición",
                        "description": "Soluciones completas para pruebas y medición de redes de fibra óptica, incluyendo OTDR, OLTS y equipos de certificación."
                    },
                    "monitoring": {
                        "title": "Monitoreo de Redes",
                        "description": "Sistemas avanzados de monitoreo 24/7 para garantizar máxima disponibilidad y rendimiento de las redes."
                    },
                    "certification": {
                        "title": "Certificación ANATEL",
                        "description": "Laboratorio acreditado para certificación de equipos según estándares ANATEL e ISO 17025."
                    },
                    "consulting": {
                        "title": "Consultoría Especializada",
                        "description": "Consultoría técnica especializada en telecomunicaciones, redes e infraestructura de alto rendimiento."
                    }
                },
                "contact": {
                    "title": "PONTE EN CONTACTO",
                    "subtitle": "ESTAMOS LISTOS PARA ATENDER SUS NECESIDADES. CONTÁCTENOS.",
                    "form": {
                        "title": "Envíe su mensaje y le responderemos lo antes posible.",
                        "name": "Nombre",
                        "email": "Correo Electrónico",
                        "phone": "Teléfono",
                        "company": "Empresa",
                        "message": "Mensaje",
                        "send": "Enviar Mensaje",
                        "requestType": "Tipo de Solicitud",
                        "budget": "Solicitar Presupuesto",
                        "support": "Soporte Técnico",
                        "consulting": "Consultoría",
                        "training": "Capacitación",
                        "others": "Otros",
                        "productInterest": "Producto de Interés (opcional)",
                        "subject": "Asunto"
                    },
                    "info": {
                        "address": "DIRECCIÓN",
                        "addressValue": "Av. Nova Independência, 87 cj32<br>Cidade Monções, São Paulo - SP",
                        "phone": "TELÉFONO",
                        "email": "CORREO ELECTRÓNICO",
                        "whatsapp": "WHATSAPP",
                        "hours": "Horario de Funcionamiento",
                        "hoursValue": "Lunes a Viernes: 8h a 18h"
                    }
                },
                "footer": {
                    "description": "Precision Solutions - Excelencia en Soluciones Tecnológicas",
                    "rights": "PRECISION SOLUTIONS © Todos los derechos reservados. Implementación de contenido y material proporcionado por el administrador.",
                    "privacy": "Política de Privacidad",
                    "terms": "Términos de Uso"
                }
            }
        };

        this.translations = translations[this.currentLanguage] || translations.pt;
        console.log(`✅ Traduções carregadas para: ${this.currentLanguage}`);
    }

    // Aplicar traduções ao DOM
    applyTranslations() {
        // Atualizar meta tags
        this.updateMetaTags();
        
        // Atualizar elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Atualizar elementos com data-i18n-html
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.getTranslation(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });

        // Atualizar elementos com data-i18n-attr
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrData = element.getAttribute('data-i18n-attr');
            const [attr, key] = attrData.split(':');
            const translation = this.getTranslation(key);
            if (translation) {
                element.setAttribute(attr, translation);
            }
        });

        // Atualizar seletor de idiomas
        this.updateLanguageSelector();
    }

    // Atualizar meta tags
    updateMetaTags() {
        if (this.translations.meta) {
            document.title = this.translations.meta.title;
            
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', this.translations.meta.description);
            }

            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute('content', this.translations.meta.keywords);
            }
        }
    }

    // Obter tradução por chave
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations;
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Tradução não encontrada para: ${key}`);
                return key; // Retorna a chave se não encontrar tradução
            }
        }
        
        return translation;
    }

    // Alterar idioma
    changeLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        console.log(`🔄 Mudando idioma para: ${lang}`);
        this.currentLanguage = lang;
        this.setStoredLanguage(lang);
        
        this.loadTranslations();
        this.applyTranslations();
        console.log(`✅ Idioma alterado para: ${lang}`);
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    // Atualizar seletor de idiomas
    updateLanguageSelector() {
        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle) {
            const langMap = {
                'pt': 'PT',
                'en': 'EN',
                'es': 'ES'
            };
            langToggle.textContent = langMap[this.currentLanguage] || 'PT';
        }
    }

    // Obter idioma atual
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Obter lista de idiomas disponíveis
    getAvailableLanguages() {
        return [
            { code: 'pt', name: 'Português', flag: '🇧🇷' },
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'es', name: 'Español', flag: '🇪🇸' }
        ];
    }
}

// Inicializar sistema de internacionalização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema de tradução...');
    window.i18n = new I18n();
    console.log('✅ Sistema de tradução inicializado!');
});
