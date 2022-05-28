import React from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Title from '../title/title';

import './app.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className='main'>
          <Title text='Собери бургер' />
          <div className="content">
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </div>
      </>
    );
  }
}

export default App;