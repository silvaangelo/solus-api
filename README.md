# solus-api

Solus é uma aplicação desenvolvida como trabalho de conclusão de curso para Análise e Desenvolvimento de Sistemas no IFSP Câmpus Boituva.
O objetivo do projeto é realizar a análise estatística de dados meteorológicos, capturados através de sensores ligados a um microcontrolador arduino.

Este repositório contem a api do TCC, caso você queira visualizar a documentação do projeto acesse:

[https://github.com/r6d6/solus](https://github.com/r6d6/solus-doc)

## Receita

Certifique-se de que você possui o php instalado com as dependências:

- PHP >= 7.1.3
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension

Instale as dependências com o comando:

```
composer install
```

Você pode rodar a api utilizando o servidor embutido do php:

```
php -S localhost:8000 -t public
```
