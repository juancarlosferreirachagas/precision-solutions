/**
 * ========================================
 * TRANSLATIONS - MÓDULO DE TRADUÇÕES
 * ========================================
 * 
 * Este módulo contém todas as traduções do site organizadas
 * de forma hierárquica e estruturada. Ele segue os princípios:
 * - Single Source of Truth (SSOT)
 * - Separation of Concerns
 * - Maintainability
 * 
 * Estrutura das traduções:
 * - navigation: Links de navegação
 * - hero: Seção principal/banner
 * - about: Seção sobre a empresa
 * - services: Seções de serviços
 * - contact: Formulário de contato
 * - footer: Rodapé
 * 
 * @author Precision Solutions
 * @version 2.0.0
 * @since 2024
 */

const Translations = {
    /**
     * ========================================
     * TRADUÇÕES EM PORTUGUÊS (PT)
     * ========================================
     * 
     * Idioma padrão do site. Todas as outras traduções
     * devem manter a mesma estrutura hierárquica.
     */
    pt: {
        // Navegação principal
        navigation: {
            home: 'HOME',
            about: 'QUEM SOMOS',
            services: 'SERVIÇOS',
            consulting: 'Consultoria',
            integration: 'Integração',
            operation: 'Operação',
            certification: 'Certificação',
            training: 'Treinamento',
            solutions: 'SOLUÇÕES',
            contact: 'CONTATO'
        },

        // Seção hero/banner principal
        hero: {
            title1: 'Excelência em Soluções Tecnológicas',
            subtitle1: 'Nosso objetivo é proporcionar excelência na gestão da sua rede e aplicações através de produtos e serviços de alta qualidade.',
            title2: 'Consultoria Especializada',
            subtitle2: 'Soluções personalizadas para suas necessidades de rede e telecomunicações',
            title3: 'Certificação ANATEL',
            subtitle3: 'Laboratório acreditado pela CGCRE conforme ISO 17025 para ensaios de equipamentos',
            title4: 'Integração de Redes',
            subtitle4: 'Implantação e validação de redes multisserviços com tecnologia de ponta',
            cta: 'Entre em Contato'
        },

        // Seção sobre a empresa
        about: {
            title: 'SOBRE A PRECISION SOLUTIONS',
            description: 'A Precision Solutions é uma empresa especializada em prover soluções tecnológicas que permitem visibilidade, teste, monitoração e otimização de redes no segmento de telecomunicações, eletrônica, energia e tecnologia da informação. Com base em décadas de experiência, nosso time de profissionais está sempre disponível para entender a necessidade de nossos clientes e de forma consultiva definir a melhor estratégia para atender as demandas de teste & medição, implantação de redes multisserviços e certificação de equipamentos.',
            
            // Trajetória da empresa
            trajectory: {
                title: 'TRAJETÓRIA',
                foundation: {
                    title: 'Fundação Precision',
                    description: 'Nasce a Precision Solutions com foco em prover serviços e produtos em telecomunicações com excelência ilimitada'
                },
                accreditation: {
                    title: 'Acreditação',
                    description: 'Precision Solutions conquista acreditação de qualidade ISO17025'
                },
                worldcup: {
                    title: 'Copa do Mundo',
                    description: 'Precision Solutions é responsável pela implantação da rede de comunicação de 50% dos estádios da Copa do Mundo'
                },
                olympics: {
                    title: 'Olimpíadas',
                    description: 'Precision Solutions implementa a rede óptica do Rio de Janeiro e participa da operação da malha mundial de comunicação que suporta as Olimpíadas de 2016'
                }
            },

            // Missão e visão
            mission: {
                title: 'NOSSA MISSÃO',
                description: 'Prover serviços e produtos no setor de tecnologia da informação e telecomunicações para suportar nossos clientes em seus desafios e objetivos'
            },
            vision: {
                title: 'NOSSA VISÃO',
                description: 'Ser reconhecida como a melhor empresa de soluções tecnológicas do Brasil, oferecendo produtos e serviços de excelência que superem as expectativas de nossos clientes'
            },
            values: {
                title: 'NOSSOS VALORES',
                description: 'Excelência, Inovação, Comprometimento, Transparência e Parceria são os pilares que norteiam nossa atuação no mercado'
            }
        },

        // Diferenciais da empresa
        differentials: {
            title: 'Diferenciais Precision Solutions',
            professional: {
                title: 'Profissionais Altamente Qualificados',
                description: 'Time especializado com décadas de experiência em telecomunicações e tecnologia da informação.'
            },
            partnership: {
                title: 'Parceria com os Melhores Fornecedores do Mercado',
                description: 'Trabalhamos com líderes do mercado para oferecer as melhores soluções tecnológicas.'
            },
            consulting: {
                title: 'Consultoria Personalizada',
                description: 'Soluções sob medida para cada cliente, adaptadas às suas necessidades específicas.'
            },
            expertise: {
                title: 'Know-how e Expertise Precision',
                description: 'Expertise e Know How único desenvolvido ao longo de anos de experiência no mercado.'
            }
        },

        // Seções de serviços
        services: {
            title: 'NOSSOS SERVIÇOS',
            subtitle: 'Soluções completas em tecnologia e telecomunicações'
        },

        // Consultoria
        consulting: {
            title: 'CONSULTORIA',
            subtitle: 'Soluções personalizadas para suas necessidades',
            description: 'Nossa equipe de consultores especializados oferece soluções personalizadas para atender às suas necessidades específicas em telecomunicações e tecnologia da informação.',
            features: {
                title: 'Nossos Serviços de Consultoria',
                analysis: {
                    title: 'Análise de Redes',
                    description: 'Avaliação completa da infraestrutura de rede existente'
                },
                planning: {
                    title: 'Planejamento Estratégico',
                    description: 'Desenvolvimento de estratégias para otimização de recursos'
                },
                implementation: {
                    title: 'Implementação de Soluções',
                    description: 'Execução de projetos com acompanhamento especializado'
                }
            }
        },

        // Integração
        integration: {
            title: 'INTEGRAÇÃO',
            subtitle: 'Conectando tecnologias e soluções',
            description: 'Especialistas em integração de sistemas e tecnologias, garantindo que todas as soluções trabalhem em harmonia para otimizar seus processos.',
            features: {
                title: 'Nossos Serviços de Integração',
                systems: {
                    title: 'Integração de Sistemas',
                    description: 'Conectamos diferentes sistemas para funcionar como uma solução única'
                },
                networks: {
                    title: 'Integração de Redes',
                    description: 'Unificação de redes heterogêneas em uma infraestrutura coesa'
                },
                monitoring: {
                    title: 'Monitoramento Integrado',
                    description: 'Soluções de monitoramento unificado para toda a infraestrutura'
                }
            }
        },

        // Operação
        operation: {
            title: 'OPERAÇÃO',
            subtitle: 'Gestão e manutenção de infraestrutura',
            description: 'Serviços de operação e manutenção para garantir a disponibilidade e performance de sua infraestrutura tecnológica.',
            features: {
                title: 'Nossos Serviços de Operação',
                maintenance: {
                    title: 'Manutenção Preventiva',
                    description: 'Manutenção programada para evitar falhas e otimizar performance'
                },
                support: {
                    title: 'Suporte Técnico',
                    description: 'Suporte especializado 24/7 para resolução de problemas'
                },
                optimization: {
                    title: 'Otimização de Performance',
                    description: 'Melhoria contínua da performance e eficiência dos sistemas'
                }
            }
        },

        // Certificação
        certification: {
            title: 'CERTIFICAÇÃO',
            subtitle: 'Laboratório acreditado ANATEL',
            description: 'Laboratório acreditado pela CGCRE conforme ISO 17025 para ensaios de equipamentos de telecomunicações.',
            features: {
                title: 'Nossos Serviços de Certificação',
                testing: {
                    title: 'Ensaios de Equipamentos',
                    description: 'Testes rigorosos para certificação de equipamentos'
                },
                compliance: {
                    title: 'Conformidade Regulatória',
                    description: 'Garantia de conformidade com regulamentações da ANATEL'
                },
                documentation: {
                    title: 'Documentação Técnica',
                    description: 'Relatórios técnicos detalhados para certificação'
                }
            }
        },

        // Treinamento
        training: {
            title: 'TREINAMENTO',
            subtitle: 'Capacitação e desenvolvimento técnico',
            description: 'Programas de treinamento especializados para capacitar sua equipe em tecnologias de telecomunicações e TI.',
            features: {
                title: 'Nossos Programas de Treinamento',
                technical: {
                    title: 'Treinamento Técnico',
                    description: 'Capacitação em tecnologias específicas e equipamentos'
                },
                certification: {
                    title: 'Certificação Profissional',
                    description: 'Programas de certificação para profissionais'
                },
                consulting: {
                    title: 'Consultoria em Treinamento',
                    description: 'Desenvolvimento de programas personalizados de capacitação'
                }
            }
        },

        // Formulário de contato
        contact: {
            title: 'ENTRE EM CONTATO',
            subtitle: 'Estamos prontos para atender suas necessidades',
            description: 'Entre em contato conosco para conhecer nossas soluções e como podemos ajudar sua empresa.',
            
            form: {
                name: 'Nome',
                email: 'Email',
                phone: 'Telefone',
                company: 'Empresa',
                subject: 'Assunto',
                message: 'Mensagem',
                submit: 'Enviar Mensagem',
                success: 'Mensagem enviada com sucesso!',
                error: 'Erro ao enviar mensagem. Tente novamente.'
            },

            info: {
                address: 'Endereço',
                phone: 'Telefone',
                email: 'Email',
                hours: 'Horário de Funcionamento'
            }
        },

        // Rodapé
        footer: {
            brand: {
                description: 'Precision Solutions - Excelência em soluções tecnológicas para telecomunicações e TI.'
            },
            navigation: {
                title: 'Navegação',
                home: 'Home',
                about: 'Quem Somos',
                services: 'Serviços',
                contact: 'Contato'
            },
            services: {
                title: 'Serviços',
                consulting: 'Consultoria',
                integration: 'Integração',
                operation: 'Operação',
                certification: 'Certificação',
                training: 'Treinamento'
            },
            contact: {
                title: 'Contato',
                address: 'Endereço',
                phone: 'Telefone',
                email: 'Email'
            },
            copyright: '© 2024 Precision Solutions. Todos os direitos reservados.'
        }
    },

    /**
     * ========================================
     * TRADUÇÕES EM INGLÊS (EN)
     * ========================================
     * 
     * Traduções para o mercado internacional.
     * Mantém a mesma estrutura hierárquica do português.
     */
    en: {
        navigation: {
            home: 'HOME',
            about: 'ABOUT US',
            services: 'SERVICES',
            consulting: 'Consulting',
            integration: 'Integration',
            operation: 'Operation',
            certification: 'Certification',
            training: 'Training',
            solutions: 'SOLUTIONS',
            contact: 'CONTACT'
        },

        hero: {
            title1: 'Excellence in Technological Solutions',
            subtitle1: 'Our goal is to provide excellence in managing your network and applications through high-quality products and services.',
            title2: 'Specialized Consulting',
            subtitle2: 'Personalized solutions for your network and telecommunications needs',
            title3: 'ANATEL Certification',
            subtitle3: 'Laboratory accredited by CGCRE according to ISO 17025 for equipment testing',
            title4: 'Network Integration',
            subtitle4: 'Implementation and validation of multiservice networks with cutting-edge technology',
            cta: 'Get in Touch'
        },

        about: {
            title: 'ABOUT PRECISION SOLUTIONS',
            description: 'Precision Solutions is a company specialized in providing technological solutions that enable visibility, testing, monitoring and optimization of networks in the telecommunications, electronics, energy and information technology segments. Based on decades of experience, our team of professionals is always available to understand our clients\' needs and consultatively define the best strategy to meet the demands of testing & measurement, multiservice network implementation and equipment certification.',
            
            trajectory: {
                title: 'TRAJECTORY',
                foundation: {
                    title: 'Precision Foundation',
                    description: 'Precision Solutions is born with a focus on providing telecommunications services and products with unlimited excellence'
                },
                accreditation: {
                    title: 'Accreditation',
                    description: 'Precision Solutions achieves ISO17025 quality accreditation'
                },
                worldcup: {
                    title: 'World Cup',
                    description: 'Precision Solutions is responsible for implementing the communication network for 50% of the World Cup stadiums'
                },
                olympics: {
                    title: 'Olympics',
                    description: 'Precision Solutions implements the Rio de Janeiro optical network and participates in the operation of the global communication network that supports the 2016 Olympics'
                }
            },

            mission: {
                title: 'OUR MISSION',
                description: 'To provide services and products in the information technology and telecommunications sector to support our clients in their challenges and objectives'
            },
            vision: {
                title: 'OUR VISION',
                description: 'To be recognized as the best technological solutions company in Brazil, offering products and services of excellence that exceed our clients\' expectations'
            },
            values: {
                title: 'OUR VALUES',
                description: 'Excellence, Innovation, Commitment, Transparency and Partnership are the pillars that guide our market performance'
            }
        },

        differentials: {
            title: 'Precision Solutions Differentiators',
            professional: {
                title: 'Highly Qualified Professionals',
                description: 'Specialized team with decades of experience in telecommunications and information technology.'
            },
            partnership: {
                title: 'Partnership with the Best Market Suppliers',
                description: 'We work with market leaders to offer the best technological solutions.'
            },
            consulting: {
                title: 'Personalized Consulting',
                description: 'Tailored solutions for each client, adapted to their specific needs.'
            },
            expertise: {
                title: 'Precision Know-how and Expertise',
                description: 'Unique expertise and know-how developed over years of market experience.'
            }
        },

        services: {
            title: 'OUR SERVICES',
            subtitle: 'Complete solutions in technology and telecommunications'
        },

        consulting: {
            title: 'CONSULTING',
            subtitle: 'Personalized solutions for your needs',
            description: 'Our team of specialized consultants offers personalized solutions to meet your specific needs in telecommunications and information technology.',
            features: {
                title: 'Our Consulting Services',
                analysis: {
                    title: 'Network Analysis',
                    description: 'Complete evaluation of existing network infrastructure'
                },
                planning: {
                    title: 'Strategic Planning',
                    description: 'Development of strategies for resource optimization'
                },
                implementation: {
                    title: 'Solution Implementation',
                    description: 'Project execution with specialized monitoring'
                }
            }
        },

        integration: {
            title: 'INTEGRATION',
            subtitle: 'Connecting technologies and solutions',
            description: 'Specialists in systems and technologies integration, ensuring that all solutions work in harmony to optimize your processes.',
            features: {
                title: 'Our Integration Services',
                systems: {
                    title: 'Systems Integration',
                    description: 'We connect different systems to work as a single solution'
                },
                networks: {
                    title: 'Network Integration',
                    description: 'Unification of heterogeneous networks into a cohesive infrastructure'
                },
                monitoring: {
                    title: 'Integrated Monitoring',
                    description: 'Unified monitoring solutions for the entire infrastructure'
                }
            }
        },

        operation: {
            title: 'OPERATION',
            subtitle: 'Infrastructure management and maintenance',
            description: 'Operation and maintenance services to ensure the availability and performance of your technological infrastructure.',
            features: {
                title: 'Our Operation Services',
                maintenance: {
                    title: 'Preventive Maintenance',
                    description: 'Scheduled maintenance to prevent failures and optimize performance'
                },
                support: {
                    title: 'Technical Support',
                    description: 'Specialized 24/7 support for problem resolution'
                },
                optimization: {
                    title: 'Performance Optimization',
                    description: 'Continuous improvement of system performance and efficiency'
                }
            }
        },

        certification: {
            title: 'CERTIFICATION',
            subtitle: 'ANATEL accredited laboratory',
            description: 'Laboratory accredited by CGCRE according to ISO 17025 for telecommunications equipment testing.',
            features: {
                title: 'Our Certification Services',
                testing: {
                    title: 'Equipment Testing',
                    description: 'Rigorous tests for equipment certification'
                },
                compliance: {
                    title: 'Regulatory Compliance',
                    description: 'Guarantee of compliance with ANATEL regulations'
                },
                documentation: {
                    title: 'Technical Documentation',
                    description: 'Detailed technical reports for certification'
                }
            }
        },

        training: {
            title: 'TRAINING',
            subtitle: 'Technical training and development',
            description: 'Specialized training programs to train your team in telecommunications and IT technologies.',
            features: {
                title: 'Our Training Programs',
                technical: {
                    title: 'Technical Training',
                    description: 'Training in specific technologies and equipment'
                },
                certification: {
                    title: 'Professional Certification',
                    description: 'Certification programs for professionals'
                },
                consulting: {
                    title: 'Training Consulting',
                    description: 'Development of personalized training programs'
                }
            }
        },

        contact: {
            title: 'GET IN TOUCH',
            subtitle: 'We are ready to meet your needs',
            description: 'Contact us to learn about our solutions and how we can help your company.',
            
            form: {
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                company: 'Company',
                subject: 'Subject',
                message: 'Message',
                submit: 'Send Message',
                success: 'Message sent successfully!',
                error: 'Error sending message. Please try again.'
            },

            info: {
                address: 'Address',
                phone: 'Phone',
                email: 'Email',
                hours: 'Business Hours'
            }
        },

        footer: {
            brand: {
                description: 'Precision Solutions - Excellence in technological solutions for telecommunications and IT.'
            },
            navigation: {
                title: 'Navigation',
                home: 'Home',
                about: 'About Us',
                services: 'Services',
                contact: 'Contact'
            },
            services: {
                title: 'Services',
                consulting: 'Consulting',
                integration: 'Integration',
                operation: 'Operation',
                certification: 'Certification',
                training: 'Training'
            },
            contact: {
                title: 'Contact',
                address: 'Address',
                phone: 'Phone',
                email: 'Email'
            },
            copyright: '© 2024 Precision Solutions. All rights reserved.'
        }
    },

    /**
     * ========================================
     * TRADUÇÕES EM ESPANHOL (ES)
     * ========================================
     * 
     * Traduções para o mercado hispanohablante.
     * Mantém a mesma estrutura hierárquica.
     */
    es: {
        navigation: {
            home: 'INICIO',
            about: 'QUIÉNES SOMOS',
            services: 'SERVICIOS',
            consulting: 'Consultoría',
            integration: 'Integración',
            operation: 'Operación',
            certification: 'Certificación',
            training: 'Capacitación',
            solutions: 'SOLUCIONES',
            contact: 'CONTACTO'
        },

        hero: {
            title1: 'Excelencia en Soluciones Tecnológicas',
            subtitle1: 'Nuestro objetivo es proporcionar excelencia en la gestión de su red y aplicaciones a través de productos y servicios de alta calidad.',
            title2: 'Consultoría Especializada',
            subtitle2: 'Soluciones personalizadas para sus necesidades de red y telecomunicaciones',
            title3: 'Certificación ANATEL',
            subtitle3: 'Laboratorio acreditado por CGCRE según ISO 17025 para pruebas de equipos',
            title4: 'Integración de Redes',
            subtitle4: 'Implementación y validación de redes multiservicio con tecnología de vanguardia',
            cta: 'Ponte en Contacto'
        },

        about: {
            title: 'SOBRE PRECISION SOLUTIONS',
            description: 'Precision Solutions es una empresa especializada en proporcionar soluciones tecnológicas que permiten visibilidad, prueba, monitoreo y optimización de redes en los segmentos de telecomunicaciones, electrónica, energía y tecnología de la información. Basados en décadas de experiencia, nuestro equipo de profesionales está siempre disponible para entender las necesidades de nuestros clientes y de forma consultiva definir la mejor estrategia para atender las demandas de prueba y medición, implementación de redes multiservicio y certificación de equipos.',
            
            trajectory: {
                title: 'TRAYECTORIA',
                foundation: {
                    title: 'Fundación Precision',
                    description: 'Nace Precision Solutions con enfoque en proporcionar servicios y productos en telecomunicaciones con excelencia ilimitada'
                },
                accreditation: {
                    title: 'Acreditación',
                    description: 'Precision Solutions logra acreditación de calidad ISO17025'
                },
                worldcup: {
                    title: 'Copa del Mundo',
                    description: 'Precision Solutions es responsable de la implementación de la red de comunicación del 50% de los estadios de la Copa del Mundo'
                },
                olympics: {
                    title: 'Olimpiadas',
                    description: 'Precision Solutions implementa la red óptica de Río de Janeiro y participa en la operación de la red mundial de comunicación que soporta las Olimpiadas de 2016'
                }
            },

            mission: {
                title: 'NUESTRA MISIÓN',
                description: 'Proporcionar servicios y productos en el sector de tecnología de la información y telecomunicaciones para apoyar a nuestros clientes en sus desafíos y objetivos'
            },
            vision: {
                title: 'NUESTRA VISIÓN',
                description: 'Ser reconocida como la mejor empresa de soluciones tecnológicas de Brasil, ofreciendo productos y servicios de excelencia que superen las expectativas de nuestros clientes'
            },
            values: {
                title: 'NUESTROS VALORES',
                description: 'Excelencia, Innovación, Compromiso, Transparencia y Asociación son los pilares que guían nuestro desempeño en el mercado'
            }
        },

        differentials: {
            title: 'Diferenciadores Precision Solutions',
            professional: {
                title: 'Profesionales Altamente Calificados',
                description: 'Equipo especializado con décadas de experiencia en telecomunicaciones y tecnología de la información.'
            },
            partnership: {
                title: 'Asociación con los Mejores Proveedores del Mercado',
                description: 'Trabajamos con líderes del mercado para ofrecer las mejores soluciones tecnológicas.'
            },
            consulting: {
                title: 'Consultoría Personalizada',
                description: 'Soluciones a medida para cada cliente, adaptadas a sus necesidades específicas.'
            },
            expertise: {
                title: 'Know-how y Experiencia Precision',
                description: 'Experiencia y Know How único desarrollado a lo largo de años de experiencia en el mercado.'
            }
        },

        services: {
            title: 'NUESTROS SERVICIOS',
            subtitle: 'Soluciones completas en tecnología y telecomunicaciones'
        },

        consulting: {
            title: 'CONSULTORÍA',
            subtitle: 'Soluciones personalizadas para sus necesidades',
            description: 'Nuestro equipo de consultores especializados ofrece soluciones personalizadas para satisfacer sus necesidades específicas en telecomunicaciones y tecnología de la información.',
            features: {
                title: 'Nuestros Servicios de Consultoría',
                analysis: {
                    title: 'Análisis de Redes',
                    description: 'Evaluación completa de la infraestructura de red existente'
                },
                planning: {
                    title: 'Planificación Estratégica',
                    description: 'Desarrollo de estrategias para optimización de recursos'
                },
                implementation: {
                    title: 'Implementación de Soluciones',
                    description: 'Ejecución de proyectos con monitoreo especializado'
                }
            }
        },

        integration: {
            title: 'INTEGRACIÓN',
            subtitle: 'Conectando tecnologías y soluciones',
            description: 'Especialistas en integración de sistemas y tecnologías, garantizando que todas las soluciones trabajen en armonía para optimizar sus procesos.',
            features: {
                title: 'Nuestros Servicios de Integración',
                systems: {
                    title: 'Integración de Sistemas',
                    description: 'Conectamos diferentes sistemas para funcionar como una solución única'
                },
                networks: {
                    title: 'Integración de Redes',
                    description: 'Unificación de redes heterogéneas en una infraestructura cohesiva'
                },
                monitoring: {
                    title: 'Monitoreo Integrado',
                    description: 'Soluciones de monitoreo unificado para toda la infraestructura'
                }
            }
        },

        operation: {
            title: 'OPERACIÓN',
            subtitle: 'Gestión y mantenimiento de infraestructura',
            description: 'Servicios de operación y mantenimiento para garantizar la disponibilidad y rendimiento de su infraestructura tecnológica.',
            features: {
                title: 'Nuestros Servicios de Operación',
                maintenance: {
                    title: 'Mantenimiento Preventivo',
                    description: 'Mantenimiento programado para evitar fallas y optimizar rendimiento'
                },
                support: {
                    title: 'Soporte Técnico',
                    description: 'Soporte especializado 24/7 para resolución de problemas'
                },
                optimization: {
                    title: 'Optimización de Rendimiento',
                    description: 'Mejora continua del rendimiento y eficiencia de los sistemas'
                }
            }
        },

        certification: {
            title: 'CERTIFICACIÓN',
            subtitle: 'Laboratorio acreditado ANATEL',
            description: 'Laboratorio acreditado por CGCRE según ISO 17025 para pruebas de equipos de telecomunicaciones.',
            features: {
                title: 'Nuestros Servicios de Certificación',
                testing: {
                    title: 'Pruebas de Equipos',
                    description: 'Pruebas rigurosas para certificación de equipos'
                },
                compliance: {
                    title: 'Cumplimiento Regulatorio',
                    description: 'Garantía de cumplimiento con regulaciones de ANATEL'
                },
                documentation: {
                    title: 'Documentación Técnica',
                    description: 'Informes técnicos detallados para certificación'
                }
            }
        },

        training: {
            title: 'CAPACITACIÓN',
            subtitle: 'Entrenamiento y desarrollo técnico',
            description: 'Programas de entrenamiento especializados para capacitar a su equipo en tecnologías de telecomunicaciones y TI.',
            features: {
                title: 'Nuestros Programas de Capacitación',
                technical: {
                    title: 'Entrenamiento Técnico',
                    description: 'Capacitación en tecnologías específicas y equipos'
                },
                certification: {
                    title: 'Certificación Profesional',
                    description: 'Programas de certificación para profesionales'
                },
                consulting: {
                    title: 'Consultoría en Capacitación',
                    description: 'Desarrollo de programas personalizados de capacitación'
                }
            }
        },

        contact: {
            title: 'PONTE EN CONTACTO',
            subtitle: 'Estamos listos para satisfacer sus necesidades',
            description: 'Contáctanos para conocer nuestras soluciones y cómo podemos ayudar a su empresa.',
            
            form: {
                name: 'Nombre',
                email: 'Email',
                phone: 'Teléfono',
                company: 'Empresa',
                subject: 'Asunto',
                message: 'Mensaje',
                submit: 'Enviar Mensaje',
                success: '¡Mensaje enviado con éxito!',
                error: 'Error al enviar mensaje. Inténtalo de nuevo.'
            },

            info: {
                address: 'Dirección',
                phone: 'Teléfono',
                email: 'Email',
                hours: 'Horario de Atención'
            }
        },

        footer: {
            brand: {
                description: 'Precision Solutions - Excelencia en soluciones tecnológicas para telecomunicaciones y TI.'
            },
            navigation: {
                title: 'Navegación',
                home: 'Inicio',
                about: 'Quiénes Somos',
                services: 'Servicios',
                contact: 'Contacto'
            },
            services: {
                title: 'Servicios',
                consulting: 'Consultoría',
                integration: 'Integración',
                operation: 'Operación',
                certification: 'Certificación',
                training: 'Capacitación'
            },
            contact: {
                title: 'Contacto',
                address: 'Dirección',
                phone: 'Teléfono',
                email: 'Email'
            },
            copyright: '© 2024 Precision Solutions. Todos los derechos reservados.'
        }
    }
};

// Exportar o objeto de traduções
// Em um ambiente com módulos ES6, usaríamos: export default Translations;
// Para compatibilidade, vamos adicionar ao objeto window
window.Translations = Translations;
