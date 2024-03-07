import {
  Chessboard
} from '@chesslablab/cmblab';
import {
  databaseAnnotatedGames,
  ravMovesTable
} from '../../../js/base/rav/init.js';
import * as env from '../../../env.js';
import * as variant from '../../../variant.js';

ravMovesTable.domElem();

const handleClick = (game) => {
  fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/play/rav`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      variant: variant.CLASSICAL,
      movetext: game.movetext,
    })
  })
  .then(res => res.json())
  .then(res => {
    ravMovesTable.props.chessboard.setPosition(res.fen[res.fen.length - 1]);
    ravMovesTable.props = {
      filtered: res.filtered,
      breakdown: res.breakdown,
      fen: res.fen
    };
    ravMovesTable.domElem();
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    // TODO
  });
};

await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/annotations/games`, {
  method: 'GET',
  headers: {
    'X-Api-Key': `${env.API_KEY}`
  }
})
.then(res => res.json())
.then(res => {
  databaseAnnotatedGames.modal.show();
  const tbody = databaseAnnotatedGames.form.getElementsByTagName('tbody')[0];
  tbody.replaceChildren();
  res.games.forEach(game => {
    const tr = document.createElement('tr');
    const eventTd = document.createElement('td');
    const eventText = document.createTextNode(game.Event);
    const roundTd = document.createElement('td');
    const roundText = document.createTextNode(game.Round);

    const yearTd = document.createElement('td');
    const yearText = document.createTextNode(game.Date);

    const ecoTd = document.createElement('td');
    const ecoText = document.createTextNode(game.ECO);
    const whiteTd = document.createElement('td');
    const whiteText = document.createTextNode(game.White);
    const whiteEloTd = document.createElement('td');
    const whiteEloText = document.createTextNode(game.WhiteElo);
    const blackTd = document.createElement('td');
    const blackText = document.createTextNode(game.Black);
    const blackEloTd = document.createElement('td');
    const blackEloText = document.createTextNode(game.BlackElo);
    const resultTd = document.createElement('td');
    const resultText = document.createTextNode(game.Result);

    eventTd.appendChild(eventText);
    roundTd.appendChild(roundText);
    yearTd.appendChild(yearText);

    ecoTd.appendChild(ecoText);
    whiteTd.appendChild(whiteText);
    whiteEloTd.appendChild(whiteEloText);
    blackTd.appendChild(blackText);
    blackEloTd.appendChild(blackEloText);
    resultTd.appendChild(resultText);

    tr.appendChild(eventTd);
    tr.appendChild(roundTd);
    tr.appendChild(yearTd);
    tr.appendChild(ecoTd);
    tr.appendChild(whiteTd);
    tr.appendChild(whiteEloTd);
    tr.appendChild(blackTd);
    tr.appendChild(blackEloTd);
    tr.appendChild(resultTd);

    tr.addEventListener('click', event => {
      handleClick(game);
      databaseAnnotatedGames.modal.hide();
    });

    tbody.appendChild(tr);
  });
});
