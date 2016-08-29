# Components

## 코딩 기준 : BEM 
	block-name__elem-name--mod-name

<!-- ## Semantic UI 분류 
1. Elements 
2. Collections
3. Views
4. Modules -->

<!-- ## Elements -->

<!-- ### Blocks -->


### Button 
- [Url] : https://thegi01.github.io/components/button.html 
- 네이밍 간소화 : modifier 빼고 속성 바로 적용
	- btn--theme-default : btn--default
	- btn--size-m : btn--m, btn--l, btn--s, btn--xl
	- btn--veiw-plain : btn--plain
- To do 
	- 하위 버전 크로스 브라우징
	- 버튼 background-gradient
	- aria

### Grid
- [Url] : https://thegi01.github.io/components/grid.html
- To do 
	- aria

### Wire Frame
- [Url] : https://thegi01.github.io/components/wireframe.html
- To do
	- id, pass 
	- 반응형 > font 확인
	- aria

### 공통
- reset 확인

*** 


### 추가 내용 정리
- ie 하위버전에서 --로 시작하는 클래스명은 인식하지 못한다.
- sass 조건문에서 ''를 인식한다. 'true'와 true는 다르다.
- 반응형은 최신 브라우져에서만 적용(모바일, 테블릿은 최신 브라우저만 사용)
	- ie8에서는 반응형을 적용할 필요가 없다. pc만 구현.
- 단순하게 구현할 수 있는 js를 공통화하기 위해 복잡하게 구현할 필요가 있을까?
	- 유지 보수 차원에서 공통화가 많으면 수정한 후 확인하는데 시간이 너무 오래 걸린다.
	- 코드를 단순하게 작성하면 신규 구현 후 후임자가 코드를 수정하기가 쉽다.
	- 예 : Wire Frame.html의 lnb, today, themeCast의 경우..조금씩 다 다르다.
	- 공통화 기준을 3줄 이상이 동일한 코드인 경우로 기준을 잡자.
- 네이밍이 너무 길면 안되므로 누구나 인지할 수 있는 정도면 가능한 간소화 한다.
	- 예 : btn--theme-default --> btn--default
- 네이밍의 간소화. 누구나 인지할 수 있는 3자리~5자리로 사용
	- 예외 : 레이아웃은 full naming 사용
	- 예 : title --> tit, components --> cpnt

### 참조
- [BEM] : https://en.bem.info/libs/bem-components/v3.0.0/desktop/button/
- [semaitic-ui] : http://semantic-ui.com/elements/button.html
- [materializecss] : http://materializecss.com/grid.html
- [uxmovement] : http://uxmovement.com/wireframes/wireframe-effectively-on-the-new-improved-970-grid-system/
- http://pflannery.github.io/oocss-skeleton.docpad/oocss/help/components.html
- [wire frame] : https://dribbble.com/search?q=wireframe

### Sass 함수 참조
- https://web-design-weekly.com/2013/05/12/handy-sass-mixins/
