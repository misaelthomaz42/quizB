-- Script SQL Final para Simpósio de Doutrinas Bíblicas 2026
-- Contém 28 questões com formatação preservada e suporte a imagens
-- Banco de Dados: u575119663_vest
-- Data: 2026-02-08

USE u575119663_vest;

-- Limpar dados anteriores para garantir que os IDs fiquem de 1 a 28 conforme o gabarito
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM user_answers;
DELETE FROM exam_attempts;
DELETE FROM question_options;
DELETE FROM questions;
ALTER TABLE questions AUTO_INCREMENT = 1;
SET FOREIGN_KEY_CHECKS = 1;

-- QUESTÃO 01
INSERT INTO questions (id, question_text) VALUES (1, 'O ministério do profeta Elias, especialmente em seu surgimento histórico no Reino do Norte, revela aspectos centrais da vocação profética em contextos de decadência espiritual. Considerando o testemunho bíblico acerca de Elias e sua atuação diante de um cenário marcado pela infidelidade a Deus, assinale a alternativa que melhor expressa o significado teológico e missional de sua postura, aplicável também à atuação da Igreja na atualidade.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(1, 'a) Elias representa um modelo de isolamento espiritual, no qual a fidelidade a Deus exige o afastamento definitivo da sociedade e de seus conflitos morais.', 0),
(1, 'b) A atuação de Elias evidencia que a missão profética está condicionada à aprovação política e religiosa das lideranças vigentes.', 0),
(1, 'c) A postura de Elias demonstra que o amor ao Senhor se manifesta prioritariamente por meio da adaptação da mensagem divina às demandas culturais do seu tempo.', 0),
(1, 'd) O ministério de Elias aponta que a fidelidade a Deus implica posicionamento firme, dependência da provisão divina e confronto profético diante de um mundo dominado pelo pecado.', 1),
(1, 'e) A experiência de Elias limita-se ao contexto histórico de Israel, não oferecendo parâmetros relevantes para a compreensão da missão cristã contemporânea.', 0);

-- QUESTÃO 02
INSERT INTO questions (id, question_text) VALUES (2, 'O reinado de Acabe, no Reino do Norte, é tradicionalmente compreendido como um dos períodos de maior afastamento espiritual da história de Israel. A partir da análise bíblica desse contexto, assinale a alternativa que melhor expressa a relação entre liderança, prática religiosa e juízo divino, conforme apresentada nas Escrituras.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(2, 'a) A decadência espiritual de Israel nesse período ocorreu de forma independente das decisões reais, estando relacionada apenas às escolhas individuais do povo.', 0),
(2, 'b) As práticas religiosas introduzidas durante o reinado de Acabe representaram uma ampliação legítima das formas de culto, sem comprometer a fidelidade ao Senhor.', 0),
(2, 'c) As alianças firmadas pelo rei tiveram caráter exclusivamente político, não exercendo influência significativa sobre a vida espiritual da nação.', 0),
(2, 'd) As decisões do rei contribuíram para a corrupção do culto, estimularam práticas reprováveis aos olhos do Senhor e demandaram uma atuação profética confrontadora.', 1),
(2, 'e) O juízo divino manifestado nesse período contradiz o caráter misericordioso de Deus, revelando uma resposta desproporcional às ações humanas.', 0);

-- QUESTÃO 03
INSERT INTO questions (id, question_text) VALUES (3, 'O surgimento do profeta Elias no cenário histórico de Israel, durante o reinado de um dos monarcas mais perversos da nação, revela um padrão recorrente da ação divina ao longo da história da redenção. O texto de referência associa esse padrão às reflexões paulinas em 1 Coríntios 1.26–28 e à compreensão neotestamentária do papel da Igreja. À luz desse estudo, o levantamento de Elias por Deus expressa, teologicamente, o princípio de que:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(3, 'a) Deus prefere agir por meio de personagens marginalizados para evitar confrontos diretos com estruturas políticas e religiosas consolidadas.', 0),
(3, 'b) A ausência de genealogia e formação profética formal em Elias indica que o ministério profético prescinde de preparo espiritual prévio.', 0),
(3, 'c) A escolha de Elias confirma que a soberania divina se manifesta ao utilizar instrumentos considerados fracos e desprezados para confrontar poderes estabelecidos e cumprir Seus propósitos eternos.', 1),
(3, 'd) O chamado profético de Elias representa uma exceção histórica, não podendo ser relacionado à identidade da Igreja no Novo Testamento.', 0),
(3, 'e) A origem simples de Elias demonstra que a rusticidade cultural é condição indispensável para o exercício da autoridade espiritual.', 0);

