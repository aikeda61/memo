<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <main>

        <div id="thoughtsContent"></div>
        <a href="" id="thoughtsBtn">もっと見る</a>

    </main>

    <script>
        
    $(function(){

        // contents　取得処理
        let ajaxUrl = '<?php echo esc_url( admin_url( 'admin-ajax.php', __FILE__ ) ); ?>';
        $.ajax({
            type: 'POST',
            url: ajaxUrl,
            data: {
                'action' : 'thoughts',
                //actionには、CPT-UIで作成したスラッグ名を記入
            },
            success: function( response ) {

                // contentsNumは、plusNumより1大きい数字にする
                // defaultNumは最初に表示したい数より1つ小さい数にする
                // plusNumは、増やしたい数より1つ小さい数にする
                let defaultNum = 4,
                    plusNum = 2,
                    contentsNum = 3,
                    block = 'section01'

                // contentsを取得する関数
                function getContents(num=defaultNum){

                    // システム読めれるように、データ再構造
                    let datas = JSON.parse(response)
                    
                    // サイトにデータを表示
                    datas.forEach( (element, index) => {

                        if( index > num ) return false

                        thoughtsContent.innerHTML += `
                            <div class="${block}">
                                <div class="el01-exambox">
                                    <figure><img src="${element['image']}" alt=""></figure>
                                    <div>
                                        <p>${element['text']}</p>
                                        <p><span>${element['title']}</span>さん(${element['course']})</p>
                                    </div>
                                </div>
                            </div>
                        `
                    })
                }
                
                // default処理
                getContents()

                // contentsをボタンを押すたびに取得する処理
                thoughtsBtn.onclick = (e) => {
                    e.preventDefault()
                    let p = thoughtsContent.querySelectorAll(`.${block}`)
                    thoughtsContent.innerHTML = ""
                    getContents(p.length + plusNum)

                    // contents全部取得したら、もっと見るボタン消す
                    if( JSON.parse(response).length === p.length + contentsNum ) thoughtsBtn.remove()
                    else return true
                }
            }
        })
    })
</script>

</body>
</html>


