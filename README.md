# ENEM 2027

Painel interativo de acompanhamento do cronograma de estudos: checklist por assunto, progresso geral e por semana, busca e salvamento local no navegador.

## Publicação
Em **Settings → Pages**, selecione **GitHub Actions** como fonte. O workflow publica automaticamente a cada atualização da branch main.

URL esperada: https://joaovictoraredes.github.io/enem.2027/

## Dados do cronograma
O arquivo `schedule-data.js` define `window.STUDY_PLAN`, com cinco fases, semanas e assuntos. As marcações ficam no localStorage do navegador.
