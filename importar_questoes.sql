-- Script SQL para Inserção de Questões
-- Banco de Dados: u575119663_vest

USE u575119663_vest;

-- 1. Limpar questões antigas (OPCIONAL - Comente se quiser manter as atuais)
-- DELETE FROM questions;

-- QUESTÃO 1
INSERT INTO questions (id, question_text) VALUES (1, 'De acordo com as fontes, qual rei de Israel é considerado um dos piores e a personificação da iniquidade?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(1, 'Jeroboão', 0),
(1, 'Acabe', 1),
(1, 'Onri', 0),
(1, 'Zinri', 0);

-- QUESTÃO 2
INSERT INTO questions (id, question_text) VALUES (2, 'Qual é a origem geográfica do profeta Elias mencionada no texto?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(2, 'Samaria', 0),
(2, 'Jerusalém', 0),
(2, 'Gileade', 1),
(2, 'Jericó', 0);

-- QUESTÃO 3
INSERT INTO questions (id, question_text) VALUES (3, 'O que significa o nome próprio ''Elias'' segundo as fontes?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(3, 'O Senhor é meu pastor', 0),
(3, 'Jeová é Deus', 1),
(3, 'Deus é minha força', 0),
(3, 'Enviado de Deus', 0);

-- QUESTÃO 4
INSERT INTO questions (id, question_text) VALUES (4, 'No glossário das fontes, como é definida a palavra ''CICIO''?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(4, 'Vontade ou intenção de realizar algo', 0),
(4, 'Rumor brando, murmúrio de palavras em voz baixa', 1),
(4, 'Exemplo ou padrão a ser seguido', 0),
(4, 'Algo que é demasiadamente inclinado', 0);

-- QUESTÃO 5
INSERT INTO questions (id, question_text) VALUES (5, 'O que o ribeiro de Querite representa na trajetória de Elias?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(5, 'Um local de celebração pública', 0),
(5, 'Momentos de humilhação, aprendizado e treinamento diante do Senhor', 1),
(5, 'O centro do poder político de Israel', 0),
(5, 'O lugar onde Elias foi ungido rei', 0);

-- QUESTÃO 6
INSERT INTO questions (id, question_text) VALUES (6, 'Qual é o significado da tradução do nome ''Sarepta'' do hebraico?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(6, 'Casa de Pão', 0),
(6, 'Lugar de águas profundas', 0),
(6, 'Crisol ou lugar onde os metais são purificados pelo fogo', 1),
(6, 'Montanha Sagrada', 0);

-- QUESTÃO 7
INSERT INTO questions (id, question_text) VALUES (7, 'Em Sarepta, o que a viúva pobre aprendeu a priorizar segundo o estudo?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(7, 'Suas próprias necessidades imediatas', 0),
(7, 'A estocagem de suprimentos para a seca', 0),
(7, 'As coisas de Deus e o Seu profeta', 1),
(7, 'A aliança política com Jezabel', 0);

-- QUESTÃO 8
INSERT INTO questions (id, question_text) VALUES (8, 'No desafio do Monte Carmelo, qual era a condição estabelecida para identificar o verdadeiro Deus?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(8, 'Aquele que fizesse chover primeiro', 0),
(8, 'O Deus que respondesse com fogo consumindo o sacrifício', 1),
(8, 'Aquele que falasse mais alto através dos profetas', 0),
(8, 'O Deus que multiplicasse o azeite da botija', 0);

-- QUESTÃO 9
INSERT INTO questions (id, question_text) VALUES (9, 'A ação de Elias ao ''reparar o altar em ruínas'' simboliza o quê?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(9, 'A reconstrução física do templo de Salomão', 0),
(9, 'A santificação pessoal e a unidade', 1),
(9, 'Uma estratégia militar contra Acabe', 0),
(9, 'A aliança com os profetas de Baal', 0);

-- QUESTÃO 10
INSERT INTO questions (id, question_text) VALUES (10, 'Por que Elias sentiu medo e fugiu para o deserto após a vitória no Carmelo?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(10, 'Por causa da perseguição dos profetas de Baal', 0),
(10, 'Devido à fúria e ameaça de morte de Jezabel', 1),
(10, 'Porque Deus ordenou que ele se escondesse novamente', 0),
(10, 'Pelo cansaço físico da caminhada até Jezreel', 0);

-- QUESTÃO 11
INSERT INTO questions (id, question_text) VALUES (11, 'O que o anjo do Senhor forneceu a Elias para que ele pudesse caminhar até Horebe?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(11, 'Um cavalo e uma carruagem', 0),
(11, 'Uma espada e um escudo de ouro', 0),
(11, 'Um pão cozido sobre pedras em brasa e uma botija de água', 1),
(11, 'Maná e mel silvestre', 0);

-- QUESTÃO 12
INSERT INTO questions (id, question_text) VALUES (12, 'Segundo as fontes, o Monte Horebe também é conhecido como:');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(12, 'Monte Carmelo', 0),
(12, 'Monte Sinai', 1),
(12, 'Monte Hermom', 0),
(12, 'Monte das Oliveiras', 0);

-- QUESTÃO 13
INSERT INTO questions (id, question_text) VALUES (13, 'Como Deus se manifestou a Elias no Monte Horebe, após o vento, o terremoto e o fogo?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(13, 'Através de uma voz de trovão', 0),
(13, 'Em um cicio tranquilo e suave', 1),
(13, 'Por meio de uma visão de anjos', 0),
(13, 'Através de uma nova coluna de fogo', 0);

-- QUESTÃO 14
INSERT INTO questions (id, question_text) VALUES (14, 'Qual foi uma das novas ordens dadas por Deus a Elias em Horebe?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(14, 'Construir um novo altar no deserto', 0),
(14, 'Ungir Hazael como rei da Síria e Jeú como rei de Israel', 1),
(14, 'Retornar para o ribeiro de Querite', 0),
(14, 'Pedir fogo do céu contra os samaritanos', 0);

-- QUESTÃO 15
INSERT INTO questions (id, question_text) VALUES (15, 'Como o apóstolo Tiago descreve a natureza de Elias?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(15, 'Um semideus imortal', 0),
(15, 'Um homem sujeito às mesmas paixões que nós', 1),
(15, 'Um anjo em forma de homem', 0),
(15, 'Um profeta sem pecados ou falhas', 0);

-- QUESTÃO 16
INSERT INTO questions (id, question_text) VALUES (16, 'O que as conquistas de Elias através da oração provam, segundo o texto?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(16, 'Que ele possuía poderes mágicos', 0),
(16, 'Que a oração de um justo é poderosa e eficaz', 1),
(16, 'Que apenas profetas podem falar com Deus', 0),
(16, 'Que Deus responde apenas a orações feitas em montes', 0);

-- QUESTÃO 17
INSERT INTO questions (id, question_text) VALUES (17, 'O que significa o nome ''Jordão'' (hebraico yarden) mencionado na lição sobre a trasladação?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(17, 'Aquele que sobe', 0),
(17, 'Aquele que desce', 1),
(17, 'Lugar de vitória', 0),
(17, 'Rio de águas claras', 0);

-- QUESTÃO 18
INSERT INTO questions (id, question_text) VALUES (18, 'Qual cidade representa, na jornada de Elias, o início de uma caminhada de fé e esperança?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(18, 'Betel', 0),
(18, 'Jericó', 0),
(18, 'Gilgal', 1),
(18, 'Berseba', 0);

-- QUESTÃO 19
INSERT INTO questions (id, question_text) VALUES (19, 'Qual foi o pedido feito por Eliseu a Elias antes deste ser tomado ao céu?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(19, 'A capa de profeta', 0),
(19, 'Porção dobrada do espírito de Elias', 1),
(19, 'Riquezas e honras em Israel', 0),
(19, 'A permissão para voltar para casa', 0);

-- QUESTÃO 20
INSERT INTO questions (id, question_text) VALUES (20, 'Como Elias foi levado ao céu segundo as Escrituras citadas?');
INSERT INTO question_options (question_id, option_text, is_correct) VALUES 
(20, 'Em uma nuvem de glória', 0),
(20, 'Pelas mãos de dois anjos', 0),
(20, 'Num redemoinho, com um carro de fogo e cavalos de fogo', 1),
(20, 'Através de uma escada que chegava ao céu', 0);
