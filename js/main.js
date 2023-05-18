const textarea = document.querySelector("textarea"),
        playBtn = document.querySelector(".basic"),
        copyBtn = document.querySelector(".copy");

        let value = document.querySelector(".value");

            playBtn.addEventListener("click", (e) => {
                let buttonTpye = e.target.className;
                let css = textarea.value;


                function sortCSS(css) {
                    // CSS 파싱
                    let slidecss = css.replace(/\n/g,'').replace(/    /g,'').replace(/^\s+|\s+$/gm,'').split("@");
                    let cssKuting = [];
                    const slicsKut = [];
                    let wowSlice = [];
                    let lastSlice = [];
                    let last2Slice = [];
                    const last3Slice = [];

                    let sliceLine = [];
                    let checkLine = [];
                    let listUpLine = {};
                    let listUpObject = [];

                    // 속성 이름에 따라 정렬
                    const propertyOrder = [
                        "display", "visibility", "overflow", "float", "clear", "position", "top", "right", "bottom", "left",
                        "zindex", "width", "height", "margin", "margin-top","margin-right","margin-bottom","margin-left",
                        "padding", "padding-top","padding-right","padding-bottom","padding-left","border","border-top","border-right",
                        "border-bottom","border-left", "background","background-image","background-position","background-size",
                        "background-repact", "font","font-family","font-size","font-weight","color", "letter-spacing", "text-align",
                        "text-decoration", "text-indent", "verticalalign", "white-space","line-height","Animation","animation-delay",
                        "animation-duration","animation-direction"
                    ];

                    let slicsCss = slidecss.map((asd)=>{
                        return asd.split("}}");
                    })
                    for(i=1; i <= slicsCss.length; i++){
                        for(z=1; z <= slicsCss[i-1].length; z++){
                            if(slicsCss[i-1][z-1] !== "") {
                                cssKuting.push(slicsCss[i-1][z-1]);
                            }
                        }
                    }

                    for (const slideTest of cssKuting) {
                        if (slideTest.includes('keyframes') || slideTest.includes('media')) {   // 따로 빼낼 css 라인
                            slicsKut.push(slideTest);
                        }else if(slideTest.includes('import') || slideTest.includes('charset')){
                            alert("import 또는 charset 은 지원하지 않습니다. 제외 후 다시 실행해주세요")
                        }else {
                            const cssSlice = slideTest.split("}");
                            slicsKut.push(cssSlice);
                        }
                    }

                    for(i=1; i <= slicsKut.length; i++){
                        if(Array.isArray(slicsKut[i-1]) === true){
                            for(z=1; z <= slicsKut[i-1].length; z++){
                                if(slicsKut[i-1][z-1] !== "") {
                                    wowSlice.push(slicsKut[i-1][z-1]);
                                }
                            }
                        }else   {
                            wowSlice.push(slicsKut[i-1]);
                        }
                    }

                    wowSlice.forEach((asd)=>{
                        let aa = asd.split("}");
                        lastSlice.push(aa);
                    })

                    for(i=1;i <= lastSlice.length; i++){
                        sliceLine = [];
                        if(lastSlice[i-1].length >= 2){
                            for(z=1; z <= lastSlice[i-1].length; z++){
                                sliceLine.push(lastSlice[i-1][z-1].split(";")) 
                            }
                            last2Slice.push(sliceLine);
                        }else{
                            sliceLine = lastSlice[i-1][0].split(";");
                            last2Slice.push(sliceLine);
                        }
                    }

                    for (i = 1; i <= last2Slice.length; i++) {
                        sliceLine = [];
                        if (last2Slice[i - 1].length >= 2) {
                            for (z = 1; z <= lastSlice[i - 1].length; z++) {
                            const splitLine = lastSlice[i - 1][z - 1].split("{");
                            const checkLine = [];
                            for (let j = 0; j < splitLine.length; j++) {
                                const line = splitLine[j];
                                if (line.indexOf(';') >= 0) {
                                const subLines = line.split(';');
                                for (let k = 0; k < subLines.length; k++) {
                                    if (subLines[k].trim().length > 0) {
                                    checkLine.push(subLines[k]);
                                    }
                                }
                                } else {
                                checkLine.push(line);
                                }
                            }
                            sliceLine.push(checkLine);
                            }
                            last3Slice.push(sliceLine);
                        } else {
                            sliceLine = last2Slice[i - 1]
                            last3Slice.push(sliceLine);
                        }
                    }

                    for(i=1;i <= last3Slice.length; i++){
                        let listUpLine = []; // listUpLine 초기화
                        if(last3Slice[i-1].length >= 2){
                            for(z=1; z <= last3Slice[i-1].length; z++){
                                for(a=1; a <= last3Slice[i-1][z-1].length; a++){
                                    if(last3Slice[i-1][z-1][a-1].indexOf('keyframes')  > -1){
                                        if(a <= 1 ){
                                            listUpLine.push(`${last3Slice[i-1][z-1][0]} `);
                                        }
                                    }else if(last3Slice[i-1][z-1][a-1].indexOf('media')  > -1){
                                        if(a <= 1 ){
                                            listUpLine.push(`${last3Slice[i-1][z-1][0]} {`);
                                        }
                                    }else if(last3Slice[i-1][z-1][a-1].indexOf('import')  > -1){
                                        if(a <= 1 ){
                                            listUpLine.push(`${last3Slice[i-1][z-1][0]} \n`);
                                        }
                                    }else{
                                        
                                        if(last3Slice[i-1][z-1][a-1].indexOf(':')  > -1){
                                            const cssPropertyArray = last3Slice[i-1][z-1][a-1].split(':');
                                            const property = cssPropertyArray[0].trim();
                                            const value = cssPropertyArray[1].trim();
                                            let rank = propertyOrder.indexOf(property);

                                            // 속성이 propertyOrder에 없을 경우
                                            if (rank === -1) {
                                                rank = propertyOrder.length + a;
                                            }

                                            const cssObject = {
                                                rank,
                                                key: property,
                                                value,
                                            };

                                            // listUpLine 배열에 push
                                            listUpLine.push(cssObject);
                                        }else{
                                            listUpLine.push(`${last3Slice[i-1][z-1][a-1]}`);
                                        }

                                    }
                                }
                            }
                            listUpObject.push([...listUpLine]); // listUpLine 배열을 복사하여 추가


                        } else {
                            if( Array.isArray(last3Slice[i-1][0][z-1]) === true){
                            } else {
                                for(z=1;z <= last3Slice[i-1][0].length; z++){
                                    if(Array.isArray(last3Slice[i-1][0])=== false)  { // 이 부분임
                                        if(z <= 1) {
                                            listUpLine.push(`${last3Slice[i-1][0]}} \n`);
                                        }
                                    }else if(z-1 === 0 && last3Slice[i-1][0][z-1] !== '/'){   // 주석 거르기 및 맨 처음 선택자 고르기
                                        listUpLine.push(`${last3Slice[i-1][0][z-1]} {`);
                                        //console.dir(last3Slice[i-1][0]);
                                    } else if(last3Slice[i-1][0][0] === '/'){  // 주석처리
                                        if(z <= 1){
                                            listUpLine.push(`${last3Slice[i-1][0]}`);
                                        }
                                    } else if(last3Slice[i-1][0][0].indexOf('media') > -1){  // 짧은 미디어 처리
                                        listUpLine.push(`${last3Slice[i-1][0][z-1]}`);
                                    } else   {   // 실제 css 처리 과정
                                        const cssPropertyArray = last3Slice[i-1][0][z-1].split(':');
                                        const property = cssPropertyArray[0].trim();
                                        let value = '';
                                        if(cssPropertyArray[1] === undefined) {
                                            value = "none";
                                        }else{
                                            value = cssPropertyArray[1].trim();
                                        }
                                        let rank = propertyOrder.indexOf(property);

                                        // 속성이 propertyOrder에 없을 경우
                                        if (rank === -1) {
                                            rank = propertyOrder.length + z;
                                        }

                                        let cssObject = {}; // 초기화

                                        if(value === "none")    {
                                            cssObject = `${last3Slice[i-1][0]}}`;
                                            console.dir(last3Slice[i-1][0]);
                                        }else   {
                                            cssObject = {
                                                rank,
                                                key: property,
                                                value,
                                            };
                                        }

                                        // listUpLine 배열에 push
                                        listUpLine.push(cssObject);
                                    }
                                }
                                listUpObject.push([...listUpLine]); // listUpLine 배열을 복사하여 추가
                            }
                        }
                    }
                    
                    let valueLine = '';

                    for(i=0;i < listUpObject.length; i++){  // 전체 css 량
                        let keyframesList = [];
                        for(x=0; x < listUpObject[i].length; x++){ // 전체중 한 라인의 객체량
                            if(listUpObject[i][0].indexOf("media") > -1){   // 미디어 쿼리 처리
                                if(listUpObject[i][x].constructor.toString().indexOf("Object") === -1){
                                    if(x <  1){
                                        valueLine += `${listUpObject[i][x]} `;
                                    }else{
                                        if(x > 3){
                                            valueLine += `} ${listUpObject[i][x]} {`;
                                        }else{
                                            if(listUpObject[i].length <= (x+1)){
                                                valueLine += `${listUpObject[i][x]}}} \n`;
                                            }else{
                                                valueLine += `${listUpObject[i][x]} {`;
                                            }
                                        }
                                    }
                                }else{
                                    if(listUpObject[i].length <= (x+1)){ 
                                        valueLine += `${listUpObject[i][x].key}:${listUpObject[i][x].value}}} \n`
                                    }else{
                                        valueLine += `${listUpObject[i][x].key}:${listUpObject[i][x].value};`
                                    }
                                }
                            }else if(listUpObject[i][x].constructor.toString().indexOf("Object") === -1 && listUpObject[i][0].indexOf("keyframes") <= -1){ 
                                if(listUpObject[i][x].indexOf("/") === -1){ // 주석이 없을 경우
                                    valueLine += `${listUpObject[i][x]} `;
                                }else{  // 있을 경우
                                    valueLine += `${listUpObject[i][x]} \n`;
                                }
                            }else if (listUpObject[i][0].indexOf("keyframes") <= -1){
                                keyframesList.push(listUpObject[i][x])
                                if(listUpObject[i].length <= (x+1)){    // 마지막 라인일때
                                    keyframesList.sort((a,b) => a.rank - b.rank);   // 정렬
                                    keyframesList.forEach((inValue,ind)=>{
                                        if(keyframesList.length <= (ind+1)){ // 마지막 값일경우
                                            valueLine += `${inValue.key}:${inValue.value} } \n`;
                                        }else{
                                            valueLine += `${inValue.key}:${inValue.value}; `;
                                        }
                                    })
                                }
                            }
                            if(x < 1){
                                if(listUpObject[i][0].indexOf("keyframes") > -1)   {    // 키프레임 정리 부분
                                    listUpObject[i].forEach((FramesList,index)=>{   // 반복문
                                        if(FramesList.constructor.toString().indexOf("Object") === -1){ // 객체가 아닌 선택자일때

                                            keyframesList.sort((a,b) => a.rank - b.rank)    // 받은 속성값 정렬

                                            if(keyframesList.constructor.toString().indexOf("Object") === -1){  // 넘어온 값이 객체일때
                                                keyframesList.forEach((inValue,ind)=>{
                                                    if(keyframesList.length <= (ind+1)){ // 마지막 값일경우
                                                        valueLine += `${inValue.key}:${inValue.value} }`;
                                                    }else{
                                                        valueLine += `${inValue.key}:${inValue.value}; `;
                                                    }
                                                })
                                                valueLine += `${FramesList} {`; // 선택자 집어 넣기
                                            }

                                            keyframesList = []; // 초기화 (속성값이 들어오면 선택자가 들어오며 초기화해줌)
                                        }else{  // 속성 값들이 바로 와서 keyframesList에 한줄씩 들어감
                                            keyframesList.push(FramesList);
                                            if(listUpObject[i].length <= (index+1)){   // 마지막 인덱스일경우 값 넣어주기 (문제점 인덱스의 마지막만 인식가능함)
                                                keyframesList.forEach((inValue,ind)=>{
                                                    if(keyframesList.length <= (ind+1)){ // 마지막 값일경우
                                                        valueLine += `${inValue.key}:${inValue.value} }} \n`;
                                                    }else{
                                                        valueLine += `${inValue.key}:${inValue.value}; `;
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }   
                            }
                        }
                    }
                    //console.log(valueLine);
                    value.innerHTML = valueLine;

                }

                let answer = sortCSS(css);
                if(answer == "") {
                    value.innerHTML = `input css`;
                } else {
                    let commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
                    if (answer) {
                        value.innerHTML = `${answer.replace(/&gt;/g, ">").replace(commentRegex, (match) => `${match}</br>`)}`;
                    }
                }
            });
            
            copyBtn.addEventListener("click", () => {
                let value = document.querySelector(".value").innerHTML;

                let commentRegexCopy = /\/\*[\s\S]*?\*\/|\/\/.*/g;
                let cleanedValue = value.replace(/&gt;/g, ">").replace(/<br>/g, '').replace(/,\n/g, ',').replace(commentRegexCopy, (match) => `${match}`);
                navigator.clipboard.writeText(cleanedValue).then(() => {
                    alert("복사완료");
                }).catch((error) => {
                    console.error("클립보드 복사 실패", error);
                });
            });
