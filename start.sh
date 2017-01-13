#!/bin/sh
sudo true

#Testes
echo '**************************'
echo '* Testando API com MOCHA *'
echo '**************************'
sudo npm test

#carrega API com pm2
echo '*************************************'
echo '* Carregando API com PM2 em Cluster *'
echo '*************************************'
sudo pm2 kill
sudo pm2 start npm --name "Api Tiny Url" -- run start -i max
sudo pm2 list

echo 'Api rodando na porta 3000'
echo 'Para mais detalhes dos processos rodando:'
echo '# sudo pm2 list'
echo '# sudo pm2 logs -l'
