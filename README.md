# css-aligner
css Align and Compress 

The provided code is a JavaScript code snippet that handles the sorting and formatting of CSS code. It listens for a click event on the "playBtn" element and performs the sorting and formatting operations on the CSS code entered in the "textarea" element. The sorted and formatted CSS code is then displayed in the "value" element.

Here's an overview of what the code does:

1. It selects the necessary elements from the HTML using document.querySelector.
2. It defines an event listener on the "playBtn" element, which triggers when the button is clicked.
3. Inside the event listener, it retrieves the CSS code entered in the "textarea" element.
4. It defines a function called sortCSS that performs the sorting and formatting operations on the CSS code.
5. The CSS code is parsed and split into different sections: keyframes, media queries, imports, and regular CSS rules.
6. The CSS rules are further split into individual properties and values.
7. The properties are sorted according to a predefined order using the propertyOrder array.
8. The sorted CSS properties are then reconstructed into a formatted CSS code string.
9. The formatted CSS code is assigned to the valueLine variable.
10. The valueLine variable is set as the HTML content of the "value" element, displaying the sorted and formatted CSS code.
11. An event listener is also added to the "copyBtn" element, which copies the content of the "value" element to the clipboard when clicked.

----------------------------------------------------------------------------

제공된 코드는 CSS 코드의 정렬과 포매팅을 처리하는 JavaScript 코드 조각입니다. "playBtn" 요소의 클릭 이벤트를 감지하고, "textarea" 요소에 입력된 CSS 코드에 대해 정렬과 포매팅 작업을 수행합니다.
정렬된 포맷팅된 CSS 코드는 "value" 요소에 표시됩니다.

다음은 코드가 하는 일에 대한 개요입니다:

document.querySelector를 사용하여 HTML에서 필요한 요소를 선택합니다.
"playBtn" 요소에 대한 이벤트 리스너를 정의하며, 버튼을 클릭할 때 트리거됩니다.
이벤트 리스너 내에서 "textarea" 요소에 입력된 CSS 코드를 가져옵니다.
sortCSS라는 함수를 정의하여 CSS 코드에 대한 정렬과 포매팅 작업을 수행합니다.
CSS 코드는 keyframes, media queries, imports, 일반 CSS 규칙으로 구분됩니다.
CSS 규칙은 속성과 값으로 개별적으로 분리됩니다.
속성은 propertyOrder 배열을 사용하여 미리 정의된 순서대로 정렬됩니다.
정렬된 CSS 속성은 포맷팅된 CSS 코드 문자열로 재구성됩니다.
포맷팅된 CSS 코드는 valueLine 변수에 할당됩니다.
valueLine 변수는 "value" 요소의 HTML 내용으로 설정되어 정렬된 포맷팅된 CSS 코드를 표시합니다.
"copyBtn" 요소에도 이벤트 리스너가 추가되어 클릭할 때 "value" 요소의 내용이 클립보드로 복사됩니다.
