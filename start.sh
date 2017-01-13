#!/bin/sh
sudo true

#Testes
echo '**************************'
echo '* Testando API com MOCHA *'
echo '**************************'
sudo npm test

#carrega API com pm2
echo '**************************'
echo '* Carregando API com PM2 *'
echo '**************************'
sudo pm2 kill
sudo pm2 start npm --name "Api Tiny Url" -- run start
# para rodar em cluster utilizando todos os processadores:
# sudo pm2 start npm --name "Api Tiny Url" -- run start -i max
sudo pm2 list

echo 'Para mais detalhes dos processos rodando:'
echo '# sudo pm2 list'
echo '# sudo pm2 logs'