-- QUESTÃO 04
INSERT INTO questions (id, question_text) VALUES (4, 'Na lição 1 aprendemos que Elias tinha uma mensagem a levar, uma mensagem de juízo expressa em I Rs 17.1, mas ainda assim revestida de profundo significado espiritual. Na expressão do profeta, fica expressa que a firmeza dele provém:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(4, 'a) De si mesmo, pois sua formação espiritual sólida era capaz de lhe garantir vencer qualquer desafio.', 0),
(4, 'b) De um profundo compromisso com Deus, perante quem Elias permanecia, sabendo que O SENHOR é vivo e O único Deus de Israel.', 1),
(4, 'c) Do impacto causado pela ação de mudança espiritual expresso pela conversão de Jezabel e dos profetas de Azera.', 0),
(4, 'd) Da certeza que o coração do povo já estava decidido por Deus, a multidão o apoiaria pois nunca havia entrado verdadeiramente no caminho da idolatria.', 0),
(4, 'e) Do acordo feito junto aos profetas escondidos e liderança militar das nações vizinhas.', 0);

-- QUESTÃO 05
INSERT INTO questions (id, question_text) VALUES (5, '“Então lhe veio a palavra do Senhor, dizendo: Levanta-te, vai a Sarepta, que é de Sidom, e habita ali; eis que ordenei ali a uma mulher viúva que te sustente.” (1 Reis 17.8-9)\nA partir do texto bíblico e do contexto do ministério de Elias, assinale a alternativa que melhor expressa o ensino teológico central dessa experiência.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(5, 'a) A providência divina elimina a necessidade de obediência humana diante das ordens de Deus.', 0),
(5, 'b) O cuidado de Deus manifesta-se prioritariamente em ambientes confortáveis e previsíveis.', 0),
(5, 'c) A provisão divina está condicionada exclusivamente aos recursos materiais disponíveis no lugar.', 0),
(5, 'd) Deus conduz seus servos a caminhos inesperados, ensinando dependência e submissão à sua vontade soberana.', 1),
(5, 'e) A experiência de Elias em Sarepta demonstra a superioridade espiritual de Israel sobre as demais nações.', 0);

-- QUESTÃO 06
INSERT INTO questions (id, question_text) VALUES (6, 'A experiência do profeta Elias no ribeiro de Querite constitui um importante momento pedagógico na sua formação espiritual e ministerial. À luz do relato bíblico e de sua interpretação teológica, analise as proposições a seguir:\n\nI. O período em Querite evidencia que Deus conduz seus servos por processos de humilhação e anonimato como parte do preparo para responsabilidades maiores.\nII. A provisão por meio dos corvos ensina que a confiança em Deus se fortalece quando o servo passa a depender exclusivamente da palavra divina, mesmo em contextos improváveis.\nIII. O secar do ribeiro revela que a providência de Deus está condicionada à estabilidade das circunstâncias, exigindo que o servo busque alternativas por conta própria.\n\nAssinale a alternativa CORRETA.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(6, 'a) Apenas I está correta.', 0),
(6, 'b) Apenas II está correta.', 0),
(6, 'c) Apenas I e II estão corretas.', 1),
(6, 'd) Apenas I e III estão corretas.', 0),
(6, 'e) I, II e III estão corretas.', 0);

