# Components

## 코딩 기준 : BEM 
	block-name__elem-name--mod-name

## Semantic UI 분류 
1. Elements 
2. Collections
3. Views
4. Modules


## Block

### Button

#### Block description
	Use the button block to control the size, state, and appearance of the button.

#### Modifiers of the button

- type modifier : link, submit
- togglable modifier
- disabled modifier
- focused modifier 
- pressed modifier 
- hovered modifier
- theme modifier
- size modifier : s, m, l, xl
- view modifier : action, pseudo, plain


#### Custom fields of the block

- name field
- val field
- text field
- url field
- icon field
- title field
- id field
- tabIndex field


### 참조
- BEM : https://en.bem.info/libs/bem-components/v3.0.0/desktop/button/
- semaitic-ui : http://semantic-ui.com/elements/button.html

### Sass 함수 참조
- https://web-design-weekly.com/2013/05/12/handy-sass-mixins/ 


### 알게 된 내용
- ie 하위버전에서 --로 시작하는 클래스명은 인식하지 못한다.
- sass 조건문에서 ''를 인식한다. 'true'와 true는 다르게 인식한다.
