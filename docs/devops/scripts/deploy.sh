#!/bin/bash

#############################################
# Visite Caçapava - Script de Deploy
# © 2025 Oryum Tech. Todos os direitos reservados.
#############################################

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funções de log
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Variáveis
ENVIRONMENT=${1:-"preview"}
PROJECT_DIR=$(pwd)

#############################################
# Verificações Pré-Deploy
#############################################

log_info "Iniciando processo de deploy para: $ENVIRONMENT"

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    log_error "package.json não encontrado. Execute do diretório raiz do projeto."
    exit 1
fi

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    log_warn "node_modules não encontrado. Instalando dependências..."
    npm ci
fi

# Verificar variáveis de ambiente
if [ -z "$VERCEL_TOKEN" ]; then
    log_error "VERCEL_TOKEN não definido."
    exit 1
fi

#############################################
# Build
#############################################

log_info "Executando build..."
npm run build

if [ $? -ne 0 ]; then
    log_error "Build falhou!"
    exit 1
fi

log_info "Build concluído com sucesso."

#############################################
# Testes (quando implementados)
#############################################

# log_info "Executando testes..."
# npm test
# if [ $? -ne 0 ]; then
#     log_error "Testes falharam!"
#     exit 1
# fi

#############################################
# Deploy
#############################################

log_info "Iniciando deploy para $ENVIRONMENT..."

if [ "$ENVIRONMENT" == "production" ]; then
    log_warn "Deploy de PRODUÇÃO. Confirmar? (y/n)"
    read -r confirm
    if [ "$confirm" != "y" ]; then
        log_info "Deploy cancelado."
        exit 0
    fi
    vercel --prod --token "$VERCEL_TOKEN"
else
    vercel --token "$VERCEL_TOKEN"
fi

if [ $? -ne 0 ]; then
    log_error "Deploy falhou!"
    exit 1
fi

#############################################
# Pós-Deploy
#############################################

log_info "Deploy concluído com sucesso!"

# Verificar saúde do deploy
log_info "Verificando saúde da aplicação..."
sleep 5

DEPLOY_URL=$(vercel ls --token "$VERCEL_TOKEN" | head -2 | tail -1 | awk '{print $2}')
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DEPLOY_URL")

if [ "$HTTP_STATUS" == "200" ]; then
    log_info "Aplicação respondendo corretamente (HTTP $HTTP_STATUS)"
else
    log_warn "Aplicação retornou HTTP $HTTP_STATUS"
fi

log_info "URL do deploy: https://$DEPLOY_URL"

#############################################
# Notificação (opcional)
#############################################

# Enviar notificação para Slack
# if [ -n "$SLACK_WEBHOOK_URL" ]; then
#     curl -X POST -H 'Content-type: application/json' \
#         --data "{\"text\":\"Deploy $ENVIRONMENT concluído: https://$DEPLOY_URL\"}" \
#         "$SLACK_WEBHOOK_URL"
# fi

log_info "Processo de deploy finalizado."