-- QUESTÃO 07
INSERT INTO questions (id, question_text) VALUES (7, 'A experiência de Elias em Sarepta é apresentada nas Escrituras como um processo de refinamento espiritual, no qual fé, dependência e submissão à vontade divina são profundamente exercitadas. Considerando o relato bíblico e seus ensinamentos teológicos, assinale a alternativa INCORRETA.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(7, 'a) O significado de Sarepta como “forno de fundição” simboliza um estágio mais profundo de purificação espiritual na vida do profeta.', 0),
(7, 'b) Elias demonstrou maturidade espiritual ao não se mover de Querite até receber uma direção clara do Senhor, evitando agir por iniciativa própria.', 0),
(7, 'c) Ao depender de uma viúva pobre e estrangeira, Elias aprendeu que a providência divina pode operar por meios humanos improváveis.', 0),
(7, 'd) As circunstâncias adversas enfrentadas por Elias em Sarepta indicam que ele havia saído do centro da vontade de Deus, sendo provado por sua desobediência.', 1),
(7, 'e) A postura de Elias diante da viúva revela fé e coragem fundamentadas na promessa divina, mesmo diante da escassez extrema.', 0);

-- QUESTÃO 08
INSERT INTO questions (id, question_text) VALUES (8, 'O episódio da viúva de Sarepta constitui um dos relatos mais didáticos das Escrituras acerca da fé prática, da obediência e da ação da providência divina. Considerando o ensino bíblico desse episódio e suas implicações para a vida cristã, analise as proposições a seguir:\n\nI. A atitude da viúva ao atender ao pedido do profeta demonstra a priorização do Reino de Deus acima das necessidades imediatas.\nII. O reconhecimento explícito da escassez revela que a fé bíblica exige negar a realidade das limitações humanas.\nIII. A obediência da viúva precedeu a manifestação do milagre, evidenciando a confiança na palavra de Deus.\nIV. A presença do profeta na casa da viúva simboliza a mediação divina, pela qual a provisão do Senhor se torna contínua.\nV. O episódio ensina que a experiência com os milagres de Deus está associada à fé obediente e perseverante.\n\nAssinale a alternativa CORRETA.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(8, 'a) Apenas I, III e V estão corretas.', 0),
(8, 'b) Apenas I, II e IV estão corretas.', 0),
(8, 'c) Apenas II, III e IV estão corretas.', 0),
(8, 'd) Apenas I, III, IV e V estão corretas.', 1),
(8, 'e) I, II, III, IV e V estão corretas.', 0);

-- QUESTÃO 09
INSERT INTO questions (id, question_text) VALUES (9, 'Leia atentamente os trechos a seguir, extraídos de hinos da Harpa Cristã:\n\nTexto I – Hino 298 (HC)\n“Glória a Deus, pois vencerei Glória a Deus, pois vencerei Triunfante sigo, levando a cruz Glória a Deus, pois vencerei Glória a Deus, pois vencerei Em nome de Jesus”\n\nTexto II – Hino 372 (HC)\n“Vencerá, vencerá, por Seu sangue vencerá Vencerá, vencerá, sempre vencerá Pois Jesus, que impera, novas forças dá E quem n''Ele espera sempre vencerá”\n\nConsiderando a mensagem teológica presente nos hinos e o confronto espiritual narrado em 1 Reis 18.16–24, assinale a alternativa que melhor estabelece a relação entre a experiência de fé expressa nos cânticos e a postura do profeta Elias diante dos desafios espirituais.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(9, 'a) Os hinos enfatizam uma espiritualidade subjetiva e emocional, enquanto o episódio do Carmelo destaca exclusivamente a manifestação de sinais extraordinários.', 0),
(9, 'b) A vitória proclamada nos hinos está associada ao esforço humano contínuo, ao passo que Elias atribui o resultado do confronto à mobilização coletiva do povo.', 0),
(9, 'c) Tanto os hinos quanto a atuação de Elias revelam que a vitória espiritual está fundamentada na fidelidade ao Senhor e na confiança absoluta em Seu poder soberano.', 1),
(9, 'd) Os textos poéticos abordam uma fé de caráter individual, enquanto o episódio bíblico se limita a um conflito de natureza político-religiosa.', 0),
(9, 'e) A mensagem dos hinos evita o confronto direto, ao passo que Elias promove um embate público, evidenciando perspectivas teológicas opostas.', 0);

