#!/bin/sh
sudo true

#atualiza pacotes linux
echo '**************************************'
echo '* Instalando atualizações de pacotes *'
echo '**************************************'
sudo apt-get update
export LC_ALL="en_US.UTF-8"
clear

#compilador c++
echo '****************************************************************'
echo '* Instalando compilador GNU C++ e Secure Sockets Layer toolkit *'
echo '****************************************************************'
sudo apt-get install build-essential libssl-dev
clear

#GIT
echo '********************'
echo '*  Instalando GIT  *'
echo '********************'
sudo apt-get install git
clear

#NPM
echo '********************'
echo '*  Instalando NPM  *'
echo '********************'
sudo apt-get install npm
clear

#nodejs stable
echo '*********************'
echo '* Instalando NodeJs *'
echo '*********************'
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
clear

#pm2
echo '********************************************'
echo '* Instalando Gerenciador de Processos - PM2 *'
echo '********************************************'
sudo npm install pm2 -g

#mongoDB
echo '**********************'
echo '* Instalando MongoDB *'
echo '**********************'
sudo apt-get install mongodb-server
sudo apt-get install mongodb-clients
sudo pm2 install pm2-mongodb
clear

#download api
echo '***********************************'
echo '* Clonando API Tiny URl do Github *'
echo '***********************************'
sudo git clone https://github.com/brab0/api-tiny-url.git
cd api-tiny-url

#download api
echo '**************************************'
echo '* Instalando Dependências do projeto *'
echo '**************************************'
sudo npm install
sudo npm install-dev
clear

#fim da instalação
echo '***********************'
echo '* Instalação Completa *'

chmod +x start.sh
./start.sh
