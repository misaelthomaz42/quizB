-- Script SQL Completo para Inserção de Questões (01 a 28)
-- Simpósio de Doutrinas Bíblicas 2026
-- Banco de Dados: u575119663_vest
-- Data: 2026-02-08

USE u575119663_vest;

-- OPCIONAL: Limpar tabelas se desejar recomeçar do zero
-- DELETE FROM user_answers;
-- DELETE FROM question_options;
-- DELETE FROM questions;
-- ALTER TABLE questions AUTO_INCREMENT = 1;

-- QUESTÃO 1
INSERT INTO questions (question_text) VALUES ('O ministério do profeta Elias, especialmente em seu surgimento histórico no Reino do Norte, revela aspectos centrais da vocação profética em contextos de decadência espiritual. Considerando o testemunho bíblico acerca de Elias e sua atuação diante de um cenário marcado pela infidelidade a Deus, assinale a alternativa que melhor expressa o significado teológico e missional de sua postura, aplicável também à atuação da Igreja na atualidade.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Elias representa um modelo de isolamento espiritual, no qual a fidelidade a Deus exige o afastamento definitivo da sociedade e de seus conflitos morais.', 0),
(@last_id, 'A atuação de Elias evidencia que a missão profética está condicionada à aprovação política e religiosa das lideranças vigentes.', 0),
(@last_id, 'A postura de Elias demonstra que o amor ao Senhor se manifesta prioritariamente por meio da adaptação da mensagem divina às demandas culturais do seu tempo.', 0),
(@last_id, 'O ministério de Elias aponta que a fidelidade a Deus implica posicionamento firme, dependência da provisão divina e confronto profético diante de um mundo dominado pelo pecado.', 1),
(@last_id, 'A experiência de Elias limita-se ao contexto histórico de Israel, não oferecendo parâmetros relevantes para a compreensão da missão cristã contemporânea.', 0);