-- QUESTÃO 10
INSERT INTO questions (id, question_text) VALUES (10, 'O encontro entre Elias e Acabe, mediado pela atuação de Obadias, revela diferentes posturas diante da crise espiritual que assolava Israel. A partir da análise desse episódio, estabeleça a correlação correta entre os personagens/situações (Coluna I) e as características/ações que melhor os definem (Coluna II).\n\nColuna I\n1. Elias diante de Acabe\n2. Obadias no contexto do reinado de Acabe\n3. Acabe diante da calamidade em Israel\n\nColuna II\n( ) Reconhece a ação soberana de Deus mesmo em meio à corrupção espiritual, assumindo riscos para proteger os servos do Senhor.\n( ) Interpreta a crise nacional a partir de uma lógica distorcida, transferindo a responsabilidade espiritual para quem proclama a verdade.\n( ) Assume postura ousada e obediente à ordem divina, colocando a fidelidade a Deus acima da própria segurança pessoal.\n\nAssinale a alternativa que apresenta a sequência CORRETA, de cima para baixo.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(10, 'a) 1 – 2 – 3', 0),
(10, 'b) 2 – 3 – 1', 1),
(10, 'c) 3 – 1 – 2', 0),
(10, 'd) 2 – 1 – 3', 0),
(10, 'e) 1 – 3 – 2', 0);

-- QUESTÃO 11
INSERT INTO questions (id, question_text) VALUES (11, 'Leia atentamente o texto bíblico a seguir:\n“Então Elias se chegou a todo o povo e disse: Até quando coxeareis entre dois pensamentos? Se o Senhor é Deus, segui-o; e, se Baal, segui-o. Porém o povo não lhe respondeu nada.” (1 Reis 18.21)\nÀ luz do episódio do monte Carmelo e da atuação do profeta Elias diante dos profetas de Baal, assinale a alternativa INCORRETA.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(11, 'a) A convocação do povo e dos profetas ao Carmelo indica que os confrontos espirituais decisivos são precedidos por preparação espiritual e dependência de Deus.', 0),
(11, 'b) O apelo de Elias ao povo revela a incompatibilidade entre a fidelidade ao Senhor e a tentativa de conciliar o culto verdadeiro com a idolatria.', 0),
(11, 'c) O silêncio do povo diante da exortação de Elias evidencia a crise espiritual de Israel e a ausência de posicionamento claro diante da verdade.', 0),
(11, 'd) O desafio aos profetas de Baal demonstra que a eficácia espiritual depende da quantidade de recursos humanos e da intensidade do esforço religioso.', 1),
(11, 'e) A vitória de Elias no Carmelo evidencia que os recursos provenientes de Deus são superiores às forças meramente humanas e religiosas.', 0);

-- QUESTÃO 12 (COM IMAGEM)
INSERT INTO questions (id, question_text) VALUES (12, '[IMAGE:/questao12.jpg]\nA imagem apresentada retrata um momento decisivo do ministério do profeta Elias, em um contexto de confronto espiritual e restauração do culto ao Senhor. Considerando o episódio bíblico correspondente e suas implicações teológicas, analise as proposições a seguir:\n\nI. A reconstrução do altar simboliza não apenas um ato litúrgico, mas a restauração da comunhão entre Deus e o Seu povo, rompida pela infidelidade espiritual.\nII. A postura de Elias evidencia que a eficácia da ação profética está vinculada à obediência à palavra do Senhor, e não a estratégias humanas ou demonstrações espetaculares.\nIII. O contraste entre as práticas dos profetas de Baal e a oração de Elias revela a superioridade de métodos religiosos mais intensos e sacrificiais.\nIV. A resposta divina por meio do fogo confirma a soberania de Deus e tem como finalidade principal revelar quem é o verdadeiro Senhor diante do povo.\nV. A sequência dos acontecimentos indica que a restauração espiritual precede a restauração material, evidenciada posteriormente pela chuva.\n\nAssinale a alternativa que contém apenas as proposições CORRETAS:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(12, 'a) I, II e IV', 0),
(12, 'b) I, II, IV e V', 1),
(12, 'c) II, III e IV', 0),
(12, 'd) I, III e V', 0),
(12, 'e) I, II, III e V', 0);

