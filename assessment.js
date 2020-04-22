'use strict';　//エラーを教えてくれる（厳格モードを使う）
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 * 
 */
function removeAllChildren(element){
   while(element.firstChild){
      element.removeChild(element.firstChild);
   }
}

assessmentButton.onclick = () => {   //アロー関数
   const userName = userNameInput.value;
   if(userName.length === 0){  //名前が空の時は
      return;　　//処理を終了する（ガード句）
   }
removeAllChildren(resultDivided); //子要素を消す

   //HTMLを足していく
   const header = document.createElement('h3');
   header.innerText = '診断結果';
   resultDivided.appendChild(header);

   const paragraph = document.createElement('p');
   const result = assessment(userName);
   paragraph.innerText = result;
   resultDivided.appendChild(paragraph);

removeAllChildren(tweetDivided);

   const anchor = document.createElement('a');
   const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('あなたのいいところ')
      + '&ref_src=twsrc%5Etfw';

   anchor.setAttribute('href', hrefValue)
   anchor.className = 'twitter-hashtag-button';
   anchor.setAttribute('data-text', result);
   anchor.innerText = 'Tweet #あなたのいいところ';
   tweetDivided.appendChild(anchor);

   //wigeds.jsの設定
   const script = document.createElement('script');
   script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
   tweetDivided.appendChild(script);
};

userNameInput.onkeydown =(event) => {
   if(event.key === 'Enter'){
      assessmentButton.onclick();
   }
};

const answers =[　
   '{userName}のいいところは声です。{userName}の声は皆を惹きつけ、心に残ります。',
   '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう',
   '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
   '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
   '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
   '{userName}のいいところは声です。{userName}の声は皆を惹きつけ、心に残ります。',
   '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
   '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
   '{userName}のいいところは見た目です。内側からあふれ出る{userName}の良さに皆が気を惹かれます。',
   '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられている人がいます。',
   '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
   '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
   '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
   '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
   '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
   '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName ユーザーの名前
 * @return{string}診断結果
 */

function assessment(userName){
   //全文字のコード番号を取得してそれを足し合わせる
   let sumOfCharCode = 0;
   for(let i=0; i<userName.length; i++){
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i); 
   }
   //文字のコード番号の合計を回答の数で割って添え字の数値を求める
   const index = sumOfCharCode % answers.length;
   let result = answers[index];
   result = result.replace(/\{userName\}/g,userName); //resultの文章の中から{userName}を検索しユーザー名に置き換える
   
   return result;
}
//テストコード
console.assert(
   assessment('太郎')===assessment('太郎'),
   '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)
