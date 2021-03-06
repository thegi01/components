# Components

## Components list

### Grid
- [Url] : https://thegi01.github.io/components/grid.html
- To do 
	- aria	


### Button 
- [Url] : https://thegi01.github.io/components/button.html 
- 네이밍 간소화 : modifier 빼고 속성 바로 적용
	- btn--theme-default : btn--default
	- btn--size-m : btn--l, btn--m, btn--s, btn--xl
	- btn--veiw-plain : btn--plain
	- btns-position-left : btns--left, btns--right, btns--center
- To do 
	- 하위 버전 크로스 브라우징
	- aria


### Input
- [Url] : https://thegi01.github.io/components/input.html
- To do
	- checkbox : tab key의 focusd와 click의 focus 문제(checkbox-field--toggle, checkbox-field--slider)
	- checkbox, radio custom 시 js를 사용하지 않고 기본 기능으로 구현할 수 없나.
	- not selector, last-child ie8 not supply --> js??
	- 하위 버전 확인
	- input group : margin 간격 정리


### Fieldset
- [Url] : https://thegi01.github.io/components/fieldset.html
- Fieldset의 다양한 기능 확인 목적
- 스타일은 나중에 따로 


### Form
- [Url] : https://thegi01.github.io/components/form.html
- To do
	- 하위 버전 확인
	- validation : 상황별로 좀 더 개선할 것
	- aria


### Tabs
- [Url] : https://thegi01.github.io/components/tabs.html
- Accordion 작업하면서 setCurrentToggle 함수 추가
- To do
	- 하위 버전 확인
	- 접근성 개선
	- aria

### Tabs and panels
- [Url] : https://thegi01.github.io/components/tabsPanels.html
- Tabs and panels control
- To do
	- 하위 버전 확인
	- 접근성 개선
	- aria


### Tooltip
- [Url] : https://thegi01.github.io/components/tooltip.html
- To do
	- 하위 버전 확인
	- 접근성 개선
		- aria


### Accordion
- [Url] : https://thegi01.github.io/components/accordion.html
- Animation 적용인 경우 함수 호출 시 panel의 id를 argument로 전달하려 하였으나, 마크업시 귀찮아지는 이슈가 발생, 그래서 this의 href 속성으로 받도록 작업
- 그러나 초기 실행시(init) this를 전달할 수 없어 idx 기준으로 찾아가도록 수정하니 if문이 추가되는 이슈 발행. 현재 이대로 작업되어 있음. 
- Animation 적용을 위해 init 실행을 추가해야하는 번거로움도 있다.
- To do
	- 하위 버전 확인
	- 접근성 개선
	- aria


### Modal
- [Url] : https://thegi01.github.io/components/modal.html
- To do
	- 하위 버전 확인
	- aria


### Wire Frame
- [Url] : https://thegi01.github.io/components/wireframe.html
- To do
	- id, pass 
	- 반응형 > font 확인
	- aria




## To do
- reset 확인
- 접근성 타겟 적용(참조 hmp wireframe)
- ico 정리
- Navs, Breadcrumbs, Pagination, Pager, Labels, Bades, Thumbnails, Alerts, List, 말풍선, calendar




## 생각 정리

### Coding Rule
- Base : BEM 
	- block-name__elem-name--mod-name
- 한 개의 언어로 표기한다. 
	- 가능한 영어로 이해하기 쉽도록 작성하는 습관을 들인다.
- reset.css
	- reset의 중복 적용을 하지 않도록 필요한 코드만 작성한다.

### 작업 후 검사
- html, css validation
- css lint : http://csslint.net
- http://jshint.com
- 접근성 검사


### Naming
- BEM
- id, 속성 : camel case
- ie 하위버전에서 --로 시작하는 클래스명은 인식하지 못한다.
- 네이밍이 너무 길면 안되므로 누구나 인지할 수 있는 정도면 가능한 간소화 한다.
	- 예 : btn--theme-default --> btn--default
- 네이밍의 간소화. 누구나 인지할 수 있는 3자리~5자리로 사용
	- 예외 : 레이아웃은 full naming 사용
	- 예 : title --> tit, components --> cpnt
- 기능 관련 class 네이밍 규칙 : bem과 is중 어느 것이 효율적인가?
	- bem으로 하면 네이밍이 길어진다.
	- 기능 관련 클래스 네이밍이 통일 되면 관리가 편하다.
	- 따라서 is가 더 효율적이란 생각
	- is-> data 속성으로 사용
- 단순하게 구현할 수 있는 js를 공통화하기 위해 복잡하게 구현할 필요가 있을까?
	- 유지 보수 차원에서 공통화가 많으면 수정한 후 확인하는데 시간이 너무 오래 걸린다.
	- 코드를 단순하게 작성하면 신규 구현 후 후임자가 코드를 수정하기가 쉽다.
	- 예 : Wire Frame.html의 lnb, today, themeCast의 경우..조금씩 다 다르다.
	- 공통화 기준을 3줄 이상이 동일한 코드인 경우로 기준을 잡자.
- form 속성 순서 
	- input : type, class, name, id, pattern, placeholder, disabled, data, aria
	- selelct : class, name, id
	- label : class, for	

### Form
- label, input 동시 사용 시 
	- label의 for와 input의 id의 스펠링이 틀릴 경우 name 셀렉트가 되지 않는다.

### Sass
-  조건문에서 ''를 인식한다. 'true'와 true는 다르다.


### Responsive
- 반응형은 최신 브라우져에서만 적용(모바일, 테블릿은 최신 브라우저만 사용)
	- ie8에서는 반응형을 적용할 필요가 없다. pc만 구현.





## 의문 사항
- input type button과 button의 차이는?
- tab key의 focus시 스타일
- 마크업내의 onclick과 script 내의 onclick의 차이
- github으로 확인시 scss 코드가 보이지 않는다.



	


## 참조
- [BEM] : https://en.bem.info/libs/bem-components/v3.0.0/desktop/button/
- [BEM] : http://getbem.com
- Grid : http://materializecss.com/grid.html
- http://elemental-ui.com/
- [semaitic-ui] : http://semantic-ui.com/elements/button.html
- [materializecss] : http://materializecss.com/grid.html
- [uxmovement] : http://uxmovement.com/wireframes/wireframe-effectively-on-the-new-improved-970-grid-system/
- http://pflannery.github.io/oocss-skeleton.docpad/oocss/help/components.html
- [wire frame] : https://dribbble.com/search?q=wireframe
- fieldset : https://dev.w3.org/html5/spec-preview/the-fieldset-element.html
- Form validation :
	- https://www.w3.org/WAI/WCAG20/Techniques/working-examples/SCR32/index.php
	- http://html5pattern.com/Emails
- file 
	- html5 : http://www.html5rocks.com/en/tutorials/file/dndfiles/
- Nav
	- tabs aria : http://accessibility.athena-ict.com/aria/examples/tabpanel2.shtml
- polyfills : https://github.com/Alhadis/Snippets/tree/master/js/polyfills
- Sass 함수 참조 : https://web-design-weekly.com/2013/05/12/handy-sass-mixins/