-- QUESTÃO 13
INSERT INTO questions (id, question_text) VALUES (13, 'O contraste entre a vitória pública de Elias no monte Carmelo e sua fuga motivada pela ameaça de Jezabel evidencia uma tensão recorrente na experiênia do servo de Deus. A lição articula essa tensão com textos paulinos e com a realidade da caminhada cristã. À luz dessa abordagem, a reação de Elias após o Carmelo revela que:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(13, 'a) A vitória espiritual elimina definitivamente o risco de abatimento emocional e espiritual no servo de Deus.', 0),
(13, 'b) A manifestação sobrenatural do poder divino no Carmelo foi insuficiente para sustentar Elias em longo prazo.', 0),
(13, 'c) A experiência de grandes vitórias não anula a continuidade da guerra espiritual nem a necessidade constante de dependência de Deus.', 1),
(13, 'd) O medo de Elias demonstra falta de fé incompatível com o ministério profético autêntico.', 0),
(13, 'e) A perseguição de Jezabel indica que Deus havia retirado temporariamente Seu favor do profeta.', 0);

-- QUESTÃO 14
INSERT INTO questions (id, question_text) VALUES (14, 'A lição afirma que o medo experimentado por Elias não deve ser compreendido apenas como um sentimento, mas como um espírito que influencia decisões, percepções e atitudes, conforme 2 Timóteo 1.7. Com base nessa compreensão, o texto ensina que o medo:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(14, 'a) É inevitável e permanente na vida dos servos de Deus, devendo ser aceito como parte natural da espiritualidade.', 0),
(14, 'b) Surge quando o homem passa a interpretar a realidade apenas à luz das ameaças visíveis, desviando o olhar da soberania divina.', 1),
(14, 'c) Constitui uma virtude necessária para preservar o profeta de riscos excessivos no cumprimento do chamado.', 0),
(14, 'd) É sinal inequívoco de apostasia espiritual e abandono completo da fé.', 0),
(14, 'e) Decorre exclusivamente de fatores psicológicos, sem implicações espirituais.', 0);

-- QUESTÃO 15
INSERT INTO questions (id, question_text) VALUES (15, 'No relato de 1 Reis 19, Elias se afasta do povo, deixa seu moço e caminha para o deserto. A lição distingue entre desertos permitidos por Deus e desertos escolhidos pelo próprio homem. Segundo essa reflexão, o erro central de Elias nesse momento foi:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(15, 'a) Atravessar regiões longas sem planejamento físico adequado.', 0),
(15, 'b) Buscar o deserto como espaço de isolamento pessoal, e não como ambiente conduzido pela direção divina.', 1),
(15, 'c) Abandonar temporariamente o ministério profético para preservar sua vida.', 0),
(15, 'd) Reconhecer sua fragilidade emocional diante das ameaças sofridas.', 0),
(15, 'e) Desejar a morte como expressão de humildade extrema diante de Deus.', 0);

-- QUESTÃO 16
INSERT INTO questions (id, question_text) VALUES (16, 'O socorro prestado por Deus a Elias no deserto ocorre por meio de descanso, toque angelical, alimento e encorajamento, sem qualquer palavra de reprovação. Essa sequência revela um princípio teológico relevante sobre a ação divina diante da fragilidade humana. À luz do texto estudado, esse princípio pode ser corretamente compreendido como:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(16, 'a) A substituição do ministério profético por intervenção angelical direta.', 0),
(16, 'b) A prioridade da restauração física antes de qualquer restauração espiritual.', 0),
(16, 'c) A demonstração de que Deus reprova silenciosamente Seus servos quando falham emocionalmente.', 0),
(16, 'd) A manifestação da graça restauradora de Deus, que fortalece o servo antes de conduzi-lo novamente ao propósito.', 1),
(16, 'e) A suspensão temporária da missão profética até que o servo prove sua fidelidade.', 0);

