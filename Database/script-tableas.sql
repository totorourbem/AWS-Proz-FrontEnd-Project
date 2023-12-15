ATTACH DATABASE 'C:\Users\ricardojfrancisco\Documents\AWS-Proz-FrontEnd-Project\Database\cdastro' AS cadastro;

CREATE TABLE contratante (
    contratante_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone NUMERIC(11) NOT NULL UNIQUE
);

CREATE TABLE prestador (
    prestador_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone NUMERIC(11) NOT NULL UNIQUE,
    nota INT
);

CREATE TABLE avaliacao (
    avaliacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    avaliador_id INTEGER NOT NULL,
    avaliado_id INTEGER NOT NULL,
    nota_avaliacao INTEGER NOT NULL,
    FOREIGN KEY (avaliador_id) REFERENCES contratante(contratante_id),
    FOREIGN KEY (avaliado_id) REFERENCES prestador(prestador_id)
);    