-- QUESTÃO 2
INSERT INTO questions (question_text) VALUES ('O reinado de Acabe, no Reino do Norte, é tradicionalmente compreendido como um dos períodos de maior afastamento espiritual da história de Israel. A partir da análise bíblica desse contexto, assinale a alternativa que melhor expressa a relação entre liderança, prática religiosa e juízo divino, conforme apresentada nas Escrituras.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'A decadência espiritual de Israel nesse período ocorreu de forma independente das decisões reais, estando relacionada apenas às escolhas individuais do povo.', 0),
(@last_id, 'As práticas religiosas introduzidas durante o reinado de Acabe representaram uma ampliação legítima das formas de culto, sem comprometer a fidelidade ao Senhor.', 0),
(@last_id, 'As alianças firmadas pelo rei tiveram caráter exclusivamente político, não exercendo influência significativa sobre a vida espiritual da nação.', 0),
(@last_id, 'As decisões do rei contribuíram para a corrupção do culto, estimularam práticas reprováveis aos olhos do Senhor e demandaram uma atuação profética confrontadora.', 1),
(@last_id, 'O juízo divino manifestado nesse período contradiz o caráter misericordioso de Deus, revelando uma resposta desproporcional às ações humanas.', 0);

-- QUESTÃO 3
INSERT INTO questions (question_text) VALUES ('O surgimento do profeta Elias no cenário histórico de Israel, durante o reinado de um dos monarcas mais perversos da nação, revela um padrão recorrente da ação divina ao longo da história da redenção. O texto de referência associa esse padrão às reflexões paulinas em 1 Coríntios 1.26–28 e à compreensão neotestamentária do papel da Igreja. À luz desse estudo, o levantamento de Elias por Deus expressa, teologicamente, o princípio de que:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Deus prefere agir por meio de personagens marginalizados para evitar confrontos diretos com estruturas políticas e religiosas consolidadas.', 0),
(@last_id, 'A ausência de genealogia e formação profética formal em Elias indica que o ministério profético prescinde de preparo espiritual prévio.', 0),
(@last_id, 'A escolha de Elias confirma que a soberania divina se manifesta ao utilizar instrumentos considerados fracos e desprezados para confrontar poderes estabelecidos e cumprir Seus propósitos eternos.', 1),
(@last_id, 'O chamado profético de Elias representa uma exceção histórica, não podendo ser relacionado à identidade da Igreja no Novo Testamento.', 0),
(@last_id, 'A origem simples de Elias demonstra que a rusticidade cultural é condição indispensável para o exercício da autoridade espiritual.', 0);

-- QUESTÃO 4
INSERT INTO questions (question_text) VALUES ('Na lição 1 aprendemos que Elias tinha uma mensagem a levar, uma mensagem de juízo expressa em I Rs 17.1, mas ainda assim revestida de profundo significado espiritual. Na expressão do profeta, fica expressa que a firmeza dele provém:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'De si mesmo, pois sua formação espiritual sólida era capaz de lhe garantir vencer qualquer desafio.', 0),
(@last_id, 'De um profundo compromisso com Deus, perante quem Elias permanecia, sabendo que O SENHOR é vivo e O único Deus de Israel.', 1),
(@last_id, 'Do impacto causado pela ação de mudança espiritual expresso pela conversão de Jezabel e dos profetas de Azera.', 0),
(@last_id, 'Da certeza que o coração do povo já estava decidido por Deus, a multidão o apoiaria pois nunca havia entrado verdadeiramente no caminho da idolatria.', 0),
(@last_id, 'Do acordo feito junto aos profetas escondidos e liderança militar das nações vizinhas.', 0);

-- QUESTÃO 5
INSERT INTO questions (question_text) VALUES ('“Então lhe veio a palavra do Senhor, dizendo: Levanta-te, vai a Sarepta, que é de Sidom, e habita ali; eis que ordenei ali a uma mulher viúva que te sustente.” (1 Reis 17.8-9). A partir do texto bíblico e do contexto do ministério de Elias, assinale a alternativa que melhor expressa o ensino teológico central dessa experiência.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'A providência divina elimina a necessidade de obediência humana diante das ordens de Deus.', 0),
(@last_id, 'O cuidado de Deus manifesta-se prioritariamente em ambientes confortáveis e previsíveis.', 0),
(@last_id, 'A provisão divina está condicionada exclusivamente aos recursos materiais disponíveis no lugar.', 0),
(@last_id, 'Deus conduz seus servos a caminhos inesperados, ensinando dependência e submissão à sua vontade soberana.', 1),
(@last_id, 'A experiência de Elias em Sarepta demonstra a superioridade espiritual de Israel sobre as demais nações.', 0);

-- QUESTÃO 6
INSERT INTO questions (question_text) VALUES ('A experiência do profeta Elias no ribeiro de Querite constitui um importante momento pedagógico na sua formação espiritual e ministerial. À luz do relato bíblico e de sua interpretação teológica, analise as proposições: I. O período em Querite evidencia que Deus conduz seus servos por processos de humilhação e anonimato como parte do preparo para responsabilidades maiores. II. A provisão por meio dos corvos ensina que a confiança em Deus se fortalece quando o servo passa a depender exclusivamente da palavra divina, mesmo em contextos improváveis. III. O secar do ribeiro revela que a providência de Deus está condicionada à estabilidade das circunstâncias.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Apenas I está correta.', 0),
(@last_id, 'Apenas II está correta.', 0),
(@last_id, 'Apenas I e II estão corretas.', 1),
(@last_id, 'Apenas I e III estão corretas.', 0),
(@last_id, 'I, II e III estão corretas.', 0);

-- QUESTÃO 7
INSERT INTO questions (question_text) VALUES ('A experiência de Elias em Sarepta é apresentada nas Escrituras como um processo de refinamento espiritual. Considerando o relato bíblico, assinale a alternativa INCORRETA.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'O significado de Sarepta como “forno de fundição” simboliza um estágio mais profundo de purificação espiritual.', 0),
(@last_id, 'Elias demonstrou maturidade espiritual ao não se mover de Querite até receber uma direção clara do Senhor.', 0),
(@last_id, 'Ao depender de uma viúva pobre e estrangeira, Elias aprendeu que a providência divina pode operar por meios improváveis.', 0),
(@last_id, 'As circunstâncias adversas enfrentadas por Elias em Sarepta indicam que ele havia saído do centro da vontade de Deus, sendo provado por sua desobediência.', 1),
(@last_id, 'A postura de Elias diante da viúva revela fé e coragem fundamentadas na promessa divina.', 0);

-- QUESTÃO 8
INSERT INTO questions (question_text) VALUES ('Sobre o episódio da viúva de Sarepta, analise as proposições: I. Priorização do Reino acima das necessidades imediatas. II. A fé exige negar a realidade das limitações humanas. III. A obediência precedeu o milagre. IV. Provisão contínua. V. Experiência associada à fé obediente.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Apenas I, III e V estão corretas.', 0),
(@last_id, 'Apenas I, II e IV estão corretas.', 0),
(@last_id, 'Apenas II, III e IV estão corretas.', 0),
(@last_id, 'Apenas I, III, IV e V estão corretas.', 1),
(@last_id, 'I, II, III, IV e V estão corretas.', 0);

-- QUESTÃO 9
INSERT INTO questions (question_text) VALUES ('Considerando a mensagem teológica presente nos hinos da Harpa Cristã (298 e 372) e o confronto espiritual em 1 Reis 18.16–24, assinale a alternativa que melhor estabelece a relação entre a experiência de fé e a postura de Elias.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Os hinos enfatizam espiritualidade subjetiva, enquanto o Carmelo destaca apenas sinais extraordinários.', 0),
(@last_id, 'A vitória proclamada está associada ao esforço humano contínuo.', 0),
(@last_id, 'Tanto os hinos quanto a atuação de Elias revelam que a vitória espiritual está fundamentada na fidelidade ao Senhor e na confiança absoluta em Seu poder soberano.', 1),
(@last_id, 'Os textos poéticos abordam uma fé individual, enquanto o episódio bíblico se limita a um conflito político-religioso.', 0),
(@last_id, 'A mensagem dos hinos evita o confronto direto.', 0);

-- QUESTÃO 10
INSERT INTO questions (question_text) VALUES ('O encontro entre Elias e Acabe, mediado por Obadias, revela diferentes posturas. Relacione as colunas: (1) Elias, (2) Obadias, (3) Acabe. Características: ( ) Reconhece a ação soberana e protege servos. ( ) Interpreta a crise de lógica distorcida e transfere responsabilidade. ( ) Assume postura ousada e fiel.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, '1 – 2 – 3', 0),
(@last_id, '2 – 3 – 1', 1),
(@last_id, '3 – 1 – 2', 0),
(@last_id, '2 – 1 – 3', 0),
(@last_id, '1 – 3 – 2', 0);

-- QUESTÃO 11
INSERT INTO questions (question_text) VALUES ('À luz do episódio do monte Carmelo e da atuação do profeta Elias diante dos profetas de Baal, assinale a alternativa INCORRETA.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Confrontos espirituais decisivos são precedidos por preparação espiritual.', 0),
(@last_id, 'O apelo de Elias revela a incompatibilidade entre fidelidade ao Senhor e a idolatria.', 0),
(@last_id, 'O silêncio do povo evidencia a crise espiritual e a ausência de posicionamento claro.', 0),
(@last_id, 'O desafio aos profetas de Baal demonstra que a eficácia espiritual depende da quantidade de recursos humanos.', 1),
(@last_id, 'A vitória no Carmelo evidencia que os recursos de Deus são superiores.', 0);

-- QUESTÃO 12
INSERT INTO questions (question_text) VALUES ('Sobre o momento decisivo no ministério de Elias (restauração do culto), analise: I. Reconstrução do altar como restauração da comunhão. II. Eficácia vinculada à obediência. III. Superioridade de métodos intensos. IV. Resposta por fogo confirma a soberania. V. Restauração espiritual precede a material.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'I, II e IV', 0),
(@last_id, 'I, II, IV e V', 1),
(@last_id, 'II, III e IV', 0),
(@last_id, 'I, III e V', 0),
(@last_id, 'I, II, III e V', 0);

-- QUESTÃO 13
INSERT INTO questions (question_text) VALUES ('A reação de Elias após o Carmelo (fuga de Jezabel) revela que:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'A vitória espiritual elimina o risco de abatimento emocional.', 0),
(@last_id, 'A manifestação do poder no Carmelo foi insuficiente.', 0),
(@last_id, 'A experiência de grandes vitórias não anula a continuidade da guerra espiritual nem a necessidade de dependência de Deus.', 1),
(@last_id, 'O medo demonstra falta de fé incompatível.', 0),
(@last_id, 'A perseguição indica que Deus retirou o favor.', 0);

-- QUESTÃO 14
INSERT INTO questions (question_text) VALUES ('Com base em 2 Timóteo 1.7 e na lição, o texto ensina que o medo:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'É inevitável e deve ser aceito como natural.', 0),
(@last_id, 'Surge quando o homem passa a interpretar a realidade apenas à luz das ameaças visíveis, desviando o olhar da soberania divina.', 1),
(@last_id, 'Constitui uma virtude para preservar o profeta.', 0),
(@last_id, 'É sinal de apostasia espiritual.', 0),
(@last_id, 'Decorre exclusivamente de fatores psicológicos.', 0);

-- QUESTÃO 15
INSERT INTO questions (question_text) VALUES ('Segundo a distinção entre desertos permitidos e desertos escolhidos, o erro central de Elias em 1 Reis 19 foi:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Atravessar regiões longas sem planejamento.', 0),
(@last_id, 'Buscar o deserto como espaço de isolamento pessoal, e não como ambiente conduzido pela direção divina.', 1),
(@last_id, 'Abandonar o ministério para preservar a vida.', 0),
(@last_id, 'Reconhecer sua fragilidade emocional.', 0),
(@last_id, 'Desejar a morte como expressão de humildade.', 0);

-- QUESTÃO 16
INSERT INTO questions (question_text) VALUES ('O socorro de Deus a Elias (descanso, alimento, encorajamento) revela qual princípio teológico?');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Substituição do ministério por intervenção angelical.', 0),
(@last_id, 'Prioridade da restauração física.', 0),
(@last_id, 'Reprovação silenciosa de Deus.', 0),
(@last_id, 'A manifestação da graça restauradora de Deus, que fortalece o servo antes de conduzi-lo novamente ao propósito.', 1),
(@last_id, 'Suspensão da missão até prova de fidelidade.', 0);

-- QUESTÃO 17
INSERT INTO questions (question_text) VALUES ('O tempo prolongado (40 dias) da caminhada de Elias até Horebe simboliza:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Punição divina pela fuga.', 0),
(@last_id, 'Necessidade de isolamento absoluto.', 0),
(@last_id, 'Um processo pedagógico de Deus, voltado ao quebrantamento, dependência e renovação espiritual do servo.', 1),
(@last_id, 'Limitação física do profeta.', 0),
(@last_id, 'Repetição mecânica de padrão numérico.', 0);

-- QUESTÃO 18
INSERT INTO questions (question_text) VALUES ('Considerando o significado espiritual de Horebe para a vida do crente, ele é:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Espaço geográfico exclusivo de Israel.', 0),
(@last_id, 'Símbolo de fuga legítima.', 0),
(@last_id, 'Ambiente de sinais apenas extraordinários.', 0),
(@last_id, 'Um tempo e lugar conduzidos por Deus para revelar Sua vontade e alinhar o servo ao Seu propósito.', 1),
(@last_id, 'Etapa final da caminhada espiritual.', 0);

-- QUESTÃO 19
INSERT INTO questions (question_text) VALUES ('Teologicamente, a pergunta “Que fazes aqui, Elias?” revela que:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Deus desconhecia o paradeiro do profeta.', 0),
(@last_id, 'Elias foi conduzido à caverna para descanso definitivo.', 0),
(@last_id, 'A pergunta divina visa despertar a consciência do servo quanto ao afastamento do propósito original.', 1),
(@last_id, 'O questionamento expressa reprovação severa.', 0),
(@last_id, 'Deus aceitava a justificativa de Elias.', 0);

-- QUESTÃO 20
INSERT INTO questions (question_text) VALUES ('A manifestação no “cicio tranquilo e suave” em Horebe ensina que:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Deus abandonou sinais sobrenaturais.', 0),
(@last_id, 'Ausência de espetáculo indica distanciamento.', 0),
(@last_id, 'Deus limita revelação ao silêncio.', 0),
(@last_id, 'O Senhor pode agir tanto de forma poderosa quanto silenciosa, mantendo Sua soberania e cuidado.', 1),
(@last_id, 'Apenas profetas maduros ouvem a voz suave.', 0);

-- QUESTÃO 21
INSERT INTO questions (question_text) VALUES ('Conforme a lição 6, não é uma característica humana citada de Elias (Tiago 5.17):');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Dependente.', 0),
(@last_id, 'Sujeito ao esgotamento.', 0),
(@last_id, 'Impetuosidade.', 1),
(@last_id, 'Isolamento.', 0),
(@last_id, 'Experiência de desânimo e medo.', 0);

-- QUESTÃO 22
INSERT INTO questions (question_text) VALUES ('Assinale a alternativa com o versículo que melhor se harmoniza ao contexto e propósito da oração de Elias mencionada em Tiago 5.17:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Lucas 9:54', 0),
(@last_id, '1 Reis 17:23', 0),
(@last_id, 'Tiago 5:16b', 1),
(@last_id, '1 Samuel 2:1', 0),
(@last_id, 'II Sm 21.18', 0);

-- QUESTÃO 23
INSERT INTO questions (question_text) VALUES ('São pontuados como subtópicos pelo comentarista da Lição 6:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Um homem em Defesa do Seu Deus, Um homem intercessor, Um homem disposto ao sacrifício.', 1),
(@last_id, 'Um homem diferenciado, Um profeta convicto, Um homem em Defesa do Seu Deus.', 0),
(@last_id, 'Um vaso de honra, Um servo incomum.', 0),
(@last_id, 'Uma tocha de fogo, Um instrumento de juízo.', 0),
(@last_id, 'Um servo de orelha furada, Um pregador eloquente.', 0);

-- QUESTÃO 24
INSERT INTO questions (question_text) VALUES ('Acerca da humanidade de Elias, assinale a alternativa que sintetiza a reflexão proposta na lição 6.');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Gênesis 4:9', 0),
(@last_id, '2 Crônicas 32:11', 0),
(@last_id, 'Eclesiastes 6:12', 0),
(@last_id, 'Lucas 18:11,12', 0),
(@last_id, '2 Coríntios 4:7', 1);

-- QUESTÃO 25
INSERT INTO questions (question_text) VALUES ('Acerca da trasladação, quem foi responsável pela separação e subida ao céu, respectivamente:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Um turbilhão e uma carruagem de ouro', 0),
(@last_id, 'Um vento veemente e um trovão', 0),
(@last_id, 'Uma brisa suave e uma nuvem', 0),
(@last_id, 'Um carro de fogo e um redemoinho', 1),
(@last_id, 'Uma capa e um cetro', 0);

-- QUESTÃO 26
INSERT INTO questions (question_text) VALUES ('Foram lugares por onde Elias passou antes da trasladação (II Reis 2):');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Horebe, Moriá e Jericó', 0),
(@last_id, 'Sucote, Meribá e Luz', 0),
(@last_id, 'Betel, Jericó e Jordão', 1),
(@last_id, 'Jerusalém, Cafarnaum e Mispa', 0),
(@last_id, 'Tebas, Tiberíades e Sinai', 0);

-- QUESTÃO 27
INSERT INTO questions (question_text) VALUES ('Segundo a lição 7, o pedido de “porção dobrada” feito por Eliseu representava:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'O seu desejo de superar Elias.', 0),
(@last_id, 'Demonstrar ousadia espiritual.', 0),
(@last_id, 'O desejo altruísta de ser um autêntico discípulo de seu senhor.', 1),
(@last_id, 'Expectativa de nova geração.', 0),
(@last_id, 'Apresentar que a nova geração é sempre mais capaz.', 0);

-- QUESTÃO 28
INSERT INTO questions (question_text) VALUES ('Elias confronta Acabe antes de sua trasladação, demonstrando no episódio que:');
SET @last_id = LAST_INSERT_ID();
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(@last_id, 'Tinha uma mensagem, uma identidade e autoridade', 1),
(@last_id, 'Tinha uma posição de controle social e unção diferenciada', 0),
(@last_id, 'Tinha um vaso de barro, uma espada e um discípulo', 0),
(@last_id, 'Tinha um chifre de azeite e uma trombeta', 0),
(@last_id, 'Tinha um cutelo e uma capa.', 0);