-- QUESTÃO 17
INSERT INTO questions (id, question_text) VALUES (17, 'A caminhada de elias até Horebe não foi direta, mas prolongada, marcada por quarenta dias e noites de deslocamento, sustentado pelo alimento provido por deus. a lição associa esse percurso a outros períodos bíblicos de quarenta dias ou anos. à luz dessa correlação bíblica, o tempo prolongado da caminhada de Elias até Horebe simboliza:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(17, 'a) A punição divina pela fuga de elias após a ameaça de jezabel.', 0),
(17, 'b) A necessidade de isolamento absoluto como condição para a revelação divina.', 0),
(17, 'c) Um processo pedagógico de deus, voltado ao quebrantamento, dependência e renovação espiritual do servo.', 1),
(17, 'd) A limitação física do profeta, incapaz de percorrer o caminho em menor tempo.', 0),
(17, 'e) A repetição mecânica de um padrão numérico sem implicação teológica.', 0);

-- QUESTÃO 18
INSERT INTO questions (id, question_text) VALUES (18, 'O monte Horebe é apresentado como lugar de revelação, orientação e reencontro com Deus, tanto no Antigo quanto no Novo Testamento. A lição destaca que, no Horebe, Deus fala de maneira específica e direcionadora. Considerando essa perspectiva, o significado espiritual de Horebe para a vida do crente pode ser corretamente compreendido como:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(18, 'a) um espaço geográfico exclusivo, inacessível fora do contexto histórico de Israel.', 0),
(18, 'b) um símbolo de fuga legítima das responsabilidades ministeriais.', 0),
(18, 'c) um ambiente onde Deus se manifesta apenas por meio de sinais extraordinários.', 0),
(18, 'd) um tempo e lugar conduzidos por Deus para revelar Sua vontade e alinhar o servo ao Seu propósito.', 1),
(18, 'e) uma etapa final da caminhada espiritual, após a qual não há mais desafios.', 0);

-- QUESTÃO 19
INSERT INTO questions (id, question_text) VALUES (19, 'Quando Elias se encontra na caverna em Horebe, a Palavra do Senhor o alcança com a pergunta: “Que fazes aqui, Elias?”. A lição enfatiza o caráter confrontador e restaurador dessa indagação divina. Teologicamente, essa pergunta revela que:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(19, 'a) Deus desconhecia o paradeiro exato do profeta naquele momento.', 0),
(19, 'b) Elias havia sido conduzido por Deus à caverna como local definitivo de descanso.', 0),
(19, 'c) A pergunta divina visa despertar a consciência do servo quanto ao afastamento do propósito original.', 1),
(19, 'd) O questionamento expressa reprovação severa e rejeição do ministério de Elias.', 0),
(19, 'e) Deus aceitava plenamente a justificativa apresentada por Elias.', 0);

-- QUESTÃO 20
INSERT INTO questions (id, question_text) VALUES (20, 'Ao se manifestar a Elias em Horebe, o Senhor não fala por meio de vento forte, terremoto ou fogo, mas em um “cicio tranquilo e suave”. Esse modo de revelação contrasta com experiências anteriores do ministério do profeta. Conforme a lição, essa forma de manifestação divina ensina que:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(20, 'a) Deus abandonou os sinais sobrenaturais como meio legítimo de revelação.', 0),
(20, 'b) A ausência de manifestações espetaculares indica distanciamento divino.', 0),
(20, 'c) Deus limita Sua revelação a momentos de silêncio absoluto.', 0),
(20, 'd) O Senhor pode agir tanto de forma poderosa quanto silenciosa, mantendo Sua soberania e cuidado.', 1),
(20, 'e) Apenas profetas maduros são capazes de ouvir a voz suave de Deus.', 0);

-- QUESTÃO 21
INSERT INTO questions (id, question_text) VALUES (21, '"Elias era homem sujeito às mesmas paixões que nós e, orando, pediu que não chovesse e, por três anos e seis meses, não choveu sobre a terra. (Tg 5.17)"\n\nO versículo escrito por Tiago, servo do Senhor, expressa de maneira cristalina a humanidade de Elias. A trajetória vitoriosa de Elias nos ensina que Deus usa pessoas comuns para propósitos extraordinários. Na lição de número 6, não é uma característica humana citada deste homem usado por Deus:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(21, 'a) Dependente.', 0),
(21, 'b) Sujeito ao esgotamento.', 0),
(21, 'c) Impetuosidade.', 1),
(21, 'd) Isolamento.', 0),
(21, 'e) Experiência de desânimo e medo.', 0);

