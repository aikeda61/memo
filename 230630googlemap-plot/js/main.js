window.addEventListener('load',function(){



    var markerData_1= [];
    var markerData_2= [];
    var markerData_3= [];
    var markerData_4= [];
    var markerData_5= [];
    var markerData_6= [];
    var markerData_7= [];

    var mapstab=1;
    var map;
    var marker = [];
    var infoWindow = [];
    var marker0 ;

    var markerData_A;

    setTimeout(function () {
        csv0();
    }, 300);

    function initMap_1(){

        for (var i = 0; i < markerData_A.length; i++) {
            var tempobj =  {
                cname: markerData_A[i][0],
                name: markerData_A[i][1],
                lat: Number(markerData_A[i][5]),
                lng: Number(markerData_A[i][6]),
                icon: './img/house.png',
                info1:markerData_A[i][2],
                info2:markerData_A[i][3],
                info3:markerData_A[i][4]
            };
            switch(markerData_A[i][0]){
                case '商業施設':
                    markerData_1.push(tempobj);
                    break;
                case '公共機関':
                    markerData_2.push(tempobj);
                    break;
                case '金融機関':
                    markerData_3.push(tempobj);
                    break;
                case '医療施設':
                    markerData_4.push(tempobj);
                    break;
                case '公園・レジャー施設':
                    markerData_5.push(tempobj);
                    break;
                case '教育施設':
                    markerData_6.push(tempobj);
                    break;
            }
            // text.push('<li>' + arr[i] + '</li>');
        }

        var latlng1 = new google.maps.LatLng(32.741101,129.871906);
        var gmapop1 = {
            zoom: 15,
            center: latlng1,
            styles : [
                {
                    stylers : [
                        {
                            'saturation' : -90,
                            'hue' : '#88847d'
                        }
                    ]
                }
            ]
        };
        map = new google.maps.Map(document.getElementById('js-access-map'), gmapop1);
        marker0 = new google.maps.Marker({
            position: new google.maps.LatLng(32.741101,129.871906),
            // zIndex: 99 ,
            icon:
                new google.maps.MarkerImage(
                    './img/house.png',
                    // new google.maps.Size(180, 105),
                    new google.maps.Size(140, 82),
                    new google.maps.Point(0,0),
                    // new google.maps.Point(25,82)
                )
            map: map
        });
        $('.stab').addClass('s1');
        setmarker(mapstab);
    }

    $('.stab li').on('click', function () {
        var a = $(this).attr('rel');
        $('.stab').removeClass('s1 s2 s3 s4 s5 s6 s7');
        $('.stab').addClass('s'+a);
        $('.moreinfo ul').html('');

        switch (a) {
            case '1':
                mapstab=1;
                break;
            case '2':
                mapstab=2;
                break;
            case '3':
                mapstab=3;
                break;
            case '4':
                mapstab=4;
                break;
            case '5':
                mapstab=5;
                break;
            case '6':
                mapstab=6;
                break;
            case '7':
                mapstab=7;
                break;
        }
        setmarker(mapstab);
    });





    function markerEvent(i) {
        
        marker[i].addListener('click', function() {

            //　地図上のアイコン
            for(var j = 0; j < infoWindow.length; j++){
                infoWindow[j].close() ;
            };

            infoWindow[i].open(map, marker[i]);

            let mmcenter = new google.maps.LatLng( tempdat[i]['lat'], tempdat[i]['lng'] );
            map.panTo(mmcenter);

        });

        $('#more_'+i).on('click', function() {

            //　右の施設リスト
            console.log('click!!')
            for(var j = 0; j < infoWindow.length; j++){
                infoWindow[j].close() ;
            };

            infoWindow[i].open(map, marker[i]);
            let mmcenter = new google.maps.LatLng( tempdat[i]['lat'], tempdat[i]['lng'] );
            map.panTo(mmcenter);

        });

        
        
    }

    function mmov(lat,lang){
        var movePos = new google.maps.LatLng( lat,lang );
        map.panTo(movePos);
    }

    function setmarker(mapi){
        for (var i = 0; i < marker.length; i++) {
            //marker[i].removeEventListener("click");
            marker[i].setMap(null);
        }

        switch (mapi) {
            case 1:
                tempdat = markerData_1;
                break;
            case 2:
                tempdat = markerData_2;
                break;
            case 3:
                tempdat = markerData_3;
                break;
            case 4:
                tempdat = markerData_4;
                break;
            case 5:
                tempdat = markerData_5;
                break;
            case 6:
                tempdat = markerData_6;
                break;
            case 7:
                tempdat = markerData_7;
                break;
        }

        for (var i = 0; i < tempdat.length; i++) {

            tempdat[i]['info3'] = tempdat[i]['info3'].replace(/、/g, ',');

            var  markerLatLng = new google.maps.LatLng({lat: tempdat[i]['lat'], lng: tempdat[i]['lng']});
            marker[i] = new google.maps.Marker({
                position: markerLatLng,
                animation: google.maps.Animation.DROP,
                map: map ,
                icon: {
                    // url: 'images/position/pin/'+mapi+'_'+(i+1)+'.png',
                    url: './img/num_'+(i+1)+'.png',
                    // scaledSize : new google.maps.Size(40, 53)
                    scaledSize : new google.maps.Size(30, 30)
                }
            });
            infoWindow[i] = new google.maps.InfoWindow({
                content: '<div class="gmapf"><h4 style="background-color: #877F64;color: #fff;margin: 0px;text-align: center; padding-left: 10px;padding-right: 10px;">' + tempdat[i]['name'] + '</h4><p style="color: #000;">' + tempdat[i]['info1'] + tempdat[i]['info2'] + '分(約'+tempdat[i]['info3'] +'m)</p></div>'
            });

            // $('.moreinfo ul ').append('<li id="more_'+i+'"><dl><dt><img src="images/position/pin/'+mapi+'_'+(i+1)+'.png"></dt><dd><h4>' + tempdat[i]['name'] + '</h4><p>' + tempdat[i]['info1'] + tempdat[i]['info2'] + '分(約'+tempdat[i]['info3'] +'m)</p></dd></dl></li>');
            $('.moreinfo ul ').append('<li id="more_'+i+'"><dl><dt><img src="./img/num_'+(i+1)+'.png"></dt><dd><h4>' + tempdat[i]['name'] + '</h4><p>' + tempdat[i]['info1'] + tempdat[i]['info2'] + '分(約'+tempdat[i]['info3'] +'m)</p></dd></dl></li>');
            markerEvent(i);
        }
        map.panTo(new google.maps.LatLng(32.741101, 129.871906));
    }

    function hiddenAll() {
        for(let i = 0; i < infobox.length; i++) {
            infobox[i].close(map);
        }
    }


    function csv0() {
        $.ajax({
            url:'./csv.csv',
            type:'get',
            dataType:'text',
            cache:false,
            success: function(data){
                var temparr = [];
                var lines = data.split("\n");
                for (var i = 0; i < lines.length; ++i) {
                    var col = lines[i].split(",");
                    if (col.length != 1) {
                        temparr.push(col);
                    }
                }
                //console.log(temparr);
                markerData_A =temparr;
                initMap_1();
                // return temparr;
            }
        });
    }







    // function googleMap() {
    //     var latlng = new google.maps.LatLng(32.7386118,129.8691407);/* 座標を入れる */
    //     var myOptions = {
    //         zoom: 15, /*拡大比率 値が大きいと詳細に表示され、値が小さいと俯瞰*/
    //         // scrollwheel: false, /* スクロールを無効化 */
    //         streetViewControl:false, /*ストリートビューを表示させない*/
    //         center: latlng, /*表示枠内の中心を軸にする*/
    //         mapTypeControlOptions: { mapTypeIds: ['style', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
    //     };
    //     var map = new google.maps.Map(document.getElementById('js-access-map'), myOptions);
    //     /*アイコン設定*/
    //     var markerOptions = {
    //         position: latlng,
    //         map: map,
    //         icon: {
    //             url: './img/tower.png', /*アイコンまでのパス*/
    //             scaledSize : new google.maps.Size(40, 40) /*アイコンのサイズ*/
    //         },
    //         title: 'サンプルタイトル',/*タイトル*/
    //         //animation: google.maps.Animation.DROP /*アニメーションしたいなら*/
    //     };
    //     var marker = new google.maps.Marker(markerOptions);
    //     /*地図の表示をカスタマイズ 以下は白黒の例*/
    //     var styleOptions = [
    //         {
    //             // 'stylers': [
    //             //     {
    //             //     'gamma': 0.8
    //             //     },
    //             //     {
    //             //     'saturation': -100
    //             //     },
    //             //     {
    //             //     'lightness': 20
    //             //     }
    //             // ]
    //         }
    //     ];
    //     var styledMapOptions = { name: 'サンプル' }/*地図左上のタイトル*/
    //     var originalType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
    //     map.mapTypes.set('style', originalType);
    //     map.setMapTypeId('style');
    // };

    // google.maps.event.addDomListener(window, 'load', function() {
    //     googleMap();
    // });






})