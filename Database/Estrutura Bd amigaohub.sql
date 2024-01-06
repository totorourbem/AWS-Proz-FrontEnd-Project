ATTACH DATABASE '/home/ricardojfrancisco/Documentos/Projetos/Prow-AWS DB/amigaohub.db' AS amigaohub;

CREATE TABLE contratante (
    contratante_id INTEGER       PRIMARY KEY AUTOINCREMENT,
    nome           VARCHAR (255) NOT NULL,
    email          VARCHAR (255) NOT NULL
                                 UNIQUE,
    fone       NUMERIC (11)  NOT NULL
                                 UNIQUE,
    avatar         TEXT          NOT NULL
);

CREATE TABLE prestador 
(
    prestador_id	INT PRIMARY KEY,
    nome	VARCHAR(512),
    email	VARCHAR(512) NOT NULL
                             UNIQUE,
    fone	INT NOT NULL
                             UNIQUE,
    especialidade	VARCHAR(512) NOT NULL,
    avatar	VARCHAR(512) NOT NULL,
    nota_media  NUMERIC 
);

CREATE TABLE avaliacao (
    avaliacao_id    INTEGER,
    avaliador_id    INTEGER NOT NULL,
    avaliado_id     INTEGER NOT NULL,
    nota_avaliacao  INTEGER NOT NULL,
    avaliacao_texto TEXT    NOT NULL,
    FOREIGN KEY (
        avaliador_id
    )
    REFERENCES contratante (contratante_id),
    FOREIGN KEY (
        avaliado_id
    )
    REFERENCES prestador (prestador_id) 
);