-- QUESTÃO 22
INSERT INTO questions (id, question_text) VALUES (22, 'Quando lemos que Elias era igual a nós e que ele orou e Deus atendeu, compreendemos, então, que os recursos à disposição do homem de Deus estão também à nossa mercê como cristãos. Tiago diz que ele “orou com fervor” (NAA) e “depois orou de novo”, mostrando que a oração era uma prática constante e habitual em sua vida. Acerca da oração feita por Elias, o texto de Tiago 5.17 revela que a seca (ausência de chuva) profetizada por Elias, bem como a posterior chegada da chuva foram antecedidas por oração. Assinale a alternativa com o versículo que melhor se harmoniza ao contexto e propósito desta oração de Elias:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(22, 'a) "E os seus discípulos, Tiago e João, vendo isto, disseram: Senhor, queres que digamos que desça fogo do céu e os consuma, como Elias também fez?" (Lucas 9:54)', 0),
(22, 'b) "E Elias tomou o menino, e o trouxe do quarto à casa, e o deu à sua mãe; e disse Elias: Vês aí, teu filho vive." (1 Reis 17:23)', 0),
(22, 'c) "A oração do justo pode muito em seus efeitos." (Tiago 5:16b)', 1),
(22, 'd) "Então orou Ana, e disse: O meu coração exulta ao Senhor, o meu poder está exaltado no Senhor; a minha boca se dilatou sobre os meus inimigos, porquanto me alegro na tua salvação." (1 Samuel 2:1)', 0),
(22, 'e) "Faz a tua parte e Eu te ajudarei." (II Sm 21.18)', 0);

-- QUESTÃO 23
INSERT INTO questions (id, question_text) VALUES (23, 'A marca mais profunda da vida de Elias foi sua paixão ardente pelo Senhor. Nada movia suas decisões mais do que o desejo de honrar a Deus. Seu coração queimava com zelo pela santidade divina, como ele mesmo declarou: “Tenho sido extremamente zeloso pelo Senhor” (1Rs 19.10). São pontuados como subtópicos pelo comentarista da Lição 6:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(23, 'a) Um homem em Defesa do Seu Deus, Um homem intercessor, Um homem disposto ao sacrifício.', 1),
(23, 'b) Um homem diferenciado, Um profeta convicto, Um homem em Defesa do Seu Deus.', 0),
(23, 'c) Um vaso de honra nas mãos dO Senhor, Um servo incomum, Uma flecha nas mãos do Valente.', 0),
(23, 'd) Uma tocha de fogo, Um instrumento de juízo, Um pai amoroso.', 0),
(23, 'e) Um servo de orelha furada, Um pregador eloquente, Um amigo fiel.', 0);

-- QUESTÃO 24
INSERT INTO questions (id, question_text) VALUES (24, 'Acerca da humanidade de Elias, assinale a alternativa que sintetiza a reflexão proposta na lição 6.');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(24, 'a) "E disse o Senhor a Caim: Onde está Abel, teu irmão? E ele disse: Não sei; sou eu guardador do meu irmão?" (Gênesis 4:9)', 0),
(24, 'b) "Quando Ezequias diz: ‘O Senhor, o nosso Deus, nos salvará das mãos do rei da Assíria’, ele os está enganando, para deixá-los morrer de fome e de sede." (2 Crônicas 32:11)', 0),
(24, 'c) "Pois, quem sabe o que é bom para o homem, nos poucos dias de sua vida vazia, em que ele passa como uma sombra? Quem poderá lhe contar o que acontecerá debaixo do sol depois que ele partir?" (Eclesiastes 6:12)', 0),
(24, 'd) "O fariseu, em pé, orava no íntimo: ‘Deus, eu te agradeço porque não sou como os outros homens: ladrões, corruptos, adúlteros; nem mesmo como este publicano. Jejuo duas vezes por semana e dou o dízimo de tudo quanto ganho’." (Lucas 18:11,12)', 0),
(24, 'e) "Temos, porém, este tesouro em vasos de barro, para que a excelência do poder seja de Deus, e não de nós." (2 Coríntios 4:7)', 1);

