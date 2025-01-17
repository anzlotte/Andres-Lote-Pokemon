import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  padding: 16px;
  font-family: "Arial", sans-serif;
}

h1 {
  display: flex;
  justify-content: center;
  color: #e0dd15;
  font-size: 60px;
  -webkit-text-stroke: 1px black;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 5px;
  overflow: scroll;
}

.pokemon {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  width: 150px;
  background-color: #f7f7f7;
  transition: transform 0.2s ease;
}

.pokemon:hover {
  transform: scale(1.1);
  border-color: #007bff;
}

.pokemon img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.pokemon h3 {
  font-size: 1.2em;
  margin: 10px 0;
  color: #333;
}

.pokemon p {
  font-size: 0.9em;
  color: #666;
}

.pokemon h1 {
  display: none;
}
`;