-- QUESTÃO 25
INSERT INTO questions (id, question_text) VALUES (25, 'A trasladação do profeta Elias é uma mensagem atual para a Igreja do Senhor. Ela mostra a soberania e a autoridade de Deus para definir o futuro de cada um de nós. É Ele quem define o fim da vida de seus servos, como no caso de Moisés, a quem Ele mesmo sepultou (Dt 34.5,6). Já na vida de Enoque e de Elias, Deus estabeleceu exceções à morte, apontando para o arrebatamento dos santos na volta de Jesus (Gn 5.24; 2 Rs 2.11).\n\nAcerca desta trasladação, foi responsável pela separação e sua subida ao céu, respectivamente:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(25, 'a) Um turbilhão e uma carruagem de ouro', 0),
(25, 'b) Um vento veemente e um trovão', 0),
(25, 'c) Uma brisa suave e uma nuvem', 0),
(25, 'd) Um carro de fogo e um redemoinho', 1),
(25, 'e) Uma capa e um cetro', 0);

-- QUESTÃO 26
INSERT INTO questions (id, question_text) VALUES (26, 'Antes da trasladação de Elias, a Bíblia registra em II Reis 2 que ele passou por diversos lugares. Elias estava em Gilgal quando falou a Eliseu de sua partida (2 Rs 2.1). A Palavra de Deus diz que ele partiu dessa cidade em direção ao lugar onde seria trasladado pelo Senhor.\n\nForam lugares por onde Elias passou em seguida:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(26, 'a) Horebe, Moriá e Jericó', 0),
(26, 'b) Sucote, Meribá e Luz', 0),
(26, 'c) Betel, Jericó e Jordão', 1),
(26, 'd) Jerusalém, Cafarnaum e Mispa', 0),
(26, 'e) Tebas, Tiberíades e Sinai', 0);

-- QUESTÃO 27
INSERT INTO questions (id, question_text) VALUES (27, '"Sucedeu que, havendo eles passado, Elias disse a Eliseu: Pede-me o que queres que te faça, antes que seja tomado de ti. E disse Eliseu: Peço-te que haja porção dobrada de teu espírito sobre mim. E disse: Coisa difícil pediste; se me vires quando for tomado de ti, assim se te fará, porém, se não, não se fará." (2 Reis 2:9,10).\n\nSegundo a lição 7, tal pedido feito por Eliseu representava:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(27, 'a) O seu desejo de superar Elias, haja vista que sua idade era muito avançada.', 0),
(27, 'b) Demonstrar ousadia espiritual ao profeta antes de sua trasladação, para que ele estivesse tranquilo com respeito à sucessão no ministério profético', 0),
(27, 'c) O desejo altruísta de ser um autêntico discípulo de seu senhor', 1),
(27, 'd) A expectativa pelo surgimento de uma nova geração, capaz de ensinar a todos o que tudo dependia da permissão de Elias para autenticar Eliseu como profeta em seu lugar', 0),
(27, 'e) Apresentar aos expectadores que a nova geração de profetas é sempre mais capaz que a anterior, pela obsolescência do anterior e dupla capacidade do sucessor', 0);

-- QUESTÃO 28
INSERT INTO questions (id, question_text) VALUES (28, 'A Lição 7 ensina como Elias, na condição de um autêntico servo de Deus viveu. Antes de sua trasladação, Elias confronta Acabe, demonstrando no episódio que:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(28, 'a) Tinha uma mensagem, uma identidade e autoridade', 1),
(28, 'b) Tinha uma posição de controle social, uma perfeita concordância dos anciãos e uma unção diferenciada', 0),
(28, 'c) Tinha um vaso de barro a lançar sobre o sacrifício, uma espada e um discípulo', 0),
(28, 'd) Tinha um chifre de azeite, um pergaminho e uma trombeta', 0),
(28, 'e) Tinha um cutelo, um vaso de nardo puro e uma capa.', 0);
